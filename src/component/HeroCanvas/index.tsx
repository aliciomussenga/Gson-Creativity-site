import { useEffect, useRef } from "react"
import * as THREE from "three"

const GSON_YELLOW = 0xF2E30C
const GSON_DARK = 0x0d0d14

type Cube = { mesh: THREE.Mesh; base: THREE.Vector3; phase: number; spin: number }

/** A small, interactive 3D signature for the home hero. */
export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        container.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
        camera.position.set(0, 0.2, 12)
        scene.add(new THREE.HemisphereLight(0xffffff, GSON_DARK, 2.6))
        const key = new THREE.DirectionalLight(GSON_YELLOW, 5)
        key.position.set(4, 6, 6)
        scene.add(key)
        const rim = new THREE.PointLight(GSON_YELLOW, 24, 22, 2)
        rim.position.set(-3, -2, 5)
        scene.add(rim)

        const group = new THREE.Group()
        group.position.x = 2.7
        group.rotation.set(0.28, -0.48, 0.08)
        scene.add(group)

        const geometry = new THREE.BoxGeometry(0.47, 0.47, 0.47)
        const yellow = new THREE.MeshStandardMaterial({ color: GSON_YELLOW, roughness: 0.25, metalness: 0.18, emissive: GSON_YELLOW, emissiveIntensity: 0.06 })
        const dark = new THREE.MeshStandardMaterial({ color: GSON_DARK, roughness: 0.2, metalness: 0.62 })
        const cubes: Cube[] = []
        const grid = 4
        const step = 0.7

        for (let x = 0; x < grid; x++) for (let y = 0; y < grid; y++) for (let z = 0; z < grid; z++) {
            const mesh = new THREE.Mesh(geometry, (x + y + z) % 2 ? dark : yellow)
            const base = new THREE.Vector3((x - 1.5) * step, (y - 1.5) * step, (z - 1.5) * step)
            mesh.position.copy(base).multiplyScalar(reducedMotion ? 1 : 0.03)
            mesh.scale.setScalar(reducedMotion ? 1 : 0.03)
            group.add(mesh)
            cubes.push({ mesh, base, phase: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.7 })
        }

        const pointer = new THREE.Vector2()
        const rotationTarget = new THREE.Vector2(-0.48, 0.28)
        let dragging = false
        let downAt = { x: 0, y: 0 }
        let lastPointer = { x: 0, y: 0 }
        let burst = 0
        let frame = 0
        const clock = new THREE.Clock()
        const resize = () => {
            const { width, height } = container.getBoundingClientRect()
            if (!width || !height) return
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height, false)
        }
        const updatePointer = (event: PointerEvent) => {
            const rect = container.getBoundingClientRect()
            pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
            pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        }
        const onMove = (event: PointerEvent) => {
            updatePointer(event)
            if (dragging) {
                rotationTarget.x += (event.clientX - lastPointer.x) * 0.008
                rotationTarget.y += (event.clientY - lastPointer.y) * 0.008
                lastPointer = { x: event.clientX, y: event.clientY }
            }
        }
        const onDown = (event: PointerEvent) => {
            dragging = true
            downAt = lastPointer = { x: event.clientX, y: event.clientY }
            container.setPointerCapture(event.pointerId)
        }
        const onUp = (event: PointerEvent) => {
            if (Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y) < 8) burst = 1
            dragging = false
            if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId)
        }
        resize()
        container.addEventListener("pointermove", onMove)
        container.addEventListener("pointerdown", onDown)
        container.addEventListener("pointerup", onUp)
        window.addEventListener("resize", resize, { passive: true })

        const render = () => {
            frame = requestAnimationFrame(render)
            const time = clock.getElapsedTime()
            const intro = reducedMotion ? 1 : Math.min(1, time / 1.1)
            const easedIntro = 1 - Math.pow(1 - intro, 4)
            burst *= 0.92
            if (!dragging) {
                rotationTarget.x += (pointer.x * 0.22 - rotationTarget.x - 0.48) * 0.012
                rotationTarget.y += (-pointer.y * 0.16 - rotationTarget.y + 0.28) * 0.012
            }
            group.rotation.y += (rotationTarget.x - group.rotation.y) * 0.06
            group.rotation.x += (rotationTarget.y - group.rotation.x) * 0.06
            group.rotation.z = Math.sin(time * 0.45) * 0.055
            group.scale.setScalar(1 + burst * 0.12)
            rim.intensity = 15 + Math.sin(time * 1.6) * 4 + burst * 20
            cubes.forEach(({ mesh, base, phase, spin }, index) => {
                const direction = base.clone().normalize().multiplyScalar(burst * 1.65)
                mesh.position.copy(base).multiplyScalar(easedIntro).add(direction)
                if (!reducedMotion) mesh.position.y += Math.sin(time * 1.25 + phase) * 0.075 * easedIntro
                const scale = easedIntro * (1 + burst * (index % 3 === 0 ? 0.18 : 0.06))
                mesh.scale.setScalar(scale)
                mesh.rotation.set(time * spin * 0.14, time * spin * 0.18, 0)
            })
            renderer.render(scene, camera)
        }
        render()

        return () => {
            cancelAnimationFrame(frame)
            container.removeEventListener("pointermove", onMove)
            container.removeEventListener("pointerdown", onDown)
            container.removeEventListener("pointerup", onUp)
            window.removeEventListener("resize", resize)
            geometry.dispose(); yellow.dispose(); dark.dispose(); renderer.dispose()
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        }
    }, [])

    return <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing touch-none" aria-label="Objeto 3D interativo: arraste para rodar, clique para animar" role="presentation" />
}
