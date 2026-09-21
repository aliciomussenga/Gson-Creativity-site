import { useEffect, useRef } from "react"
import * as THREE from "three"

const GSON_YELLOW = 0xF2E30C
const GSON_DARK   = 0x0d0d14

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return

        // ── Renderer ─────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)

        // ── Scene ─────────────────────────────────────────────────────
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 200)
        camera.position.set(0, 1.5, 14)

        // ── Lights ────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.2))
        const key = new THREE.DirectionalLight(GSON_YELLOW, 5)
        key.position.set(5, 8, 6)
        scene.add(key)
        const fill = new THREE.DirectionalLight(0xffffff, 1.5)
        fill.position.set(-5, 3, 5)
        scene.add(fill)
        const rim = new THREE.PointLight(GSON_YELLOW, 10, 35, 1.2)
        rim.position.set(0, -3, -6)
        scene.add(rim)

        // ── Geometry ──────────────────────────────────────────────────
        const GRID = 4, CSIZE = 0.5, GAP = 0.14
        const STEP = CSIZE + GAP
        const SPREAD = ((GRID - 1) / 2) * STEP
        const COUNT = GRID ** 3
        const geo = new THREE.BoxGeometry(CSIZE, CSIZE, CSIZE)

        const matY = new THREE.MeshStandardMaterial({
            color: GSON_YELLOW, metalness: 0.1, roughness: 0.35,
            emissive: GSON_YELLOW, emissiveIntensity: 0
        })
        const matD = new THREE.MeshStandardMaterial({
            color: GSON_DARK, metalness: 0.5, roughness: 0.25
        })

        const Y_COUNT = Math.ceil(COUNT * 0.55)
        const D_COUNT = COUNT - Y_COUNT
        const meshY = new THREE.InstancedMesh(geo, matY, Y_COUNT)
        const meshD = new THREE.InstancedMesh(geo, matD, D_COUNT)
        meshY.castShadow = meshY.receiveShadow = true
        meshD.castShadow = meshD.receiveShadow = true

        const dummy = new THREE.Object3D()
        let yi = 0, di = 0

        for (let ix = 0; ix < GRID; ix++)
        for (let iy = 0; iy < GRID; iy++)
        for (let iz = 0; iz < GRID; iz++) {
            const x = ix * STEP - SPREAD
            const y = iy * STEP - SPREAD
            const z = iz * STEP - SPREAD
            dummy.position.set(x, y, z)
            dummy.rotation.set(0, 0, 0)
            dummy.scale.setScalar(0.01) // start tiny for intro anim
            dummy.updateMatrix()
            const isY = (ix + iy + iz) % 2 === 0
            if (isY && yi < Y_COUNT)       meshY.setMatrixAt(yi++, dummy.matrix)
            else if (!isY && di < D_COUNT) meshD.setMatrixAt(di++, dummy.matrix)
        }
        meshY.instanceMatrix.needsUpdate = true
        meshD.instanceMatrix.needsUpdate = true

        const group = new THREE.Group()
        group.add(meshY, meshD)
        scene.add(group)

        // ── anime.js — async import to use getInstances ───────────────
        let rafId = 0
        let animeCleanup: (() => void)[] = []

        ;(async () => {
            const { animate, stagger } = await import("animejs")
            const { getInstances } = await import("animejs/adapters/three")

            // Intro: explode in from center using per-instance stagger
            const instY = getInstances(meshY)
            const instD = getInstances(meshD)

            // Scale up from 0 → 1 with stagger per cube
            animate(instY, {
                scale: { from: 0.01, to: 1 },
                duration: 900,
                delay: stagger(35, { from: "center" }),
                ease: "outElastic(1, 0.7)",
            })
            animate(instD, {
                scale: { from: 0.01, to: 1 },
                duration: 900,
                delay: stagger(35, { from: "center", start: 100 }),
                ease: "outElastic(1, 0.7)",
            })

            // Continuous group rotation
            const rotAnim = animate(group.rotation as unknown as Record<string, number>, {
                y: Math.PI * 2,
                duration: 22000,
                loop: true,
                ease: "linear",
            })
            animeCleanup.push(() => rotAnim.cancel())

            // Tilt oscillation
            const tiltAnim = animate(group.rotation as unknown as Record<string, number>, {
                x: { from: 0.25, to: -0.25 },
                duration: 7000, loop: true, alternate: true, ease: "inOutSine",
            })
            animeCleanup.push(() => tiltAnim.cancel())

            // Breathe
            const breatheAnim = animate(group.scale as unknown as Record<string, number>, {
                x: { from: 1, to: 1.06 },
                y: { from: 1, to: 1.06 },
                z: { from: 1, to: 1.06 },
                duration: 4500, loop: true, alternate: true, ease: "inOutSine",
            })
            animeCleanup.push(() => breatheAnim.cancel())

            // Emissive pulse
            const emissiveProxy = { v: 0 }
            const emAnim = animate(emissiveProxy, {
                v: 0.3,
                duration: 3000, loop: true, alternate: true, ease: "inOutQuad",
                onUpdate: () => { matY.emissiveIntensity = emissiveProxy.v },
            })
            animeCleanup.push(() => emAnim.cancel())

            // Rim pulse
            const rimProxy = { v: 10 }
            const rimAnim = animate(rimProxy, {
                v: 22, duration: 2800, loop: true, alternate: true, ease: "inOutSine",
                onUpdate: () => { rim.intensity = rimProxy.v },
            })
            animeCleanup.push(() => rimAnim.cancel())

            // Per-instance random float — each cube gets its own subtle Y drift
            animate(instY, {
                y: () => (Math.random() - 0.5) * 0.3,
                duration: () => 2500 + Math.random() * 2000,
                delay: stagger(80),
                loop: true, alternate: true, ease: "inOutSine",
            })
            animate(instD, {
                y: () => (Math.random() - 0.5) * 0.3,
                duration: () => 2500 + Math.random() * 2000,
                delay: stagger(80, { start: 40 }),
                loop: true, alternate: true, ease: "inOutSine",
            })
        })()

        // ── Mouse parallax ────────────────────────────────────────────
        const mouse = { x: 0, y: 0 }
        const onMouse = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener("mousemove", onMouse, { passive: true })

        // ── Render loop ───────────────────────────────────────────────
        const tick = () => {
            rafId = requestAnimationFrame(tick)
            group.rotation.y += mouse.x * 0.006
            group.position.y += (mouse.y * -0.5 - group.position.y) * 0.04
            renderer.render(scene, camera)
        }
        tick()

        // ── Resize ────────────────────────────────────────────────────
        const onResize = () => {
            const w = container.clientWidth, h = container.clientHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
        window.addEventListener("resize", onResize, { passive: true })

        return () => {
            cancelAnimationFrame(rafId)
            animeCleanup.forEach(fn => fn())
            window.removeEventListener("mousemove", onMouse)
            window.removeEventListener("resize", onResize)
            renderer.dispose()
            geo.dispose()
            matY.dispose()
            matD.dispose()
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }} />
    )
}
