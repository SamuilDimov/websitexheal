"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Every phone mockup on the site, as a live 3D device.
 *
 * One geometry serves all of them: `public/models/phone.glb`, exported from
 * the same Blender scene (`scripts/hero-phone.blend.py --bare-screen
 * --export-glb`) with no screen image on it — 161 KB, 8,390 triangles. Each
 * instance hangs its own screenshot on the display as an emissive map, so the
 * screens stay ordinary cached images instead of ten embedded copies of the
 * same phone. The GLB is fetched once per page and shared.
 *
 * glTF carries no area light and the Blender scene is lit by four, so the rig
 * is rebuilt here from the numbers in `build_lights()`, and the world's
 * vertical gradient is rebuilt as an environment map — that gradient is most
 * of what makes the titanium read as metal.
 */

/** place_camera(): 58 mm lens on a vertical-fit 24 mm sensor. */
const CAMERA_FOV = (2 * Math.atan(12 / 58) * 180) / Math.PI;

/**
 * build_lights(): position, rectangle, watts. Blender area power is watts over
 * the whole rectangle and three's RectAreaLight intensity is luminance, so
 * `W / (w * h)` is what carries across and EXPOSURE sets the absolute level.
 * 1.18 was found by measurement: at 1.9 the Key's specular on the frame's left
 * bevel clipped to white and the edge read as a drawn line rather than metal.
 */
const EXPOSURE = 1.18;
const LIGHTS = [
  { pos: [-24, 18, 36], size: [70, 70], watts: 5200 },
  { pos: [32, -4, 14], size: [60, 80], watts: 1500 },
  { pos: [8, 32, -20], size: [40, 60], watts: 2800 },
  { pos: [-14, -30, -28], size: [60, 60], watts: 1800 },
] as const;

const R = Math.PI / 180;

export type DevicePose = {
  readonly y: number;
  readonly x?: number;
  readonly rot: readonly [number, number, number];
  /**
   * Lid angle in radians, for a device that has one. The laptop's GLB is
   * authored with the lid upright, so 0 is open flat against the back,
   * +90 deg is shut and a negative angle leans the screen away from you.
   * Devices with no `Lid` node ignore it.
   */
  readonly lid?: number;
};

/** The two geometries the site ships. One GLB each, fetched once per page. */
export const MODELS = {
  phone: "/models/phone.glb",
  laptop: "/models/laptop.glb",
} as const;

export type DeviceName = keyof typeof MODELS;

/**
 * Entrances. The hero's is the render sequence's choreography, kept beat for
 * beat. Other phones get `settle`, which is deliberately a different gesture:
 * the phone is already there, turned away three-quarters, and swings round to
 * face you as it comes into view. A second full flip on every section would
 * read as a tic. The laptop gets `open`, which is its own gesture entirely.
 */
export const ENTRANCES = {
  flip: {
    from: { y: -1.15, rot: [6 * R, -360 * R, -8 * R] },
    to: { y: 0, rot: [0, 0, 0] },
    /**
     * 2.8 s was the frame sequence's length, 1.4x the render's own 2 s, given
     * room because the flip is the hero moment. As a live model it starts
     * after a lazy chunk, a GLB and a texture have landed, so the visitor has
     * already been waiting about a second and a half before the first frame —
     * the animation is not the whole wait, it is the tail of it.
     */
    duration: 1.8,
    /**
     * The frame sequence waited 0.35 s so the flip did not start during
     * hydration. The model is lazy-loaded, so by the time it can play the
     * page has long settled and that beat is only an empty slot — the phone
     * starts below the frame, so every millisecond of it is a hole where the
     * hero's phone should be.
     */
    delay: 0.1,
    ease: "power2.out",
    /** Scroll-scrubbed exit, hero only. */
    exit: { y: -1.45, rot: [-6 * R, 52 * R, 5 * R] },
  },
  settle: {
    from: { y: -0.12, x: 0.06, rot: [2 * R, -38 * R, 3 * R] },
    to: { y: 0, x: 0, rot: [0, 0, 0] },
    duration: 1.5,
    delay: 0.1,
    ease: "power3.out",
    exit: null,
  },
  /**
   * The laptop's entrance, on the professional view. A phone's gesture is a
   * turn, because a phone has no moving part; a laptop's is the lid, and
   * borrowing the flip for it would waste the one thing the geometry was
   * modelled for. It arrives nearly shut and a little low, then rises,
   * squares up and opens onto the workspace.
   *
   * The body rests at 9 deg of pitch rather than square to the camera: an
   * open laptop seen dead-on shows its deck edge-on, so the keyboard vanishes
   * and the machine reads as a screen on a stick. The resting pose is the
   * same one `hero-laptop.blend.py --export-still` renders for the poster, so
   * the still and the live model are the same object in the same attitude and
   * the hand-off between them is invisible.
   */
  open: {
    from: { y: -0.1, x: 0.03, rot: [13 * R, -15 * R, 1.5 * R], lid: 58 * R },
    // The lid rests just off upright, not thrown back: at -20 deg the screen
    // was so foreshortened that the deck became the subject and the workspace
    // — the thing the page is actually selling — was reading edge-on. The
    // body's pitch is what shows the keyboard; the lid's job is to face you.
    to: { y: 0, x: 0, rot: [7 * R, -4 * R, 0], lid: -5 * R },
    duration: 1.7,
    delay: 0.12,
    ease: "power3.out",
    exit: null,
  },
} as const;

