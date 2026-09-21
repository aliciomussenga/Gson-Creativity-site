import { useEffect, useRef } from "react"

export default function GsonDrawable() {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        let cleanup: (() => void) | null = null

        ;(async () => {
            const { animate, stagger } = await import("animejs")
            const { createDrawable } = await import("animejs/svg")

            const paths = svg.querySelectorAll("path, polyline, line, rect")
            const drawables = Array.from(paths).map(el =>
                createDrawable(el as SVGPathElement)
            )

            // All drawables start invisible
            drawables.forEach(([d]) => { d.draw = "0 0" })

            // Draw in with stagger — each stroke traces from 0% to 100%
            const anim = animate(drawables.map(([d]) => d), {
                draw: ["0 0", "0 1"],
                duration: 1200,
                delay: stagger(120),
                ease: "outCubic",
            })

            cleanup = () => anim.cancel()
        })()

        return () => { cleanup?.() }
    }, [])

    // SVG "GSON" as stroked paths — geometric, matches brand
    return (
        <svg
            ref={svgRef}
            viewBox="0 0 420 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-xs md:max-w-sm opacity-20 select-none"
            aria-hidden="true"
            style={{ overflow: "visible" }}
        >
            <g fill="none" stroke="#F2E30C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {/* G */}
                <path d="M 68 15 A 32 32 0 1 0 68 65 L 68 42 L 52 42" />
                {/* S */}
                <path d="M 130 18 C 107 12 96 28 110 40 C 124 52 140 55 130 68" />
                {/* O */}
                <ellipse cx="185" cy="40" rx="26" ry="28" />
                {/* N */}
                <polyline points="230,68 230,12 270,68 270,12" />
            </g>
        </svg>
    )
}
