import { useEffect, useRef } from "react"
import * as THREE from "three"

const GSON_YELLOW = 0xF2E30C
const GSON_DARK = 0x0d0d14
type Cube = { mesh: THREE.Mesh; base: THREE.Vector3; phase: number; spin: number }

/** The modular cube is Gson's 3D signature in the home hero. */
export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace
        container.appendChild(renderer.domElement)
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, 1, .1, 100); camera.position.set(0, .2, 12)
        scene.add(new THREE.HemisphereLight(0xffffff, GSON_DARK, 2.6))
        const key = new THREE.DirectionalLight(GSON_YELLOW, 5); key.position.set(4, 6, 6); scene.add(key)
        const rim = new THREE.PointLight(GSON_YELLOW, 24, 22, 2); rim.position.set(-3, -2, 5); scene.add(rim)
        const group = new THREE.Group(); group.position.x = 2.7; group.rotation.set(.28, -.48, .08); scene.add(group)
        const geometry = new THREE.BoxGeometry(.47, .47, .47)
        const yellow = new THREE.MeshStandardMaterial({ color: GSON_YELLOW, roughness: .25, metalness: .18, emissive: GSON_YELLOW, emissiveIntensity: .06 })
        const dark = new THREE.MeshStandardMaterial({ color: GSON_DARK, roughness: .2, metalness: .62 })
        const cubes: Cube[] = []
        for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) for (let z = 0; z < 4; z++) {
            const mesh = new THREE.Mesh(geometry, (x + y + z) % 2 ? dark : yellow)
            const base = new THREE.Vector3((x - 1.5) * .7, (y - 1.5) * .7, (z - 1.5) * .7)
            mesh.position.copy(base).multiplyScalar(reducedMotion ? 1 : .03); mesh.scale.setScalar(reducedMotion ? 1 : .03); group.add(mesh)
            cubes.push({ mesh, base, phase: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .7 })
        }
        const pointer = new THREE.Vector2(); const target = new THREE.Vector2(-.48, .28)
        let dragging = false; let downAt = { x: 0, y: 0 }; let last = { x: 0, y: 0 }; let burst = 0; let frame = 0
        const clock = new THREE.Clock()
        const resize = () => { const { width, height } = container.getBoundingClientRect(); if (!width || !height) return; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false) }
        const move = (event: PointerEvent) => {
            const rect = container.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1)
            if (dragging) { target.x += (event.clientX - last.x) * .008; target.y += (event.clientY - last.y) * .008; last = { x: event.clientX, y: event.clientY } }
        }
        const start = (event: PointerEvent) => { dragging = true; downAt = last = { x: event.clientX, y: event.clientY }; container.setPointerCapture(event.pointerId) }
        const end = (event: PointerEvent) => { if (Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y) < 8) burst = 1; dragging = false; if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId) }
        resize(); container.addEventListener("pointermove", move); container.addEventListener("pointerdown", start); container.addEventListener("pointerup", end); window.addEventListener("resize", resize, { passive: true })
        const render = () => {
            frame = requestAnimationFrame(render)
            const time = clock.getElapsedTime(); const intro = reducedMotion ? 1 : Math.min(1, time / 1.1); const enter = 1 - Math.pow(1 - intro, 4); burst *= .92
            if (!dragging) { target.x += (pointer.x * .22 - target.x - .48) * .012; target.y += (-pointer.y * .16 - target.y + .28) * .012 }
            group.rotation.y += (target.x - group.rotation.y) * .06; group.rotation.x += (target.y - group.rotation.x) * .06; group.rotation.z = Math.sin(time * .45) * .055
            group.scale.setScalar(1 + burst * .12); rim.intensity = 15 + Math.sin(time * 1.6) * 4 + burst * 20
            cubes.forEach(({ mesh, base, phase, spin }, index) => {
                mesh.position.copy(base).multiplyScalar(enter).add(base.clone().normalize().multiplyScalar(burst * 1.65))
                if (!reducedMotion) mesh.position.y += Math.sin(time * 1.25 + phase) * .075 * enter
                mesh.scale.setScalar(enter * (1 + burst * (index % 3 === 0 ? .18 : .06))); mesh.rotation.set(time * spin * .14, time * spin * .18, 0)
            })
            renderer.render(scene, camera)
        }
        render()
        return () => { cancelAnimationFrame(frame); container.removeEventListener("pointermove", move); container.removeEventListener("pointerdown", start); container.removeEventListener("pointerup", end); window.removeEventListener("resize", resize); geometry.dispose(); yellow.dispose(); dark.dispose(); renderer.dispose(); if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement) }
    }, [])
    return <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing touch-none" role="presentation" aria-label="Cubo modular Gson em 3D: arraste para rodar, clique para animar" />
}
