#!/usr/bin/env python3
"""
Build the Provider Workspace laptop as a 3D scene, headlessly.

    /Applications/Blender.app/Contents/MacOS/Blender --background \
      --python scripts/hero-laptop.blend.py -- \
      --export-glb public/models/laptop.glb \
      --bare-screen --screen-aspect 2200:1248

    /Applications/Blender.app/Contents/MacOS/Blender --background \
      --python scripts/hero-laptop.blend.py -- \
      --screen public/images/provider-workspace.webp \
      --export-still public/images/provider-workspace-laptop.png

The professional view's hero needs the gesture a laptop has and a phone does
not: the lid opening. That means a hinge, which means real geometry — a CSS
bezel around a screenshot cannot open.

This is the phone's sibling, not its replacement. It imports the studio out of
`hero-phone.blend.py` — the world gradient, the four area lights, the display
materials, the rounded-slab builder — because `DeviceModel.tsx` rebuilds that
one rig in three.js from the numbers in `build_lights()`. Two devices lit by
two different rigs would not read as one system, and the site has nowhere to
put a second set of lights.

Layout is camera space, the same convention the phone uses and the reason both
export with `export_yup=False`: X right, Y up, Z toward the camera. The base
lies in XZ, the hinge runs along X at the back, and the lid is authored
standing vertical so that its `rotation.x` is the opening angle measured from
upright — 0 is open flat against the back, +90 deg is shut. The site drives
that one number; nothing about the opening is baked in here.

Useful flags:
    --export-glb PATH     geometry and materials for three.js (what the site loads)
    --export-still PATH   one PNG of the resting pose, transparent surround
    --bare-screen         no image on the display; the site hangs its own
    --lid 22              lid lean-back from vertical for the still, in degrees
    --pitch 12            body tilt toward the camera for the still, in degrees
    --save-blend PATH     also write the .blend for hand-tweaking
"""

import argparse
import importlib.util
import math
import os
import sys

import bpy
import bmesh

HERE = os.path.dirname(os.path.abspath(__file__))


