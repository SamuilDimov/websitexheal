#!/usr/bin/env python3
"""
Build and render the hero phone as a 3D scene, headlessly.

    /Applications/Blender.app/Contents/MacOS/Blender --background \
      --python scripts/hero-phone.blend.py -- \
      --screen ~/Documents/xHeal/BusinessCards/Logo/DASHBOARDWEB.png \
      --out ~/Documents/hero-3d

Why this exists: the After Effects mockup rasterises the phone at roughly
443 x 734 and then upscales it 1.51x, which leaves a stair-stepped silhouette
and soft screen text. Geometry has no such ceiling. The device is modelled in
layers the way the real one is built: a titanium frame, a black glass front
with the display inset in it, a matte glass back with the camera plateau and
lenses, and the side buttons. The screenshot is mapped onto the display as
pure emission so its colours survive untouched.

Output is a PNG sequence with alpha that feeds scripts/build-hero-sequence.mjs
unchanged. The animation reproduces the three beats of the original render,
keyed on the same source frames so the existing --keep ranges still apply:

    0 -> 120    rise from below through a whole 360 flip, ease out to face the camera
    120 -> 256  hold
    256 -> 308  tilt away and descend out of frame
    308 -> 326  gone
    (lengths and the flip angle are CLI flags; the script prints the resulting --keep)

Useful flags:
    --frame 68            render a single frame (fast look-see)
    --res 1800x3200       output resolution
    --fill 0.78           fraction of frame height the phone occupies at hold
    --samples 128         EEVEE anti-aliasing samples
    --save-blend PATH     also write the .blend for hand-tweaking
"""

import argparse
import math
import os
import sys

import bpy
import bmesh
from mathutils import Vector

# Beat lengths in source frames at 60 fps. Overridable from the CLI; the
# resulting boundaries are printed so build-hero-sequence.mjs gets the right
# --keep ranges.
INTRO_FRAMES = 120   # rise and full flip, 2.0 s
HOLD_FRAMES = 136
EXIT_FRAMES = 52
TAIL_FRAMES = 18
FLIP_DEGREES = 360.0

# Device dimensions in millimetres (iPhone 15 Pro Max proportions). The display
# height follows the screenshot's aspect so the UI is never stretched.
DISPLAY_WIDTH_MM = 69.6
FRAME_MM = 1.4          # visible titanium frame around the glass
GLASS_BORDER_MM = 1.6   # black glass border between frame and display
BODY_DEPTH_MM = 8.25
CORNER_RADIUS_MM = 13.5
EDGE_BEVEL_MM = 1.1

MM = 0.1  # millimetre -> Blender unit (centimetre)


def parse_args(argv):
    argv = argv[argv.index("--") + 1 :] if "--" in argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--screen", default=os.path.expanduser("~/Documents/xHeal/BusinessCards/Logo/DASHBOARDWEB.png"))
    p.add_argument("--out", default=os.path.expanduser("~/Documents/hero-3d"))
    p.add_argument("--res", default="1800x3200")
    p.add_argument("--fill", type=float, default=0.78)
    p.add_argument("--samples", type=int, default=128)
    p.add_argument("--frame", type=int, default=None)
    p.add_argument("--start", type=int, default=0)
    p.add_argument("--end", type=int, default=None)
    p.add_argument("--flip", type=float, default=FLIP_DEGREES, help="intro rotation in degrees; 360 is a whole flip")
    p.add_argument("--intro-frames", type=int, default=INTRO_FRAMES)
    p.add_argument("--hold-frames", type=int, default=HOLD_FRAMES)
    p.add_argument("--exit-frames", type=int, default=EXIT_FRAMES)
    p.add_argument("--tail-frames", type=int, default=TAIL_FRAMES)
    p.add_argument("--save-blend", default=None)
    return p.parse_args(argv)


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def link(obj):
    bpy.context.collection.objects.link(obj)
    return obj


def mesh_from_bm(name, bm):
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    return link(bpy.data.objects.new(name, mesh))