export type EntranceName = keyof typeof ENTRANCES;

/**
 * The GLB is fetched once per page however many devices are on it, and the
 * fetch is meant to be served by the `<link rel="preload">` in the layout.
 *
 * That only happens if the preload and the request agree on mode and
 * credentials. `FileLoader` builds a `Request` with `credentials:
 * "same-origin"` and the default `cors` mode — which is precisely what
 * `crossorigin="anonymous"` on the link means, since anonymous maps to
 * credentials mode *same-origin*, not omit. So the loader was always right and
 * the first preload attempt, which had no `crossorigin` at all, was the thing
 * that mismatched: Chrome reported "the request credentials mode does not
 * match" and downloaded the model twice. Do not add `crossorigin` on one side
 * without the other.
 */
const sharedModels = new Map<string, Promise<THREE.Group>>();
function loadDevice(url: string): Promise<THREE.Group> {
  let pending = sharedModels.get(url);
  if (!pending) {
    pending = new Promise<THREE.Group>((resolve, reject) => {
      new GLTFLoader().load(url, (gltf) => resolve(gltf.scene), undefined, reject);
    });
    pending.catch(() => sharedModels.delete(url));
    sharedModels.set(url, pending);
  }
  return pending;
}

/**
 * build_world(): a vertical gradient, 0.18 linear below to 0.92 above at
 * strength 0.7. With a transparent film it is only ever seen in reflections,
 * which is the whole reason it exists.
 */