def load_phone_module():
    """The phone script is the studio. Load it as a module — the filename has
    hyphens, so it cannot be imported by name — and take its world, lights,
    materials and mesh helpers. Its `main()` is under a `__main__` guard, so
    nothing runs on import."""
    path = os.path.join(HERE, "hero-phone.blend.py")
    if not os.path.isfile(path):
        sys.exit(
            f"hero-laptop needs the phone's studio and cannot find it: {path}\n"
            "If that script moved, move this one with it or copy build_world(), "
            "build_lights() and the display materials across."
        )
    spec = importlib.util.spec_from_file_location("hero_phone", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


P = load_phone_module()
MM = P.MM  # millimetre -> Blender unit (centimetre)

# Millimetres. Proportioned against a 16-inch pro laptop (355.7 x 248.1 x 16.8
# body, 8 mm corners, ~4.5 mm side bezels, a chin below the panel, a flush
# hinge and a trackpad about 45 % of the body width) and scaled to a 300 mm
# display. Samuil offered a CC-BY MacBook mesh off Sketchfab; it was 10.6 MB
# against this file's 221 KB, carried no hinge, and would have put Apple's
# trade dress and an attribution line on the hero — so the reference was taken
# and the mesh was not.
#
# The display is sized to the screenshot's own aspect so the UI is never
# stretched, which makes the machine shallower than a real 16:10 one: the
# workspace screen is 16:9.
DISPLAY_WIDTH_MM = 300.0
# Bezels are not uniform. Sides and top are as thin as the panel allows; the
# chin is deeper, which is what stops a laptop lid reading as a tablet.
BEZEL_SIDE_MM = 4.5
BEZEL_TOP_MM = 4.5
BEZEL_CHIN_MM = 9.0
LID_THICKNESS_MM = 4.6
BASE_HEIGHT_MM = 14.6
CORNER_RADIUS_MM = 8.0
EDGE_BEVEL_MM = 0.9

# Keyboard well, speaker grilles and trackpad, on the deck.
WELL_SIDE_MARGIN_MM = 38.0
WELL_BACK_MARGIN_MM = 13.0
WELL_DEPTH_MM = 92.0
GRILLE_W_MM = 26.0
TRACKPAD_W_MM = 136.0
TRACKPAD_D_MM = 54.0
# The hinge is a flush cover across the back, not a protruding barrel: it fills
# the half-lid-thickness gap the pivot leaves above the deck.
HINGE_COVER_W_FRACTION = 0.68
HINGE_COVER_D_MM = 13.0
# The assembly is centred on the box it occupies with the lid upright, but it
# is *seen* leaning back on a body tilted 9 deg toward the camera, which drops
# the silhouette in frame and leaves a band of empty canvas above it. This
# lifts the model by that much so the resting pose sits centred instead.
REST_LIFT_MM = 13.0


def parse_args(argv):
    argv = argv[argv.index("--") + 1 :] if "--" in argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--screen", default="public/images/provider-workspace.webp")
    p.add_argument("--screen-aspect", default="2200:1248",
                   help="display W:H when --bare-screen is set, since there is no image to take it from")
    p.add_argument("--bare-screen", action="store_true",
                   help="export with no screen image; the site assigns the screenshot as an emissive map")
    p.add_argument("--export-glb", default=None)
    p.add_argument("--export-still", default=None)
    p.add_argument("--lid", type=float, default=22.0, help="lid lean-back from vertical, degrees")
    p.add_argument("--pitch", type=float, default=12.0, help="body tilt toward the camera, degrees")
    p.add_argument("--yaw", type=float, default=-7.0, help="body turn for the still, degrees")
    p.add_argument("--res", default="2400", help="still width in px; height follows the framing")
    p.add_argument("--samples", type=int, default=192)
    p.add_argument("--fill", type=float, default=0.82)
    p.add_argument("--aspect", type=float, default=1.45, help="still frame W:H; the open lid needs headroom "
                                                              "and the tilted base needs floor")
    p.add_argument("--save-blend", default=None)
    return p.parse_args(argv)


# ---------------------------------------------------------------- materials

# Albedos are set for three.js, not for EEVEE, and they look too dark in a
# Blender viewport on purpose.
#
# The site rebuilds this scene's four area lights and its world gradient, but
# it cannot rebuild the two things that darken a laptop most: cast shadows and
# ambient occlusion. three's RectAreaLight casts none, so the deck never sits
# in the open lid's shadow and the keyboard well never darkens into its own
# corner — every surface is lit as though nothing were above it. Authored at a
# plausible 0.19 albedo the body came out silver in the browser: a handsome
# MacBook, and entirely the wrong object for a page whose ground is #000e1b
# and whose subject is the screen.
#
# So the numbers below are what makes the *live* model read as space black.
# The still rendered here is darker than the browser's, which is the right way
# round: it is a poster behind a dark page, and a fallback nobody should be
# able to tell apart at a glance.

def mat_shell():
    # No coat. Blender renders a 0.12 coat as a whisper; glTF exports it as
    # KHR_materials_clearcoat, and three.js gives that layer a white,
    # near-mirror dielectric reflection of the environment that sits *over*
    # the metal and ignores its base colour entirely. On a near-black body
    # that one number was most of what reached the screen — halving the albedo
    # twice barely moved the pixels until the coat came off.
    return P.principled("Shell", (0.013, 0.014, 0.018), 1.0, 0.46,
                        **{"Anisotropic": 0.45})


def mat_deck():
    """The milled keyboard well, a shade down from the shell so the recess
    reads without needing a shadow to explain it."""
    return P.principled("Deck", (0.006, 0.0065, 0.009), 1.0, 0.56)


def mat_keycap():
    return P.principled("Keycap", (0.004, 0.0042, 0.0055), 0.0, 0.64)


def mat_grille():
    """Speaker strips either side of the keyboard. Real ones are thousands of
    drilled holes; at the size this renders, a darker, rougher inset reads as
    the same thing and costs no triangles."""
    return P.principled("Grille", (0.009, 0.010, 0.013), 0.0, 0.78)


def mat_trackpad():
    return P.principled("Trackpad", (0.010, 0.011, 0.014), 0.0, 0.28,
                        **{"Specular IOR Level": 0.6})


# ------------------------------------------------------------------- meshes

def apply_rotation(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    obj.select_set(False)


def flat_slab(name, width, depth, thickness, radius, corner_segments=24):
    """A rounded slab lying flat: `width` along X, `depth` along Z, `thickness`
    along Y, centred on its own origin. `rounded_slab` builds the profile in XY
    and extrudes along Z, so this tips it onto its back and bakes the rotation
    in — leaving children and hinge maths in plain world axes."""
    obj = P.rounded_slab(name, width, depth, thickness, radius, corner_segments=corner_segments)
    obj.rotation_euler = (-math.pi / 2.0, 0.0, 0.0)
    apply_rotation(obj)
    return obj


def keycap(name, width, depth, height, radius):
    """Two segments a corner and no edge bevel. A keycap renders about thirty
    pixels across even in the hero, and giving each of the seventy-eight a
    bevel modifier cost 17,000 vertices to describe a highlight nobody can
    see — most of the model, for none of the picture."""
    return flat_slab(name, width, depth, height, radius, corner_segments=2)


def join(objects, name):
    """One mesh out of many. Eighty keycaps as eighty glTF nodes would cost
    more in node overhead than the keys cost in triangles."""
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    merged = bpy.context.view_layer.objects.active
    merged.name = name
    merged.select_set(False)
    return merged


def build_keyboard(well_w, well_d, well_top_y, well_z_back):
    """Six rows in the well. Uniform through the alphanumerics, with a short
    function row above and a modifier row below, because a spacebar is the one
    key whose absence is noticed."""
    unit = min((well_w - 2.0 * 3.0 * MM) / 14.0, 16.6 * MM)
    gap = unit * 0.13
    cap = unit - gap
    rows = [
        # (cap height along Z, list of key widths in units)
        (cap * 0.58, [1.0] * 14),
        (cap, [1.0] * 14),
        (cap, [1.0] * 14),
        (cap, [1.0] * 14),
        (cap, [1.0] * 14),
        (cap, [1.25, 1.25, 1.25, 5.5, 1.25, 1.25, 1.125, 1.125]),
    ]
    total_d = sum(h for h, _ in rows) + gap * (len(rows) - 1)
    z = well_z_back + (well_d - total_d) / 2.0
    height = 1.15 * MM
    caps = []
    for index, (row_h, widths) in enumerate(rows):
        row_w = sum(w * unit for w in widths) - gap
        x = -row_w / 2.0
        for column, w in enumerate(widths):
            key_w = w * unit - gap
            obj = keycap(f"Key{index}_{column}", key_w, row_h, height,
                         min(1.2 * MM, key_w / 2.0 - 0.01))
            obj.location = (x + key_w / 2.0, well_top_y + height / 2.0, z + row_h / 2.0)
            caps.append(obj)
            x += w * unit
        z += row_h + gap
    return caps


def build_laptop(args, bare, for_gltf=False):
    """Returns (root empty, lid empty, dims). Front is +Z, up is +Y, the hinge
    runs along X at the back of the base."""
    if bare is not None:
        mat_disp = P.mat_display_bare()
        img_w, img_h = bare
    else:
        # Pure emission for a render, a Principled with an emissive texture for
        # the GLB: the exporter can only follow the second pattern, and a
        # Principled surface over a rendered screen reflects the studio across
        # the whole flat panel and veils the UI grey.
        builder = P.mat_display_gltf if for_gltf else P.mat_display
        mat_disp, img_w, img_h = builder(args.screen)

    disp_w = DISPLAY_WIDTH_MM * MM
    disp_h = disp_w * (img_h / img_w)
    lid_w = disp_w + 2 * BEZEL_SIDE_MM * MM
    lid_h = disp_h + (BEZEL_TOP_MM + BEZEL_CHIN_MM) * MM
    # Where the panel sits inside the lid, measured from the hinge: the chin is
    # deeper than the top bezel, so the display is not on the lid's centre.
    disp_centre_y = BEZEL_CHIN_MM * MM + disp_h / 2.0
    lid_t = LID_THICKNESS_MM * MM
    base_w = lid_w
    base_d = lid_h
    base_h = BASE_HEIGHT_MM * MM
    radius = CORNER_RADIUS_MM * MM

    base_top = base_h
    back_z = -base_d / 2.0
    # The hinge sits half a lid thickness above the deck, so that at +90 deg
    # the shut lid rests on the base instead of sinking into it.
    hinge_y = base_top + lid_t / 2.0

    loose = []

    # Chassis.
    chassis = flat_slab("Base", base_w, base_d, base_h, radius, corner_segments=16)
    chassis.location = (0.0, base_h / 2.0, 0.0)
    P.soften(chassis, EDGE_BEVEL_MM * MM, segments=3)
    chassis.data.materials.append(mat_shell())
    loose.append(chassis)

    # Milled keyboard well, sunk into the deck.
    well_w = base_w - 2 * WELL_SIDE_MARGIN_MM * MM
    well_d = WELL_DEPTH_MM * MM
    well_z_back = back_z + WELL_BACK_MARGIN_MM * MM
    well = flat_slab("Well", well_w, well_d, 1.6 * MM, 2.4 * MM, corner_segments=6)
    well.location = (0.0, base_top - 0.55 * MM, well_z_back + well_d / 2.0)
    P.smooth_only(well)
    well.data.materials.append(mat_deck())
    loose.append(well)

    # One material for all of them. Calling mat_keycap() per key gives each
    # keycap its own datablock, and the joined mesh then exports as seventy-odd
    # glTF primitives instead of one — 595 KB rather than 96 KB.
    keycap_material = mat_keycap()
    keys = build_keyboard(well_w, well_d, base_top - 0.35 * MM, well_z_back)
    for k in keys:
        k.data.materials.append(keycap_material)
    loose.append(join(keys, "Keys"))

    # Speaker strips either side of the well, running its length.
    grille_material = mat_grille()
    grille_d = well_d * 0.86
    grille_x = well_w / 2.0 + (WELL_SIDE_MARGIN_MM * MM - GRILLE_W_MM * MM) / 2.0 + GRILLE_W_MM * MM / 2.0
    for sign in (-1, 1):
        grille = flat_slab(f"Grille{'L' if sign < 0 else 'R'}", GRILLE_W_MM * MM, grille_d,
                           1.0 * MM, 2.0 * MM, corner_segments=6)
        grille.location = (sign * grille_x, base_top - 0.4 * MM,
                           well_z_back + well_d / 2.0)
        P.smooth_only(grille)
        grille.data.materials.append(grille_material)
        loose.append(grille)

    # Trackpad, centred between the keyboard and the front edge.
    pad = flat_slab("Trackpad", TRACKPAD_W_MM * MM, TRACKPAD_D_MM * MM, 0.9 * MM, 3.0 * MM,
                    corner_segments=8)
    front_gap_back = well_z_back + well_d
    pad.location = (0.0, base_top - 0.2 * MM,
                    front_gap_back + (base_d / 2.0 - front_gap_back) / 2.0)
    P.smooth_only(pad)
    pad.data.materials.append(mat_trackpad())
    loose.append(pad)

    # Hinge cover: a flush dark strip filling the half-lid-thickness gap the
    # pivot leaves above the deck. A protruding barrel was here first and read
    # as a cheap render — a pro laptop's hinge is a recess, not a hinge.
    cover = flat_slab("Hinge", base_w * HINGE_COVER_W_FRACTION, HINGE_COVER_D_MM * MM,
                      lid_t, 1.6 * MM, corner_segments=6)
    cover.location = (0.0, base_top + lid_t / 2.0 - 0.4 * MM,
                      back_z + HINGE_COVER_D_MM * MM / 2.0 + 1.0 * MM)
    P.smooth_only(cover)
    cover.data.materials.append(mat_grille())
    loose.append(cover)

    # ---- the lid, authored standing vertical on the hinge ----
    # Positions here are already relative to the hinge empty, so parenting is
    # a plain assignment: the empty has no rotation of its own, and glTF gets
    # the local transforms it expects.
    lid = P.link(bpy.data.objects.new("Lid", None))
    lid.empty_display_type = "PLAIN_AXES"
    lid.location = (0.0, hinge_y, back_z + lid_t / 2.0)

    lid_parts = []

    shell = P.rounded_slab("LidShell", lid_w, lid_h, lid_t, radius, corner_segments=16)
    shell.location = (0.0, lid_h / 2.0, 0.0)
    P.soften(shell, EDGE_BEVEL_MM * MM, segments=3)
    shell.data.materials.append(mat_shell())
    lid_parts.append(shell)

    # Cover glass over the lid's face, and the display inset in it.
    glass = P.rounded_slab("LidGlass", lid_w - 1.0 * MM, lid_h - 1.0 * MM, 0.5 * MM,
                           radius - 0.5 * MM, corner_segments=16)
    glass.location = (0.0, lid_h / 2.0, lid_t / 2.0 + 0.25 * MM)
    glass.name = "LidGlass"
    P.smooth_only(glass)
    glass.data.materials.append(P.mat_front_glass())
    lid_parts.append(glass)

    display = P.rounded_slab("Display", disp_w, disp_h, 0.0, 1.6 * MM, corner_segments=10)
    display.location = (0.0, disp_centre_y, lid_t / 2.0 + 0.5 * MM + 0.004)
    display.data.materials.append(mat_disp)
    uv = display.data.uv_layers.new(name="UVMap")
    for loop in display.data.loops:
        co = display.data.vertices[loop.vertex_index].co
        uv.data[loop.index].uv = ((co.x + disp_w / 2.0) / disp_w, (co.y + disp_h / 2.0) / disp_h)
    lid_parts.append(display)

    for part in lid_parts:
        part.parent = lid

    root = P.link(bpy.data.objects.new("Laptop", None))
    root.empty_display_type = "PLAIN_AXES"
    for obj in loose:
        obj.parent = root
    lid.parent = root

    # Centre the open assembly on the origin, because the site rotates the
    # whole device about the world origin and an off-centre model would swing
    # rather than turn.
    open_height = hinge_y + lid_h
    root.location = (0.0, -open_height / 2.0 + REST_LIFT_MM * MM, 0.0)

    dims = dict(base_w=base_w, base_d=base_d, base_h=base_h, lid_w=lid_w, lid_h=lid_h,
                disp_w=disp_w, disp_h=disp_h, open_height=open_height,
                hinge_y=hinge_y, img=(img_w, img_h))
    return root, lid, dims


# -------------------------------------------------------------------- still

def render_still(args, root, lid, dims):
    """One PNG of the resting pose with a transparent surround: the poster the
    site shows if WebGL is missing, and what stands in while the three.js
    chunk is still on the wire."""
    P.build_world()
    P.build_lights()

    r = math.radians
    lid.rotation_euler = (-r(args.lid), 0.0, 0.0)
    root.rotation_euler = (r(args.pitch), r(args.yaw), 0.0)

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.film_transparent = True
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.render.filter_size = 1.0
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.eevee.taa_render_samples = args.samples
    for attr, value in (("use_raytracing", True), ("use_shadows", True)):
        if hasattr(scene.eevee, attr):
            setattr(scene.eevee, attr, value)

    # Frame on width: a laptop is wider than it is tall, so fitting its height
    # the way the phone does would push it off both sides.
    width_px = int(args.res)
    aspect = args.aspect
    scene.render.resolution_x = width_px
    scene.render.resolution_y = int(round(width_px / aspect))
    scene.render.resolution_percentage = 100

    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = 58.0
    cam_data.sensor_fit = "VERTICAL"
    cam = P.link(bpy.data.objects.new("Camera", cam_data))
    scene.camera = cam
    half_fov = math.atan((cam_data.sensor_height / 2.0) / cam_data.lens)
    span = dims["lid_w"]
    cam.location = (0.0, 0.0, (span / 2.0) / (math.tan(half_fov) * aspect * args.fill))
    cam.rotation_euler = (0.0, 0.0, 0.0)

    path = os.path.abspath(os.path.expanduser(args.export_still))
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    scene.render.filepath = path
    scene.frame_set(0)
    bpy.ops.render.render(write_still=True)
    print(f"[hero-laptop] still {path}  {scene.render.resolution_x}x{scene.render.resolution_y}  "
          f"lid {args.lid:.0f} deg, pitch {args.pitch:.0f} deg, yaw {args.yaw:.0f} deg")


# --------------------------------------------------------------------- main

def main():
    args = parse_args(sys.argv)
    if not args.export_glb and not args.export_still and not args.save_blend:
        sys.exit("nothing to do: pass --export-glb, --export-still or --save-blend")

    bare = None
    if args.bare_screen:
        try:
            bare = tuple(int(v) for v in args.screen_aspect.split(":"))
        except ValueError:
            sys.exit(f"--screen-aspect must look like 2200:1248, got {args.screen_aspect!r}")
    else:
        args.screen = os.path.abspath(os.path.expanduser(args.screen))
        if not os.path.isfile(args.screen):
            sys.exit(f"screen image not found: {args.screen}")

    P.clear_scene()
    root, lid, dims = build_laptop(args, bare, for_gltf=args.export_glb is not None)

    if args.export_still:
        render_still(args, root, lid, dims)

    if args.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(os.path.expanduser(args.save_blend)))

    if args.export_glb:
        path = os.path.abspath(os.path.expanduser(args.export_glb))
        os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
        # Authored open and upright: `Lid.rotation.x` is the opening angle and
        # the site owns it. No animation is exported — the entrance is a GSAP
        # tween in DeviceModel so it can be interrupted, scrubbed and skipped
        # under prefers-reduced-motion, none of which a baked clip allows.
        bpy.ops.export_scene.gltf(
            filepath=path,
            export_format="GLB",
            export_apply=True,
            export_cameras=False,
            export_lights=False,
            export_animations=False,
            # As with the phone: the scene is already in three.js's convention,
            # so the Z-up -> Y-up conversion would lay the laptop on its back.
            export_yup=False,
            export_extras=False,
        )
        size = os.path.getsize(path)
        print(f"[hero-laptop] GLB {path}  {size / 1024:.0f} KB")
        print(f"[hero-laptop] base {dims['base_w']:.2f} x {dims['base_d']:.2f} x "
              f"{dims['base_h']:.2f} cm, lid {dims['lid_w']:.2f} x {dims['lid_h']:.2f} cm, "
              f"screen {dims['disp_w']:.2f} x {dims['disp_h']:.2f} cm, "
              f"open height {dims['open_height']:.2f} cm, image {dims['img'][0]}x{dims['img'][1]}")
        print("[hero-laptop] node 'Lid' rotates about X: 0 upright, +90 deg shut, "
              "negative leans back")


if __name__ == "__main__":
    main()
