import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function PageTransition({ children }: Props) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.div
            initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14, scale: 0.992 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -14, scale: 0.992 }}
            transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    )
}