def rounded_slab(name, width, height, depth, radius, corner_segments=28):
    """Rounded-rectangle profile, extruded to `depth` and centred on Z.
    `depth` 0 gives a flat face (used for the display, whose emissive side
    walls would otherwise glow along the border)."""
    bm = bmesh.new()
    hw, hh = width / 2.0, height / 2.0
    verts = [bm.verts.new(v) for v in [(-hw, -hh, 0.0), (hw, -hh, 0.0), (hw, hh, 0.0), (-hw, hh, 0.0)]]
    bm.faces.new(verts)
    bm.normal_update()
    bmesh.ops.bevel(bm, geom=list(bm.verts), offset=radius, offset_type="OFFSET",
                    segments=corner_segments, profile=0.5, affect="VERTICES")
    bm.normal_update()
    if depth > 0.0:
        ret = bmesh.ops.extrude_face_region(bm, geom=list(bm.faces))
        moved = [e for e in ret["geom"] if isinstance(e, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, vec=(0.0, 0.0, depth), verts=moved)
        bmesh.ops.translate(bm, vec=(0.0, 0.0, -depth / 2.0), verts=list(bm.verts))
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    return mesh_from_bm(name, bm)


def cylinder(name, radius, depth, segments=64):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segments,
                          radius1=radius, radius2=radius, depth=depth)
    return mesh_from_bm(name, bm)


def soften(obj, bevel_width, segments=5, angle_deg=30.0):
    """Edge bevel plus angle-based smoothing so edges catch a highlight instead
    of reading as a hard cut."""
    mod = obj.modifiers.new("EdgeBevel", "BEVEL")
    mod.width = bevel_width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(40.0)
    smooth_only(obj, angle_deg)


def smooth_only(obj, angle_deg=30.0):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    try:
        bpy.ops.object.shade_auto_smooth(angle=math.radians(angle_deg))
    except Exception:
        try:
            wn = obj.modifiers.new("WeightedNormal", "WEIGHTED_NORMAL")
            wn.keep_sharp = True
        except Exception:
            pass
    obj.select_set(False)


# ---------------------------------------------------------------- materials

def principled(name, color, metallic, roughness, **extra):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    b = mat.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1.0)
    b.inputs["Metallic"].default_value = metallic
    b.inputs["Roughness"].default_value = roughness
    for k, v in extra.items():
        if k in b.inputs:
            b.inputs[k].default_value = v
    return mat


def mat_titanium():
    # Natural titanium: warm grey, brushed. Anisotropy gives the frame the
    # lengthwise sheen of a machined edge.
    return principled("Titanium", (0.56, 0.55, 0.53), 1.0, 0.32,
                      **{"Anisotropic": 0.6, "Anisotropic Rotation": 0.0, "Coat Weight": 0.15})


def mat_back_glass():
    # Frosted back glass: dielectric, matte, slightly lighter than the frame.
    return principled("BackGlass", (0.60, 0.60, 0.59), 0.0, 0.55, **{"Specular IOR Level": 0.5})


def mat_front_glass():
    # Black cover glass around the display. Low roughness so the narrow border
    # picks up a crisp reflection of the studio world without washing anything.
    return principled("FrontGlass", (0.006, 0.007, 0.010), 0.0, 0.04,
                      **{"Specular IOR Level": 0.7, "Coat Weight": 0.4})


def mat_lens():
    return principled("Lens", (0.004, 0.004, 0.006), 0.0, 0.02, **{"Coat Weight": 1.0})


def mat_lens_ring():
    return principled("LensRing", (0.42, 0.42, 0.41), 1.0, 0.25)


def mat_flash():
    m = principled("Flash", (0.85, 0.82, 0.72), 0.0, 0.3)
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Emission Color"].default_value = (0.9, 0.85, 0.7, 1.0)
    b.inputs["Emission Strength"].default_value = 0.15
    return m


def mat_display(image_path):
    """Pure emission. A Principled surface over the display reflects the world
    across the whole flat screen and veils the UI grey; emission alone
    reproduces the screenshot exactly. The image alpha (rounded corners) is
    multiplied in so any transparent corner reads as black glass, not as a
    stray colour."""
    img = bpy.data.images.load(os.path.expanduser(image_path))
    img.colorspace_settings.name = "sRGB"
    mat = bpy.data.materials.new("Display")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.remove(nt.nodes["Principled BSDF"])
    out = nt.nodes["Material Output"]
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    tex.extension = "EXTEND"
    tex.interpolation = "Cubic"
    mul = nt.nodes.new("ShaderNodeMix")
    mul.data_type = "RGBA"
    mul.blend_type = "MULTIPLY"
    mul.inputs["Factor"].default_value = 1.0
    emit = nt.nodes.new("ShaderNodeEmission")
    emit.inputs["Strength"].default_value = 1.0
    nt.links.new(tex.outputs["Color"], mul.inputs[6])
    nt.links.new(tex.outputs["Alpha"], mul.inputs[7])
    nt.links.new(mul.outputs[2], emit.inputs["Color"])
    nt.links.new(emit.outputs["Emission"], out.inputs["Surface"])
    return mat, img.size[0], img.size[1]


