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
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    )
}
