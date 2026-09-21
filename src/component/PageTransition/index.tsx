import { motion } from "framer-motion"
import { ReactNode } from "react"

// Full-screen yellow wipe that reveals the new page
const wipe = {
    initial: { scaleX: 0, originX: 0 },
    animate: { scaleX: 0, originX: 1 },
    exit:    { scaleX: 1, originX: 0 },
}

const content = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 } },
    exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
}

export default function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            variants={content}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
        >
            {/* Yellow curtain wipe overlay */}
            <motion.div
                className="fixed inset-0 z-[9990] bg-gson-yellow pointer-events-none origin-left"
                variants={wipe}
                initial="exit"
                animate={{ scaleX: 0, originX: 1, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
                exit={{ scaleX: 1, originX: 0, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
            />
            {children}
        </motion.div>
    )
}
