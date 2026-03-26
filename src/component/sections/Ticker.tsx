import { motion, useReducedMotion } from "framer-motion"

export default function Ticker() {
    const prefersReducedMotion = useReducedMotion()
    const items = [
        "+50 Projetos Entregues",
        "Design de Alta Performance",
        "Estratégias Digitais",
        "Inovação Visual",
    ]

    return (
        <motion.div
            initial={
                prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: "easeOut",
            }}
            className="bg-gson-yellow py-6 overflow-hidden whitespace-nowrap border-y border-gson-black relative"
        >
            <div className="absolute inset-x-0 top-0 h-1 bg-gson-black/20" />
            <div className="flex animate-marquee">
                {[...items, ...items].map((text, i) => (
                    <span
                        key={i}
                        className="text-gson-black font-black uppercase tracking-tighter text-2xl mx-12 flex items-center"
                    >
                        • {text}
                    </span>
                ))}
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
        </motion.div>
    )
}
