import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const steps = [
    {
        num: "01", title: "Imersão",
        desc: "Antes de qualquer wireframe, procuramos compreender o teu negócio. Olhamos para o problema real — não apenas para o pedido superficial.",
        detail: "Entrevistas · benchmarks · análise de concorrência",
    },
    {
        num: "02", title: "Estratégia",
        desc: "Arquitectura da solução, stack tecnológico, KPIs de sucesso. Só avançamos quando todos alinham na mesma visão.",
        detail: "Roadmap · wireframes · definição de métricas",
    },
    {
        num: "03", title: "Execução",
        desc: "Código cuidado, design com propósito e uma rotina de acompanhamento. Partilhamos progresso e ajustamos com base no feedback.",
        detail: "Sprints 2 semanas · demos semanais · feedback contínuo",
    },
    {
        num: "04", title: "Crescimento",
        desc: "O lançamento é o início. Observamos o que funciona, aprendemos com o uso e definimos os próximos passos em conjunto.",
        detail: "Analytics · A/B testing · suporte pós-lançamento",
    },
]

// SVG connecting line that draws itself as the user scrolls into view
function ScrollLine() {
    const svgRef = useRef<SVGSVGElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const svg = svgRef.current
        const section = sectionRef.current
        if (!svg || !section) return

        let cleanupFn: (() => void) | null = null

        ;(async () => {
            const { animate, onScroll } = await import("animejs")
            const { createDrawable } = await import("animejs/svg")

            const line = svg.querySelector("path")!
            const [drawable] = createDrawable(line)
            drawable.draw = "0 0"

            // Sync draw progress with scroll position
            const anim = animate(drawable, {
                draw: ["0 0", "0 1"],
                duration: 1000,
                ease: "linear",
                autoplay: onScroll({
                    container: "body",
                    enter: "bottom-=100 top",
                    leave: "top+=200 bottom",
                    sync: true,
                }),
            })

            cleanupFn = () => anim.cancel()
        })()

        return () => { cleanupFn?.() }
    }, [])

    return (
        <div ref={sectionRef} className="hidden lg:block absolute top-[2.2rem] left-0 right-0 pointer-events-none overflow-visible">
            <svg
                ref={svgRef}
                viewBox="0 0 1000 4"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: 4, overflow: "visible" }}
            >
                <path
                    d="M 0 2 Q 250 2 500 2 Q 750 2 1000 2"
                    fill="none"
                    stroke="#F2E30C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                />
            </svg>
        </div>
    )
}

export default function Metodo() {
    return (
        <section className="py-28 px-[7%] bg-white border-t border-gson-black/10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <p className="text-gson-yellow text-[11px] uppercase tracking-widest mb-3">O nosso método</p>
                    <h2 className="text-4xl md:text-5xl font-black text-gson-black leading-tight max-w-2xl">
                        Não é apenas design.{" "}
                        <span className="text-gson-yellow italic">É ciência criativa.</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Static line fallback */}
                    <div className="hidden lg:block absolute top-[2.2rem] left-0 right-0 h-px bg-gson-black/10" />
                    {/* Animated SVG line drawn on scroll */}
                    <ScrollLine />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.55 }}
                                className="group relative"
                            >
                                {/* Animated node on scroll enter */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 + 0.1, type: "spring", stiffness: 280, damping: 20 }}
                                    className="w-11 h-11 rounded-full border border-gson-black/15 bg-white flex items-center justify-center mb-6 group-hover:border-gson-yellow/60 group-hover:bg-gson-yellow/10 transition-all relative z-10"
                                >
                                    <span className="text-gson-yellow font-black text-sm">{step.num}</span>
                                </motion.div>

                                <h3 className="text-gson-black font-black text-xl mb-3">{step.title}</h3>
                                <p className="text-gson-black/60 text-sm leading-relaxed mb-4">{step.desc}</p>
                                <p className="text-gson-gold text-[10px] uppercase tracking-widest border-t border-gson-black/10 pt-3">
                                    {step.detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
