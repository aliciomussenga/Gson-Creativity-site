import { ArrowRight, MessageSquare, ChevronDown } from "lucide-react"
import HeroCanvas from "../HeroCanvas"
import GsonDrawable from "../GsonDrawable"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

function FocusCard({ title, description, delay }: { title: string; description: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.7 }}
            className="card-glass px-5 py-4 rounded-2xl border border-white/8 hover:border-gson-yellow/30 transition-all group"
            whileHover={{ y: -4, scale: 1.02 }}
        >
            <p className="text-gson-yellow font-black text-sm group-hover:text-glow transition-all">{title}</p>
            <p className="text-gson-sand/50 text-xs mt-1">{description}</p>
        </motion.div>
    )
}

export default function Hero() {
    const prefersReducedMotion = useReducedMotion()
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const sectionRef = useRef<HTMLElement>(null)

    // Smooth spring mouse tracking
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
    const bgX = useTransform(springX, [-1, 1], ["-3%", "3%"])
    const bgY = useTransform(springY, [-1, 1], ["-2%", "2%"])

    const handleMouse = (e: React.MouseEvent) => {
        if (prefersReducedMotion || !sectionRef.current) return
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect()
        mouseX.set(((e.clientX - left) / width - 0.5) * 2)
        mouseY.set(((e.clientY - top) / height - 0.5) * 2)
    }

    const headingVariants = {
        initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
    }

    const focusAreas = [
        { title: "Estratégia", description: "clareza antes de construir" },
        { title: "Produto digital", description: "experiências úteis e acessíveis" },
        { title: "Tecnologia", description: "soluções pensadas para evoluir" },
    ]

    return (
        <motion.section
            ref={sectionRef}
            onMouseMove={handleMouse}
            initial="initial"
            animate="animate"
            className="relative min-h-screen flex items-center px-[7%] pt-28 md:pt-32 overflow-hidden"
        >
                <HeroCanvas />
                {/* Gradient keeps copy readable while leaving the 3D object visible. */}
                <div className="absolute inset-0 bg-gradient-to-r from-gson-black via-gson-black/72 to-gson-black/10 pointer-events-none z-[1]" />
            {/* Parallax background glow */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(242,227,12,0.35),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(255,255,255,0.09),transparent_55%)]" />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.18),rgba(13,13,13,0.44))] pointer-events-none z-[1]" />

            {/* Floating ambient orbs */}
            {!prefersReducedMotion && (
                <>
                    <motion.div
                        animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-gson-yellow/4 blur-3xl pointer-events-none"
                    />
                    <motion.div
                        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-1/3 right-1/3 w-32 h-32 rounded-full bg-white/3 blur-2xl pointer-events-none"
                    />
                </>
            )}

            <div className="relative max-w-6xl w-full z-10">
                {/* Eyebrow */}
                <motion.div
                    variants={headingVariants}
                    transition={{ duration: 0.6, delay: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <span className="w-8 h-px bg-gson-yellow" />
                    <span className="text-gson-yellow text-xs uppercase tracking-[0.4em] font-bold">Gson Creativity · Luanda, Angola</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    variants={headingVariants}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-[100px] font-black text-white leading-[0.9] tracking-tighter mb-8"
                >
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={prefersReducedMotion ? {} : { y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            A LÓGICA É{" "}
                            <span className="text-transparent border-text">VOSSA.</span>
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={prefersReducedMotion ? {} : { y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            A MAGIA É{" "}
                            <span className="text-gson-yellow">NOSSA.</span>
                        </motion.span>
                    </span>
                </motion.h1>

                <motion.p
                    variants={headingVariants}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="text-gson-sand text-xl md:text-2xl max-w-2xl font-light leading-relaxed mb-10"
                >
                    Transformamos ideias complexas em experiências digitais que
                    vendem, inspiram e marcam. Bem-vindo à{" "}
                    <span className="text-white font-medium">Gson Creativity.</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={headingVariants}
                    transition={{ duration: 0.8, delay: 0.55 }}
                    className="flex flex-wrap gap-4 mb-16"
                >
                    <Link
                        to="/servicos"
                        className="bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all flex items-center gap-3 group"
                    >
                        Conhecer serviços
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/contato"
                        className="border border-gson-beige/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-3"
                    >
                        Falar Connosco <MessageSquare size={20} />
                    </Link>
                </motion.div>

                {/* SVG drawable — traces GSON letters on mount */}
                <div className="mt-2 mb-4">
                    <GsonDrawable />
                </div>

                <motion.div
                    variants={headingVariants}
                    transition={{ duration: 0.8, delay: 0.65 }}
                    className="flex flex-wrap gap-3 items-start"
                >
                    {focusAreas.map((area, i) => (
                        <FocusCard key={area.title} title={area.title} description={area.description} delay={0.7 + i * 0.1} />
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            {!prefersReducedMotion && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={20} className="text-gson-sand/30" />
                    </motion.div>
                </motion.div>
            )}

            <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
            <p className="absolute right-[7%] bottom-10 z-10 hidden md:block text-[10px] uppercase tracking-[0.28em] text-gson-sand/50 pointer-events-none">Arraste o objeto · clique para expandir</p>
        </motion.section>
    )
}
