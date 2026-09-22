import { useEffect, useRef } from "react"
import * as THREE from "three"

type BrandObject = "monogram" | "wordmark" | "signatureGrid"
const interaction = { x: 0, y: 0, pulseAt: 0, listening: false }

function startSharedInteraction() {
    if (interaction.listening) return
    interaction.listening = true
    window.addEventListener("pointermove", (event) => {
        interaction.x = event.clientX / window.innerWidth - .5
        interaction.y = event.clientY / window.innerHeight - .5
    }, { passive: true })
}

function tube(points: THREE.Vector3[], material: THREE.Material, radius = .075) {
    return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 48, radius, 10, false), material)
}

/**
 * Reusable 3D brand asset. Every form is derived from the Gson mark,
 * its GSON lettering, or the modular cube language used in the hero.
 */
export default function SyncedObject3D({ object = "monogram", className = "", light = false }: { object?: BrandObject; className?: string; light?: boolean }) {
    const hostRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const host = hostRef.current
        if (!host) return
        startSharedInteraction()
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        host.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(38, 1, .1, 30)
        camera.position.z = object === "wordmark" ? 9 : 7
        scene.add(new THREE.HemisphereLight(0xffffff, light ? 0xf2e30c : 0x050505, 2.5))
        const glow = new THREE.PointLight(0xf2e30c, 18, 15)
        glow.position.set(2, 3, 4)
        scene.add(glow)
        const group = new THREE.Group()
        scene.add(group)
        const gold = new THREE.MeshStandardMaterial({ color: 0xf2e30c, roughness: .25, metalness: .35, emissive: 0xf2e30c, emissiveIntensity: .08 })
        const contrast = new THREE.MeshStandardMaterial({ color: light ? 0x171713 : 0xffffff, roughness: .24, metalness: .6, transparent: !light, opacity: light ? 1 : .9 })
        const meshes: THREE.Mesh[] = []
        const add = (mesh: THREE.Mesh) => { group.add(mesh); meshes.push(mesh) }

        if (object === "signatureGrid") {
            // Same cube module that introduces the Gson hero — not a random 3D asset.
            for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(.38, .38, .38), (x + y + z) % 2 ? contrast : gold)
                mesh.position.set(x * .55, y * .55, z * .55); add(mesh)
            }
        } else {
            // 3D interpretation of the gold CG/Gson logo: the open G and its forward arrow.
            const arc = Array.from({ length: 18 }, (_, i) => {
                const angle = .7 + (Math.PI * 2 - 1.35) * (i / 17)
                return new THREE.Vector3(Math.cos(angle) * 1.15, Math.sin(angle) * 1.15, 0)
            })
            add(tube(arc, gold, .105))
            add(tube([new THREE.Vector3(-.22, -.93, .08), new THREE.Vector3(.85, .16, .08), new THREE.Vector3(.43, .16, .08)], gold, .105))
            add(tube([new THREE.Vector3(.85, .16, .08), new THREE.Vector3(.85, -.48, .08), new THREE.Vector3(.3, -.98, .08), new THREE.Vector3(-.22, -.93, .08)], contrast, .075))
            if (object === "wordmark") {
                // The mark is accompanied by the four-letter name used in the hero's drawn wordmark.
                const letterY = -1.72
                add(tube([new THREE.Vector3(-2.45, letterY + .34, 0), new THREE.Vector3(-2.72, letterY, 0), new THREE.Vector3(-2.45, letterY - .34, 0), new THREE.Vector3(-2.1, letterY - .12, 0)], gold, .035))
                add(tube([new THREE.Vector3(-1.65, letterY + .26, 0), new THREE.Vector3(-1.25, letterY + .12, 0), new THREE.Vector3(-1.62, letterY - .08, 0), new THREE.Vector3(-1.22, letterY - .3, 0)], gold, .035))
                const circle = Array.from({ length: 17 }, (_, i) => { const a = i / 16 * Math.PI * 2; return new THREE.Vector3(-.65 + Math.cos(a) * .3, letterY + Math.sin(a) * .34, 0) })
                add(tube(circle, gold, .035))
                add(tube([new THREE.Vector3(-.12, letterY - .34, 0), new THREE.Vector3(-.12, letterY + .34, 0), new THREE.Vector3(.34, letterY - .34, 0), new THREE.Vector3(.34, letterY + .34, 0)], gold, .035))
            }
        }

        let visible = true
        let frame = 0
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
        observer.observe(host)
        const resize = () => {
            const { width, height } = host.getBoundingClientRect()
            if (!width || !height) return
            camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false)
        }
        const pulse = () => { interaction.pulseAt = performance.now() }
        host.addEventListener("click", pulse); window.addEventListener("resize", resize, { passive: true }); resize()

        const render = () => {
            frame = requestAnimationFrame(render)
            if (!visible) return
            const time = performance.now() / 1000
            const beat = Math.sin(time * 1.35) * .5 + .5
            const impulse = reduceMotion ? 0 : Math.max(0, 1 - (performance.now() - interaction.pulseAt) / 850)
            group.rotation.y = time * .3 + interaction.x * .55
            group.rotation.x = Math.sin(time * .6) * .12 - interaction.y * .32
            group.scale.setScalar(1 + beat * .035 + impulse * .13)
            glow.intensity = 11 + beat * 8 + impulse * 18
            meshes.forEach((mesh, index) => { if (object === "signatureGrid" && !reduceMotion) mesh.rotation.y = Math.sin(time * 1.25 + index) * .12 })
            renderer.render(scene, camera)
        }
        render()
        return () => {
            cancelAnimationFrame(frame); observer.disconnect(); host.removeEventListener("click", pulse); window.removeEventListener("resize", resize)
            meshes.forEach(mesh => mesh.geometry.dispose()); gold.dispose(); contrast.dispose(); renderer.dispose()
            if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement)
        }
    }, [light, object])

    return <div ref={hostRef} className={`absolute pointer-events-auto cursor-pointer ${className}`} aria-hidden="true" />
}
