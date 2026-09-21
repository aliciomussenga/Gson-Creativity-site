import { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    alpha: number
    size: number
    vx: number
    vy: number
}

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particles = useRef<Particle[]>([])
    const mouse = useRef({ x: -999, y: -999 })
    const raf = useRef<number>(0)
    const lastPos = useRef({ x: -999, y: -999 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY }
            const dx = e.clientX - lastPos.current.x
            const dy = e.clientY - lastPos.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist > 6) {
                for (let i = 0; i < 3; i++) {
                    particles.current.push({
                        x: e.clientX + (Math.random() - 0.5) * 8,
                        y: e.clientY + (Math.random() - 0.5) * 8,
                        alpha: 0.7 + Math.random() * 0.3,
                        size: 2 + Math.random() * 3,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: (Math.random() - 0.5) * 0.8 - 0.3,
                    })
                }
                lastPos.current = { x: e.clientX, y: e.clientY }
                if (particles.current.length > 120) particles.current.splice(0, 20)
            }
        }
        window.addEventListener("mousemove", onMove)

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.current = particles.current.filter(p => p.alpha > 0.02)
            for (const p of particles.current) {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(242, 227, 12, ${p.alpha})`
                ctx.fill()
                p.alpha *= 0.88
                p.size *= 0.94
                p.x += p.vx
                p.y += p.vy
            }
            raf.current = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", onMove)
            cancelAnimationFrame(raf.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ mixBlendMode: "screen" }}
        />
    )
}