# -------------------------------------------------------------------- scene

def build_world():
    """Vertical gradient environment: bright above, darker below. With a
    transparent film it only appears in reflections, which is exactly where
    metal and glass need it."""
    world = bpy.data.worlds.new("Studio")
    bpy.context.scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    bg = nt.nodes["Background"]
    coord = nt.nodes.new("ShaderNodeTexCoord")
    mapping = nt.nodes.new("ShaderNodeMapping")
    mapping.inputs["Rotation"].default_value = (math.radians(90.0), 0.0, 0.0)
    grad = nt.nodes.new("ShaderNodeTexGradient")
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = (0.18, 0.19, 0.22, 1.0)
    ramp.color_ramp.elements[1].position = 0.75
    ramp.color_ramp.elements[1].color = (0.92, 0.93, 0.96, 1.0)
    nt.links.new(coord.outputs["Generated"], mapping.inputs["Vector"])
    nt.links.new(mapping.outputs["Vector"], grad.inputs["Vector"])
    nt.links.new(grad.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 0.7


def build_lights():
    def area(name, location, rotation, size, energy):
        data = bpy.data.lights.new(name, "AREA")
        data.shape = "RECTANGLE"
        data.size, data.size_y = size
        data.energy = energy
        obj = link(bpy.data.objects.new(name, data))
        obj.location = location
        obj.rotation_euler = rotation
        return obj

    # Key from upper front-left, a broad soft fill from the right, a rim from
    # behind so the frame separates from a light page, and a low kicker that
    # lights the back glass when the phone faces away.
    area("Key", (-24.0, 18.0, 36.0), (math.radians(34), math.radians(-26), 0.0), (70, 70), 5200)
    area("Fill", (32.0, -4.0, 14.0), (math.radians(72), math.radians(30), 0.0), (60, 80), 1500)
    area("Rim", (8.0, 32.0, -20.0), (math.radians(138), math.radians(10), 0.0), (40, 60), 2800)
    area("Kicker", (-14.0, -30.0, -28.0), (math.radians(-130), math.radians(-14), 0.0), (60, 60), 1800)


def key(obj, frame, location=None, rotation=None, easing="AUTO"):
    if location is not None:
        obj.location = location
        obj.keyframe_insert("location", frame=frame)
    if rotation is not None:
        obj.rotation_euler = rotation
        obj.keyframe_insert("rotation_euler", frame=frame)
    if obj.animation_data and obj.animation_data.action:
        for fc in obj.animation_data.action.fcurves:
            for kp in fc.keyframe_points:
                if abs(kp.co[0] - frame) < 0.5:
                    kp.interpolation = "BEZIER"
                    kp.easing = easing


def animate(phone, height, beats, flip_deg):
    """Rise from below while turning `flip_deg` about the vertical axis, ease
    out into the hold facing the camera, then tilt away and descend. The phone
    is below the frame at frame 0, so the start angle is never seen; with a
    360 the back and both edges pass the camera before it settles."""
    intro_end, hold_end, exit_end, last = beats
    below = -height * 1.15
    gone = -height * 1.45
    r = math.radians
    key(phone, 0, (0.0, below, 0.0), (r(6), r(-flip_deg), r(-8)))
    key(phone, intro_end, (0.0, 0.0, 0.0), (0.0, 0.0, 0.0), easing="EASE_OUT")
    key(phone, hold_end, (0.0, 0.0, 0.0), (0.0, 0.0, 0.0))
    key(phone, exit_end, (0.0, gone, 0.0), (r(-6), r(52), r(5)), easing="EASE_IN")
    key(phone, last, (0.0, gone, 0.0), (r(-6), r(52), r(5)))
    for fc in phone.animation_data.action.fcurves:
        fc.extrapolation = "CONSTANT"


def place_camera(height, fill):
    data = bpy.data.cameras.new("Camera")
    data.lens = 58.0
    data.sensor_fit = "VERTICAL"
    cam = link(bpy.data.objects.new("Camera", data))
    bpy.context.scene.camera = cam
    half_fov = math.atan((data.sensor_height / 2.0) / data.lens)
    cam.location = Vector((0.0, 0.0, (height / 2.0) / (math.tan(half_fov) * fill)))
    cam.rotation_euler = (0.0, 0.0, 0.0)
    return cam


def configure_render(args, width, height_px):
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.resolution_x = width
    scene.render.resolution_y = height_px
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.fps = 60
    # EEVEE's default 1.5 px film filter softens the whole frame; 1.0 keeps
    # anti-aliasing while leaving the display text crisp.
    scene.render.filter_size = 1.0
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 15
    # Standard, not AgX: the screenshot must survive untouched.
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    eevee = scene.eevee
    eevee.taa_render_samples = args.samples
    for attr, value in (("use_raytracing", True), ("use_shadows", True), ("use_volumetric_lights", False)):
        if hasattr(eevee, attr):
            setattr(eevee, attr, value)
    if hasattr(eevee, "ray_tracing_options"):
        try:
            eevee.ray_tracing_options.resolution_scale = "1"
        except Exception:
            pass
    out = os.path.expanduser(args.out)
    os.makedirs(out, exist_ok=True)
    scene.render.filepath = os.path.join(out, "phone_")
    scene.render.use_file_extension = True
    scene.frame_start = args.start
    scene.frame_end = args.end if args.end is not None else args.beats[3]
    return out


# -------------------------------------------------------------------- device

def build_phone(screen_path):
    """Returns (parent empty, body height, dims). Front is +Z, top of the phone is +Y."""
    mat_disp, img_w, img_h = mat_display(screen_path)

    disp_w = DISPLAY_WIDTH_MM * MM
    disp_h = disp_w * (img_h / img_w)
    glass_w = disp_w + 2 * GLASS_BORDER_MM * MM
    glass_h = disp_h + 2 * GLASS_BORDER_MM * MM
    body_w = glass_w + 2 * FRAME_MM * MM
    body_h = glass_h + 2 * FRAME_MM * MM
    body_d = BODY_DEPTH_MM * MM
    top = body_d / 2.0
    r_body = CORNER_RADIUS_MM * MM
    r_glass = r_body - FRAME_MM * MM
    r_disp = r_glass - GLASS_BORDER_MM * MM

    parts = []

    # Titanium frame: the whole body volume; the glass panels sit on its faces.
    body = rounded_slab("Frame", body_w, body_h, body_d, r_body)
    soften(body, EDGE_BEVEL_MM * MM)
    body.data.materials.append(mat_titanium())
    parts.append(body)

    # Front cover glass, inset by the frame, sitting proud by a hair.
    front = rounded_slab("FrontGlass", glass_w, glass_h, 0.6 * MM, r_glass)
    front.location = (0.0, 0.0, top + 0.3 * MM)
    smooth_only(front)
    front.data.materials.append(mat_front_glass())
    parts.append(front)

    # Display, flat, inset again by the black border.
    display = rounded_slab("Display", disp_w, disp_h, 0.0, r_disp)
    display.location = (0.0, 0.0, top + 0.6 * MM + 0.004)
    display.data.materials.append(mat_disp)
    uv = display.data.uv_layers.new(name="UVMap")
    for loop in display.data.loops:
        co = display.data.vertices[loop.vertex_index].co
        uv.data[loop.index].uv = ((co.x + disp_w / 2.0) / disp_w, (co.y + disp_h / 2.0) / disp_h)
    parts.append(display)

    # Back glass, matte, inset by the frame.
    back = rounded_slab("BackGlass", glass_w, glass_h, 0.6 * MM, r_glass)
    back.location = (0.0, 0.0, -(top + 0.3 * MM))
    smooth_only(back)
    back.data.materials.append(mat_back_glass())
    parts.append(back)

    # Camera plateau at the back's upper-left, then three lenses and a flash.
    plate_w = 37.0 * MM
    plate = rounded_slab("CameraPlate", plate_w, plate_w, 2.2 * MM, 9.0 * MM)
    px = -body_w / 2.0 + plate_w / 2.0 + 5.5 * MM
    py = body_h / 2.0 - plate_w / 2.0 - 5.5 * MM
    plate.location = (px, py, -(top + 0.6 * MM + 1.1 * MM))
    soften(plate, 0.5 * MM, segments=4)
    plate.data.materials.append(mat_back_glass())
    parts.append(plate)

    lens_r, ring_r = 5.6 * MM, 6.9 * MM
    plate_face = -(top + 0.6 * MM + 2.2 * MM)
    for i, (lx, ly) in enumerate([(-8.6, 8.6), (-8.6, -8.6), (8.6, 0.0)]):
        ring = cylinder(f"LensRing{i}", ring_r, 1.6 * MM)
        ring.location = (px + lx * MM, py + ly * MM, plate_face - 0.8 * MM)
        smooth_only(ring, 20.0)
        ring.data.materials.append(mat_lens_ring())
        glass = cylinder(f"Lens{i}", lens_r, 0.4 * MM)
        glass.location = (px + lx * MM, py + ly * MM, plate_face - 1.6 * MM - 0.2 * MM)
        smooth_only(glass, 20.0)
        glass.data.materials.append(mat_lens())
        parts += [ring, glass]
    flash = cylinder("Flash", 2.6 * MM, 0.3 * MM, segments=48)
    flash.location = (px + 8.6 * MM, py + 10.5 * MM, plate_face - 0.15 * MM)
    flash.data.materials.append(mat_flash())
    parts.append(flash)

    # Side buttons: action + volume on the left, power on the right.
    def button(name, x_sign, y_center, length, depth=0.55 * MM, width=2.9 * MM):
        b = rounded_slab(name, depth, length, width, depth / 2.0 - 0.001, corner_segments=8)
        b.location = (x_sign * (body_w / 2.0 + depth / 2.0 - 0.05 * MM), y_center, 0.0)
        smooth_only(b)
        b.data.materials.append(mat_titanium())
        return b

    parts.append(button("ActionButton", -1, body_h / 2.0 - 34.0 * MM, 8.0 * MM))
    parts.append(button("VolumeUp", -1, body_h / 2.0 - 50.0 * MM, 22.0 * MM))
    parts.append(button("VolumeDown", -1, body_h / 2.0 - 75.0 * MM, 22.0 * MM))
    parts.append(button("Power", 1, body_h / 2.0 - 52.0 * MM, 34.0 * MM))

    phone = link(bpy.data.objects.new("Phone", None))
    phone.empty_display_type = "PLAIN_AXES"
    for p in parts:
        p.parent = phone
    return phone, body_h, (body_w, body_h, body_d, img_w, img_h)


def main():
    args = parse_args(sys.argv)
    try:
        res_w, res_h = (int(v) for v in args.res.lower().split("x"))
    except ValueError:
        sys.exit(f"--res must look like 1800x3200, got {args.res!r}")
    screen_path = os.path.expanduser(args.screen)
    if not os.path.isfile(screen_path):
        sys.exit(f"screen image not found: {screen_path}")

    intro_end = args.intro_frames
    hold_end = intro_end + args.hold_frames
    exit_end = hold_end + args.exit_frames
    last = exit_end + args.tail_frames
    args.beats = (intro_end, hold_end, exit_end, last)

    clear_scene()
    phone, body_h, (bw, bh, bd, iw, ih) = build_phone(screen_path)
    build_world()
    build_lights()
    place_camera(body_h, args.fill)
    animate(phone, body_h, args.beats, args.flip)
    out = configure_render(args, res_w, res_h)

    if args.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.expanduser(args.save_blend))

    print(f"[hero-phone] body {bw:.2f} x {bh:.2f} x {bd:.2f} cm, screen image {iw}x{ih}, "
          f"render {res_w}x{res_h}, samples {args.samples}, flip {args.flip:.0f} deg, out {out}")
    print(f"[hero-phone] beats: intro 0-{intro_end}, hold {intro_end}-{hold_end}, exit {hold_end}-{exit_end}, "
          f"last {last}  ->  build-hero-sequence.mjs --keep 0-{intro_end},{hold_end}-{exit_end} --hold {intro_end}")

    scene = bpy.context.scene
    if args.frame is not None:
        scene.frame_set(args.frame)
        scene.render.filepath = os.path.join(out, f"test_{args.frame:04d}")
        bpy.ops.render.render(write_still=True)
    else:
        bpy.ops.render.render(animation=True)


if __name__ == "__main__":
    main()
