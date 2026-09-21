import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const [hovering, setHovering] = useState(false)
    const [clicking, setClicking] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [label, setLabel] = useState("")

    // Smooth follower dot
    const springX = useSpring(cursorX, { stiffness: 300, damping: 28 })
    const springY = useSpring(cursorY, { stiffness: 300, damping: 28 })

    // Slower trailing ring
    const trailX = useSpring(cursorX, { stiffness: 80, damping: 22 })
    const trailY = useSpring(cursorY, { stiffness: 80, damping: 22 })

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const onEnter = () => setHidden(false)
        const onLeave = () => setHidden(true)
        const onDown = () => setClicking(true)
        const onUp = () => setClicking(false)

        // Detect interactive elements
        const onHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactive = target.closest("a, button, [data-cursor]")
            if (interactive) {
                setHovering(true)
                setLabel(interactive.getAttribute("data-cursor-label") || "")
            }
        }
        const onHoverEnd = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactive = target.closest("a, button, [data-cursor]")
            if (interactive) {
                setHovering(false)
                setLabel("")
            }
        }

        window.addEventListener("mousemove", onMove)
        document.addEventListener("mouseenter", onEnter)
        document.addEventListener("mouseleave", onLeave)
        document.addEventListener("mousedown", onDown)
        document.addEventListener("mouseup", onUp)
        document.addEventListener("mouseover", onHoverStart)
        document.addEventListener("mouseout", onHoverEnd)

        return () => {
            window.removeEventListener("mousemove", onMove)
            document.removeEventListener("mouseenter", onEnter)
            document.removeEventListener("mouseleave", onLeave)
            document.removeEventListener("mousedown", onDown)
            document.removeEventListener("mouseup", onUp)
            document.removeEventListener("mouseover", onHoverStart)
            document.removeEventListener("mouseout", onHoverEnd)
        }
    }, [cursorX, cursorY])

    // Hide on touch devices
    const [isTouch, setIsTouch] = useState(false)
    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches)
    }, [])
    if (isTouch) return null

    return (
        <>
            {/* Hide default cursor globally */}
            <style>{`* { cursor: none !important; }`}</style>

            {/* Inner dot — snappy */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: hidden ? 0 : 1,
                    scale: clicking ? 0.5 : 1,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="rounded-full bg-gson-yellow transition-all duration-150"
                    style={{
                        width: hovering ? 10 : 8,
                        height: hovering ? 10 : 8,
                    }}
                />
            </motion.div>

            {/* Outer ring — slow follower */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: hidden ? 0 : hovering ? 1 : 0.5,
                    scale: clicking ? 0.8 : hovering ? 1 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="rounded-full border border-gson-yellow/70 flex items-center justify-center"
                    animate={{
                        width: hovering ? 48 : 32,
                        height: hovering ? 48 : 32,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {label && (
                        <span className="text-gson-yellow text-[8px] font-black uppercase tracking-widest whitespace-nowrap">
                            {label}
                        </span>
                    )}
                </motion.div>
            </motion.div>
        </>
    )
}
