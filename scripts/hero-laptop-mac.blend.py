#!/usr/bin/env python3
"""
Turn the CC-BY MacBook mesh into the site's hero laptop.

    /Applications/Blender.app/Contents/MacOS/Blender --background \
      --python scripts/hero-laptop-mac.blend.py -- \
      --source ~/Downloads/macbook_pro_m3_16_inch_2024.glb \
      --export-glb public/models/laptop.glb --bare-screen

    ... --screen public/images/provider-workspace.webp \
        --export-still public/images/provider-workspace-laptop.png

ATTRIBUTION IS NOT OPTIONAL. The source is "macbook pro M3 16 inch 2024" by
jackbaeten (https://sketchfab.com/jackbaeten), CC-BY-4.0. The licence permits
commercial use and modification and requires credit, so the professionals page
carries a visible credit line (`Pro.credit` in the message catalog). If the
model is ever swapped out, take the credit with it — and if this pipeline is
pointed at a differently-licensed asset, check the terms first.

`hero-laptop.blend.py` builds a laptop from scratch and is still the better
asset on every measure except one: it does not look like a Mac, and Samuil
wants the Mac. That script stays as the fallback.

What this does to the download, which is 10.6 MB, 112,625 triangles, 61 meshes
and 18 baked textures, and has no hinge:

  * splits it at z = 2 into lid and base — the two groups the model actually
    has, though nothing in it is named
  * throws away all 40 materials and all 18 textures and assigns the site's
    own, so the machine sits in the same studio as the phone — unless
    `--keep-source-materials`, which keeps the source's maps instead, because
    on a deck this size the flat materials read as unlit clay and the maps are
    what carry the keycap legends, the grille perforation and the grain
  * finds the display by measurement rather than by name (the node names are
    Sketchfab hashes) and gives it the emissive material three.js hangs the
    screenshot on
  * decimates per object against a triangle cap, because half the budget is
    keycaps that render thirty pixels wide
  * joins 61 meshes into 2 nodes and builds the hinge the model has not got:
    the lid becomes a node named `Lid`, its origin moved to the hinge line and
    its 20 deg of lean baked out, so `Lid.rotation.x` is the opening angle on
    the same convention as the built model — 0 upright, +90 shut, negative
    leaning back
  * rotates the whole thing out of Blender's Z-up into the camera space the
    site's models are authored in

Everything below the import is measured off this specific file. The
classification rules are geometric, so they survive a re-download of the same
asset, but they are not a general-purpose laptop importer.
"""

import argparse
import math
import os
import sys

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))

ATTRIBUTION = (
    '"macbook pro M3 16 inch 2024" by jackbaeten '
    "(https://sketchfab.com/jackbaeten), CC-BY-4.0"
)

# Splits and caps, in the source file's own units (centimetres).
LID_MIN_Z = 2.0          # above this, a part belongs to the lid
SCREEN_WIDTH_CM = 34.39  # the panel's active area, measured off the source
SCREEN_TOLERANCE = 0.6
TRI_CAP = 1500           # per object, before joining
MIN_DECIMATE_RATIO = 0.1
REST_LIFT_CM = 2.4       # centres the *resting* pose, measured off the canvas


def load_phone_module():
    """The studio — world, lights, display materials — comes out of the phone
    script, because `DeviceModel` rebuilds that one rig in three.js."""
    path = os.path.join(HERE, "hero-phone.blend.py")
    if not os.path.isfile(path):
        sys.exit(f"needs the phone's studio and cannot find it: {path}")
    import importlib.util

    spec = importlib.util.spec_from_file_location("hero_phone", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


P = load_phone_module()


def parse_args(argv):
    argv = argv[argv.index("--") + 1 :] if "--" in argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--source", default=os.path.expanduser(
        "~/Downloads/macbook_pro_m3_16_inch_2024.glb"))
    p.add_argument("--screen", default="public/images/provider-workspace.webp")
    p.add_argument("--bare-screen", action="store_true")
    p.add_argument("--export-glb", default=None)
    p.add_argument("--export-still", default=None)
    p.add_argument("--tri-cap", type=int, default=TRI_CAP)
    # The site's four flat materials are a deliberate simplification, but on a
    # 16-inch deck they read as unlit clay: the source ships 18 baked maps that
    # carry the keycap legends, the speaker perforation, the port cutouts and
    # the aluminium's grain, and throwing them away is most of why the built
    # model looks cheaper than the source. This keeps them — at the cost of the
    # maps' own weight, so it comes with a texture format and a tri cap that
    # are worth raising together.
    p.add_argument("--keep-source-materials", action="store_true")
    # AUTO, not WEBP: 4.2's exporter writes each image to an extensionless temp
    # file and the WebP writer refuses it ("could not write image"), which
    # aborts the whole export. Revisit when Blender moves on.
    p.add_argument("--texture-format", default="AUTO",
                   choices=("AUTO", "WEBP", "JPEG"))
    p.add_argument("--texture-quality", type=int, default=75)
    p.add_argument("--lid", type=float, default=5.0)
    p.add_argument("--pitch", type=float, default=7.0)
    p.add_argument("--yaw", type=float, default=-4.0)
    p.add_argument("--aspect", type=float, default=1.3)
    p.add_argument("--fill", type=float, default=0.79)
    p.add_argument("--res", type=int, default=2400)
    p.add_argument("--samples", type=int, default=192)
    p.add_argument("--save-blend", default=None)
    return p.parse_args(argv)


