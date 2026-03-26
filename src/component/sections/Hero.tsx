import { ArrowRight, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"

export default function Hero() {
    const prefersReducedMotion = useReducedMotion()
    const headingVariants = {
        initial: prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0 },
    }

    return (
        <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen flex items-center px-[7%] pt-28 md:pt-32 overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(242,227,12,0.35),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(255,255,255,0.09),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.85),rgba(13,13,13,0.82))]" />

            <div className="relative max-w-6xl">
                <motion.h1
                    variants={headingVariants}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-[100px] font-black text-white leading-[0.9] tracking-tighter mb-8"
                >
                    <span className="block">
                        A LÓGICA É{" "}
                        <span className="text-transparent border-text">
                            VOSSA.
                        </span>
                    </span>
                    <span className="block">
                        A MAGIA É{" "}
                        <span className="text-gson-yellow">NOSSA.</span>
                    </span>
                </motion.h1>

                <motion.p
                    variants={headingVariants}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-gson-sand text-xl md:text-2xl max-w-2xl font-light leading-relaxed mb-12"
                >
                    Transformamos ideias complexas em experiências digitais que
                    vendem, inspiram e marcam. Bem-vindo à{" "}
                    <span className="text-white font-medium">
                        Gson Creativity.
                    </span>
                </motion.p>

                <motion.div
                    variants={headingVariants}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className="flex flex-wrap gap-6"
                >
                    <Link
                        to="/servicos"
                        className="bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all flex items-center gap-3"
                    >
                        Ver Nossos Projetos <ArrowRight size={20} />
                    </Link>
                    <Link
                        to="/contato"
                        className="border border-gson-beige/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-3"
                    >
                        Falar com Especialista <MessageSquare size={20} />
                    </Link>
                </motion.div>
            </div>

            <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
        </motion.section>
    )
}