function gradientEnvironment(renderer: THREE.WebGLRenderer) {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const toSrgb = (linear: number) =>
    Math.round(255 * (linear <= 0.0031308 ? linear * 12.92 : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055));
  const lo = toSrgb(0.18 * 0.7);
  const hi = toSrgb(0.92 * 0.7);
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, `rgb(${hi},${hi},${hi + 3})`);
  grad.addColorStop(0.65, `rgb(${lo},${lo},${lo + 2})`);
  grad.addColorStop(1, `rgb(${lo},${lo},${lo + 2})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(texture).texture;
  pmrem.dispose();
  texture.dispose();
  return env;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function DeviceModel({
  screen,
  poster,
  device = "phone",
  entrance = "settle",
  fill = 0.9,
  fitBy = "height",
  envIntensity = 1,
  parallax = 0.06,
  tilt = 12,
  scrollScope,
  className = "",
}: {
  /** Screenshot to hang on the display. */
  screen: string;
  /** Which geometry to load. `laptop` is the only one with a hinge. */
  device?: DeviceName;
  /** Shown if WebGL or the model is unavailable. Defaults to the screenshot. */
  poster?: string;
  entrance?: EntranceName;
  /** Fraction of the fitted dimension the device fills at rest. */
  fill?: number;
  /**
   * Which of the device's dimensions the camera frames. A phone is taller
   * than it is wide and fits on height; a laptop fits on width, or the open
   * lid pushes it off both sides of the canvas.
   */
  fitBy?: "height" | "width";
  /**
   * How much of the studio's environment reflection the body keeps.
   *
   * The rig has four area lights and an environment gradient, and three's
   * `RectAreaLight` casts no shadows — so a large flat upward-facing surface
   * takes the whole bright top of that gradient with nothing occluding it.
   * On a phone that is fine; a laptop's deck is four times the area and comes
   * out looking like unlit grey clay, brighter than the screen it exists to
   * frame. Damping the environment leaves the area lights' speculars doing
   * the shaping, which is what gives the metal its edges back. The display is
   * never touched: it is emissive and owns its own brightness.
   */
  envIntensity?: number;
  /**
   * Scroll parallax, as a fraction of the device's own height. The device
   * drifts up as its slot crosses the viewport, so it travels against the
   * copy beside it instead of moving with it. 0 turns it off; the hero sets
   * it off because its scrubbed exit already owns the scroll.
   */
  parallax?: number;
  /**
   * Pointer parallax, in degrees of yaw at the edge of the viewport (pitch is
   * two thirds of it). The device turns to follow the cursor, which is the
   * thing a real object on a page does and a flat screenshot cannot. It also
   * slides a little with the turn — rotation alone reads as a hinge, and the
   * small sideways travel is what makes it read as the object leaning. 0 off.
   */
  tilt?: number;
  /** CSS selector whose scroll drives the exit; only `flip` has one. */
  scrollScope?: string;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  /**
   * Swapping the screen must not rebuild the renderer: How-it-works and the
   * feature slideshows change screens as you scroll, and tearing down a WebGL
   * context to change a texture would flash and leak contexts. The effect
   * publishes a swap function here and a second effect calls it.
   */
  const swapRef = useRef<((src: string) => void) | null>(null);
  const screenRef = useRef(screen);
  screenRef.current = screen;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /** No WebGL, or a model that will not load, falls back to a flat still. */
    const fallback = () => {
      const img = document.createElement("img");
      img.src = poster ?? screen;
      img.alt = "";
      img.style.width = "100%";
      img.style.height = "auto";
      host.replaceChildren(img);
    };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      fallback();
      return;
    }
    if (!renderer.getContext()) {
      fallback();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // The render used Blender's Standard view transform, not AgX, so the
    // screenshot's colours survive untouched. NoToneMapping is that.
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.environment = gradientEnvironment(renderer);

    RectAreaLightUniformsLib.init();
    for (const spec of LIGHTS) {
      const [w, h] = spec.size;
      const light = new THREE.RectAreaLight(0xffffff, (spec.watts / (w * h)) * EXPOSURE, w, h);
      light.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
      light.lookAt(0, 0, 0);
      scene.add(light);
    }

    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 1, 400);
    const deviceGroup = new THREE.Group();
    scene.add(deviceGroup);

    const config = ENTRANCES[entrance];
    /** Pose units: poses are fractions of the device's own height. */
    let height = 15.7;
    /** The dimension the camera frames, which is not always that height. */
    let fitSpan = 15.7;
    let raf = 0;
    let disposed = false;
    let needsRender = true;
    const owned: Array<{ dispose: () => void }> = [];

    /**
     * Fitting on width has to run on every resize, not once on load: the
     * distance that keeps a given width in frame depends on the canvas
     * aspect, so a phone rotating to landscape would otherwise crop the
     * laptop rather than reframe it.
     */
    const fitCamera = () => {
      const half = Math.tan((CAMERA_FOV / 2) * R);
      const denominator = fitBy === "width" ? half * Math.max(camera.aspect, 0.01) : half;
      camera.position.z = fitSpan / 2 / (denominator * fill);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      fitCamera();
      camera.updateProjectionMatrix();
      needsRender = true;
    };

    /**
     * Pose and parallax are kept apart: the entrance writes `poseY` once per
     * frame of its tween, the scroll writes `driftY` whenever the page moves,
     * and both are summed when the device is placed. Folding them together
     * would make one overwrite the other.
     */
    let poseY = 0;
    let poseX = 0;
    let driftY = 0;
    /** The laptop's hinge, if this device has one. */
    let lidNode: THREE.Object3D | null = null;
    const poseRot: [number, number, number] = [0, 0, 0];
    /** Where the pointer wants the device to look, and where it is now. */
    let aimYaw = 0;
    let aimPitch = 0;
    let yaw = 0;
    let pitch = 0;
    /**
     * How far the device slides with its turn, as a fraction of its height per
     * radian of yaw. Small: the turn does the work, this only stops it
     * reading as a hinge.
     */
    const SLIDE = 0.22;
    const place = () => {
      deviceGroup.position.y = (poseY + driftY - pitch * SLIDE * 0.6) * height;
      deviceGroup.position.x = (poseX + yaw * SLIDE) * height;
      deviceGroup.rotation.set(poseRot[0] + pitch, poseRot[1] + yaw, poseRot[2]);
      needsRender = true;
    };

    /** Poses are in units of the device's own height, so `fill` can change freely. */
    const setPose = (from: DevicePose, to: DevicePose, t: number) => {
      poseY = lerp(from.y, to.y, t);
      poseX = lerp(from.x ?? 0, to.x ?? 0, t);
      poseRot[0] = lerp(from.rot[0], to.rot[0], t);
      poseRot[1] = lerp(from.rot[1], to.rot[1], t);
      poseRot[2] = lerp(from.rot[2], to.rot[2], t);
      if (lidNode) lidNode.rotation.x = lerp(from.lid ?? 0, to.lid ?? 0, t);
      place();
    };

    /**
     * Pointer parallax. The aim is taken from the cursor's position across the
     * whole viewport rather than across the device's own box: tracking the box
     * makes the device snap as the cursor crosses its edge, and tracking the
     * viewport means it is already turned toward you before you arrive. Eased
     * toward, never set directly, so a flick of the mouse does not jerk it.
     */
    const onPointer = (event: PointerEvent) => {
      if (!tilt) return;
      const nx = (event.clientX / (window.innerWidth || 1)) * 2 - 1;
      const ny = (event.clientY / (window.innerHeight || 1)) * 2 - 1;
      aimYaw = nx * tilt * R;
      aimPitch = -ny * tilt * 0.66 * R;
      wake();
    };

    /**
     * Parallax. `p` runs -1 to 1 as the slot crosses the viewport, so the
     * drift is symmetric about the moment the device is centred and there is
     * no jump when it enters. It is applied in the device's own units, which
     * keeps the effect the same size on every mockup regardless of how big
     * that mockup is drawn.
     */
    const onScroll = () => {
      if (!parallax) return;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centre = rect.top + rect.height / 2;
      const p = Math.max(-1, Math.min(1, (vh / 2 - centre) / (vh / 2 + rect.height / 2)));
      driftY = p * parallax;
      place();
    };

    const renderFrame = () => {
      renderer.render(scene, camera);
      needsRender = false;
    };
    const tick = () => {
      if (disposed) return;
      // Ease the pointer tilt here rather than in the pointer handler, so the
      // device keeps turning after the cursor stops instead of snapping to
      // wherever it was last seen.
      const dy = aimYaw - yaw;
      const dp = aimPitch - pitch;
      if (Math.abs(dy) > 0.0002 || Math.abs(dp) > 0.0002) {
        yaw += dy * 0.11;
        pitch += dp * 0.11;
        place();
      }
      if (needsRender) renderFrame();
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (tilt && !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    let introTween: gsap.core.Tween | undefined;
    let trigger: ScrollTrigger | undefined;
    let entranceObserver: IntersectionObserver | undefined;

    Promise.all([
      loadDevice(MODELS[device]),
      new Promise<THREE.Texture>((resolve, reject) =>
        new THREE.TextureLoader().load(screenRef.current, resolve, undefined, reject),
      ),
    ])
      .then(([template, texture]) => {
        if (disposed) return;
        // glTF UVs put v = 0 at the top of the image, which is why GLTFLoader
        // turns flipY off for its own textures; a runtime one has to match.
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        owned.push(texture);

        let display: THREE.MeshStandardMaterial | null = null;
        const model = template.clone(true);
        model.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) return;
          // Clone shares materials with the template; the display needs its own
          // so each device on the page can carry a different screen.
          if (node.material instanceof THREE.MeshStandardMaterial && node.material.name === "Display") {
            const material = node.material.clone();
            material.emissiveMap = texture;
            material.emissive = new THREE.Color(0xffffff);
            material.needsUpdate = true;
            node.material = material;
            display = material;
            owned.push(material);
            return;
          }
          if (
            envIntensity !== 1 &&
            node.material instanceof THREE.MeshStandardMaterial
          ) {
            // Cloned per instance: the template's materials are shared with
            // every other device on the page.
            const material = node.material.clone();
            material.envMapIntensity = envIntensity;
            material.needsUpdate = true;
            node.material = material;
            owned.push(material);
          }
        });
        lidNode = model.getObjectByName("Lid") ?? null;
        deviceGroup.add(model);

        /**
         * Swap the screen with a dip rather than a cut. The display is the
         * only emissive surface, so dimming it and bringing it back reads as
         * the screen itself changing — which is the one transition a phone can
         * honestly make. A true crossfade would need two display quads or a
         * custom shader for a 0.4 s moment.
         */
        const material = display as THREE.MeshStandardMaterial | null;
        if (material) {
          let pending: THREE.Texture | null = null;
          swapRef.current = (src: string) => {
            new THREE.TextureLoader().load(src, (next) => {
              if (disposed) {
                next.dispose();
                return;
              }
              next.flipY = false;
              next.colorSpace = THREE.SRGBColorSpace;
              next.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
              pending = next;
              owned.push(next);
              if (reduced) {
                // No dip under reduced motion; every texture this instance
                // loaded is in `owned` and disposed together at teardown.
                material.emissiveMap = pending;
                material.needsUpdate = true;
                pending = null;
                needsRender = true;
                return;
              }
              gsap.to(material, {
                emissiveIntensity: 0.06,
                duration: 0.18,
                ease: "power2.in",
                onUpdate: () => {
                  needsRender = true;
                },
                onComplete: () => {
                  if (disposed || !pending) return;
                  material.emissiveMap = pending;
                  material.needsUpdate = true;
                  pending = null;
                  gsap.to(material, {
                    emissiveIntensity: 1,
                    duration: 0.28,
                    ease: "power2.out",
                    onUpdate: () => {
                      needsRender = true;
                    },
                  });
                },
              });
            });
          };
        }

        // Measured at the authored pose, before the entrance moves anything:
        // for the laptop that is the lid upright, which is a stable box to
        // frame against however far the lid happens to be open.
        const box = new THREE.Box3().setFromObject(model);
        height = box.max.y - box.min.y;
        fitSpan = fitBy === "width" ? box.max.x - box.min.x : height;

        resize();
        // The first painted frame has to be wherever the entrance starts, not
        // the resting pose. Painting at rest and then jumping to the start
        // pose showed the finished phone for a frame, blanked it, and only
        // then played the entrance — a flash on every refresh, and the flip's
        // 0.35 s lead-in made the gap long enough to read as a bug.
        const opening = reduced ? config.to : config.from;
        setPose(opening, config.to, 0);
        onScroll();
        renderFrame();
        raf = requestAnimationFrame(tick);

        if (reduced) return;

        const play = () => {
          introTween = gsap.to(
            { t: 0 },
            {
              t: 1,
              duration: config.duration,
              delay: config.delay,
              ease: config.ease,
              onUpdate() {
                setPose(config.from, config.to, this.targets()[0].t as number);
              },
            },
          );
        };

        // The hero is above the fold and plays on load; everything else waits
        // until it is actually looked at, which is what makes the entrance an
        // entrance rather than something that happened while you scrolled past.
        if (entrance === "flip") {
          play();
        } else {
          entranceObserver = new IntersectionObserver(
            ([entry]) => {
              if (!entry.isIntersecting) return;
              entranceObserver?.disconnect();
              play();
            },
            { threshold: 0.3 },
          );
          entranceObserver.observe(host);
        }

        if (config.exit && scrollScope) {
          const exit = config.exit;
          trigger = ScrollTrigger.create({
            trigger: scrollScope,
            start: "top top",
            end: "bottom 20%",
            onUpdate: (self) => {
              if (introTween?.isActive()) return;
              // The first 15 % of the section's exit keeps the pose.
              const p = Math.max(0, (self.progress - 0.15) / 0.85);
              setPose(config.to, exit, Math.min(1, p));
            },
          });
        }
      })
      .catch(fallback);

    return () => {
      disposed = true;
      swapRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      entranceObserver?.disconnect();
      introTween?.kill();
      trigger?.kill();
      // Only this instance's own texture and material; the geometry and the
      // template's materials are shared and outlive it.
      for (const item of owned) item.dispose();
      scene.environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // `screen` is deliberately not a dependency: it is read through a ref and
    // changes are handled by the swap below, without a rebuild.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poster, device, entrance, fill, fitBy, envIntensity, parallax, tilt, scrollScope]);

  useEffect(() => {
    swapRef.current?.(screen);
  }, [screen]);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