# ---------------------------------------------------------------- materials

def mat_shell():
    """Space black, authored for three.js rather than for EEVEE — see the long
    note in hero-laptop.blend.py. No coat: glTF turns it into
    KHR_materials_clearcoat, which three.js renders as a white near-mirror
    over the metal and washes a dark body out."""
    # Rough, not polished. With the environment damped in three.js (see
    # `envIntensity` in DeviceModel) the area lights do the shaping, and at
    # 0.46 they laid a hard bright streak straight across the deck. 0.64
    # spreads the same energy into the soft back-to-front gradient a machined
    # aluminium top case actually has.
    return P.principled("Shell", (0.016, 0.017, 0.021), 1.0, 0.64,
                        **{"Anisotropic": 0.45})


def mat_deck():
    return P.principled("Deck", (0.007, 0.0075, 0.010), 1.0, 0.72)


def mat_keycap():
    return P.principled("Keycap", (0.005, 0.0052, 0.0068), 0.0, 0.74)


def mat_trackpad():
    return P.principled("Trackpad", (0.012, 0.013, 0.016), 0.0, 0.42,
                        **{"Specular IOR Level": 0.6})


# ------------------------------------------------------------------- import

def world_bounds(obj):
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    lo = Vector((min(c.x for c in corners), min(c.y for c in corners),
                 min(c.z for c in corners)))
    hi = Vector((max(c.x for c in corners), max(c.y for c in corners),
                 max(c.z for c in corners)))
    return lo, hi


def tri_count(obj):
    return sum(len(p.vertices) - 2 for p in obj.data.polygons)


def import_source(path, keep_uvs=False):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    if not os.path.isfile(path):
        sys.exit(f"source model not found: {path}")
    bpy.ops.import_scene.gltf(filepath=path)

    meshes = [o for o in bpy.data.objects if o.type == "MESH"]
    if not meshes:
        sys.exit("no meshes in the source model")

    # Detach from the importer's node hierarchy and bake every transform into
    # the mesh data, so from here on world space and local space agree and the
    # geometry can be measured, split and re-parented without bookkeeping.
    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes:
        o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM")
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.ops.object.select_all(action="DESELECT")

    # The importer leaves the empties behind; they carry nothing now.
    for o in [o for o in bpy.data.objects if o.type == "EMPTY"]:
        bpy.data.objects.remove(o, do_unlink=True)

    # Six UV layers ride along from the source's baked textures, and every one
    # of them costs 8 bytes on every vertex — 2.6 MB of a 3.9 MB export, for
    # maps that are being thrown away. Only the display needs UVs, and it gets
    # a fresh planar set later.
    #
    # `keep_uvs` is the source-materials build, where the maps are not thrown
    # away. Even then only the first layer survives: the baked maps all sample
    # TEXCOORD_0, and the other five are lightmap and detail sets this model
    # never uses.
    for o in [o for o in bpy.data.objects if o.type == "MESH"]:
        while len(o.data.uv_layers) > (1 if keep_uvs else 0):
            o.data.uv_layers.remove(o.data.uv_layers[-1 if keep_uvs else 0])
        for attr in list(o.data.color_attributes):
            o.data.color_attributes.remove(attr)

    return [o for o in bpy.data.objects if o.type == "MESH"]


def find_screen(meshes):
    """The display, by measurement. Node names in the source are hashes, so
    the panel is identified by being the one flat part whose width matches the
    16-inch active area — the glass over it is a centimetre wider."""
    best, best_error = None, 1e9
    for o in meshes:
        lo, hi = world_bounds(o)
        if hi.z < LID_MIN_Z:
            continue
        error = abs((hi.x - lo.x) - SCREEN_WIDTH_CM)
        if error < best_error:
            best, best_error = o, error
    if best is None or best_error > SCREEN_TOLERANCE:
        sys.exit(
            "could not identify the display: no lid part is "
            f"{SCREEN_WIDTH_CM} cm wide (closest was off by {best_error:.2f} cm). "
            "The source model changed; re-measure it before trusting this script."
        )
    return best


def classify(meshes, screen):
    """Which of the site's four materials each part gets. The rules are read
    off this asset's own measurements: the keyboard block sits mid-deck, the
    trackpad in front of it, the speaker strips behind it."""
    groups = {"lid": [], "base": []}
    materials = {}
    shell, deck, keycap, trackpad = mat_shell(), mat_deck(), mat_keycap(), mat_trackpad()

    for o in meshes:
        if o is screen:
            continue
        lo, hi = world_bounds(o)
        centre = (lo + hi) / 2.0
        width = hi.x - lo.x
        groups["lid" if centre.z > LID_MIN_Z else "base"].append(o)

        if centre.z > LID_MIN_Z:
            materials[o.name] = shell
        elif 2.6 < centre.y < 5.8 and 24.0 < width < 30.0:
            materials[o.name] = keycap          # the keyboard block
        elif centre.y < -4.0 and 14.0 < width < 18.0:
            materials[o.name] = trackpad
        elif 5.8 <= centre.y < 8.0 and width > 33.0:
            materials[o.name] = deck            # speaker strips
        else:
            materials[o.name] = shell
    return groups, materials


def decimate(obj, cap):
    """A collapse decimator, capped per object. Most of the budget is keycaps
    and screw heads; the parts that carry the silhouette are already cheap."""
    tris = tri_count(obj)
    if tris <= cap:
        return tris
    ratio = max(MIN_DECIMATE_RATIO, cap / tris)
    mod = obj.modifiers.new("Dec", "DECIMATE")
    mod.ratio = ratio
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier="Dec")
    return tri_count(obj)


def join_as(objects, name):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objects:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    merged = bpy.context.view_layer.objects.active
    merged.name = name
    merged.data.name = name
    bpy.ops.object.select_all(action="DESELECT")
    return merged


def set_origin(obj, point):
    bpy.context.scene.cursor.location = point
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
    obj.select_set(False)
    bpy.context.scene.cursor.location = (0.0, 0.0, 0.0)


def apply_rotation(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    obj.select_set(False)


def screen_uvs(obj):
    """A planar projection onto the panel's own plane. The source UVs point at
    a baked texture that is being thrown away, and the emissive map has to land
    square on the glass."""
    lo, hi = world_bounds(obj)
    # The panel is a slab leaning back about X: u runs along world X, v runs up
    # its own face, which is the y/z diagonal.
    span_x = hi.x - lo.x
    span_v = math.hypot(hi.y - lo.y, hi.z - lo.z)
    uv = obj.data.uv_layers.new(name="UVMap")
    for loop in obj.data.loops:
        co = obj.data.vertices[loop.vertex_index].co
        world = obj.matrix_world @ co
        u = (world.x - lo.x) / span_x
        v = math.hypot(world.y - lo.y, world.z - lo.z) / span_v
        uv.data[loop.index].uv = (u, v)
    return span_x, span_v


def build(args):
    meshes = import_source(os.path.expanduser(args.source), keep_uvs=args.keep_source_materials)
    source_tris = sum(tri_count(o) for o in meshes)
    screen = find_screen(meshes)
    groups, materials = classify(meshes, screen)

    if not groups["lid"] or not groups["base"]:
        sys.exit("lid/base split found nothing; the source model changed")

    # ---- display -----------------------------------------------------------
    if args.bare_screen:
        display_material = P.mat_display_bare()
    else:
        display_material, _, _ = (
            P.mat_display_gltf if args.export_glb else P.mat_display
        )(os.path.abspath(os.path.expanduser(args.screen)))
    # The display's own baked UVs point at the source's screen art. It gets a
    # planar set instead, and it has to be the *only* set on that mesh: glTF
    # binds the display texture to TEXCOORD_0, which is whichever layer comes
    # first.
    while screen.data.uv_layers:
        screen.data.uv_layers.remove(screen.data.uv_layers[0])
    span_x, span_v = screen_uvs(screen)
    screen.data.materials.clear()
    screen.data.materials.append(display_material)

    # ---- everything else ---------------------------------------------------
    for o in groups["lid"] + groups["base"]:
        decimate(o, args.tri_cap)
        if args.keep_source_materials:
            continue
        o.data.materials.clear()
        o.data.materials.append(materials[o.name])

    base = join_as(groups["base"], "Base")
    # The screen joins the lid rather than hanging off it: glTF splits a
    # multi-material mesh into one primitive per material, so three.js still
    # sees a Mesh whose material is named "Display" and hangs the screenshot
    # on it, and the lid stays a single node.
    lid = join_as(groups["lid"] + [screen], "Lid")

    # ---- the hinge the model has not got -----------------------------------
    lo, hi = world_bounds(lid)
    # The lid is a slab leaning back; its bounding box's near-bottom edge is
    # the hinge line. Its lean is the angle that edge makes with vertical.
    lean = math.atan2(hi.y - lo.y, hi.z - lo.z)
    hinge = Vector((0.0, lo.y, lo.z))
    set_origin(lid, hinge)
    # Bake the lean out, so rotation.x == 0 is upright and the site owns the
    # opening angle exactly as it does for the built model.
    lid.rotation_euler = (lean, 0.0, 0.0)
    apply_rotation(lid)

    # ---- into the site's camera space --------------------------------------
    # The site's models are authored X right, Y up, Z toward the camera, and
    # exported with export_yup=False. Blender's importer put this one in Z-up,
    # so the whole assembly turns a quarter turn about X. The lid turns with
    # it, which keeps its local X axis — and therefore its opening angle — the
    # axis the site drives.
    root = P.link(bpy.data.objects.new("Laptop", None))
    root.empty_display_type = "PLAIN_AXES"
    lid.parent = root
    base.parent = root
    root.rotation_euler = (-math.pi / 2.0, 0.0, 0.0)

    bpy.context.view_layer.update()
    corners = [
        root.matrix_world @ obj.matrix_local @ Vector(c)
        for obj in (lid, base)
        for c in obj.bound_box
    ]
    lo = Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
    hi = Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
    root.location = (0.0, -(lo.y + hi.y) / 2.0 + REST_LIFT_CM, 0.0)

    dims = dict(
        source_tris=source_tris,
        tris=tri_count(lid) + tri_count(base),
        lean_deg=math.degrees(lean),
        width=hi.x - lo.x,
        height=hi.y - lo.y,
        screen=(span_x, span_v),
    )
    return root, lid, dims


# -------------------------------------------------------------------- still

def render_still(args, root, lid, dims):
    P.build_world()
    P.build_lights()
    r = math.radians
    lid.rotation_euler = (-r(args.lid), 0.0, 0.0)
    root.rotation_euler.x += r(args.pitch)
    root.rotation_euler.y += r(args.yaw)

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.film_transparent = True
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.render.filter_size = 1.0
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.eevee.taa_render_samples = args.samples
    for attr in ("use_raytracing", "use_shadows"):
        if hasattr(scene.eevee, attr):
            setattr(scene.eevee, attr, True)

    scene.render.resolution_x = args.res
    scene.render.resolution_y = int(round(args.res / args.aspect))
    scene.render.resolution_percentage = 100

    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = 58.0
    cam_data.sensor_fit = "VERTICAL"
    cam = P.link(bpy.data.objects.new("Camera", cam_data))
    scene.camera = cam
    half_fov = math.atan((cam_data.sensor_height / 2.0) / cam_data.lens)
    cam.location = (0.0, 0.0, (dims["width"] / 2.0) / (math.tan(half_fov) * args.aspect * args.fill))
    cam.rotation_euler = (0.0, 0.0, 0.0)

    path = os.path.abspath(os.path.expanduser(args.export_still))
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    scene.render.filepath = path
    scene.frame_set(0)
    bpy.ops.render.render(write_still=True)
    print(f"[mac-laptop] still {path}  {scene.render.resolution_x}x{scene.render.resolution_y}")


def main():
    args = parse_args(sys.argv)
    if not (args.export_glb or args.export_still or args.save_blend):
        sys.exit("nothing to do: pass --export-glb, --export-still or --save-blend")

    root, lid, dims = build(args)
    print(f"[mac-laptop] source {ATTRIBUTION}")
    print(f"[mac-laptop] {dims['source_tris']} tris in -> {dims['tris']} out "
          f"(cap {args.tri_cap}/object); lid lean baked out {dims['lean_deg']:.1f} deg; "
          f"body {dims['width']:.1f} x {dims['height']:.1f} cm; "
          f"screen {dims['screen'][0]:.1f} x {dims['screen'][1]:.1f} cm")

    if args.export_still:
        render_still(args, root, lid, dims)

    if args.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(os.path.expanduser(args.save_blend)))

    if args.export_glb:
        path = os.path.abspath(os.path.expanduser(args.export_glb))
        os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
        bpy.ops.export_scene.gltf(
            filepath=path,
            export_format="GLB",
            export_apply=True,
            export_cameras=False,
            export_lights=False,
            export_animations=False,
            export_yup=False,
            export_extras=False,
            # Only bites on a source-materials build; with the site's flat
            # materials there is nothing to encode.
            export_image_format=args.texture_format,
            export_image_quality=args.texture_quality,
        )
        print(f"[mac-laptop] GLB {path}  {os.path.getsize(path) / 1024:.0f} KB")
        print("[mac-laptop] node 'Lid' rotates about X: 0 upright, +90 shut, negative leans back")


if __name__ == "__main__":
    main()
