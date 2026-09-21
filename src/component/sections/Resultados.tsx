import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const metrics = [
    { label: "Conversão média",            target: 78,  prefix: "+", suffix: "%", details: "Aumento real de vendas nos projectos entregues." },
    { label: "Retorno sobre investimento", target: 4.8, prefix: "",  suffix: "x", details: "ROI médio em campanhas e e-commerce B2B e B2C." },
    { label: "SLA de entrega",             target: 99,  prefix: "",  suffix: "%", details: "Prazos cumpridos com revisões rápidas garantidas." },
    { label: "Retenção de clientes",       target: 92,  prefix: "",  suffix: "%", details: "Clientes que renovam e ampliam o seu projecto." },
]

// Scroll-synced bar that fills as user scrolls into the section
function ScrollBar({ pct }: { pct: number }) {
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = barRef.current
        if (!el) return
        let cleanupFn: (() => void) | null = null
        ;(async () => {
            const { animate, onScroll } = await import("animejs")
            const anim = animate(el, {
                scaleX: { from: 0, to: pct / 100 },
                duration: 1200,
                ease: "outExpo",
                autoplay: onScroll({
                    enter: "bottom-=80 top",
                    leave: "top+=120 bottom",
                    sync: 0.5,
                }),
            })
            cleanupFn = () => anim.cancel()
        })()
        return () => { cleanupFn?.() }
    }, [pct])

    return (
        <div className="mt-3 h-px bg-white/8 overflow-hidden rounded-full">
            <div
                ref={barRef}
                className="h-full bg-gson-yellow rounded-full origin-left"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    )
}

function MetricCard({ m, i }: { m: typeof metrics[0]; i: number }) {
    const numRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = numRef.current
        if (!el) return
        let cleanupFn: (() => void) | null = null
        ;(async () => {
            const { animate, onScroll, utils } = await import("animejs")
            const isDecimal = m.target % 1 !== 0
            const proxy = { val: 0 }

            const anim = animate(proxy, {
                val: m.target,
                duration: 1600,
                ease: "outExpo",
                autoplay: onScroll({
                    enter: "bottom-=60 top",
                    leave: "top+=100 bottom",
                    sync: 0.4,
                }),
                onUpdate: () => {
                    if (el) el.textContent =
                        `${m.prefix}${isDecimal ? proxy.val.toFixed(1) : Math.floor(proxy.val)}${m.suffix}`
                },
            })
            cleanupFn = () => anim.cancel()
        })()
        return () => { cleanupFn?.() }
    }, [m])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-gson-black p-8 flex flex-col gap-2 group hover:bg-white/[0.025] transition-colors"
        >
            <span
                ref={numRef}
                className="text-gson-yellow font-black text-5xl md:text-6xl leading-none tabular-nums"
            >
                {m.prefix}0{m.suffix}
            </span>
            <p className="text-white font-bold text-sm mt-1">{m.label}</p>
            <p className="text-gson-sand/40 text-xs leading-relaxed">{m.details}</p>
            <ScrollBar pct={m.target > 10 ? m.target : m.target * 10} />
        </motion.div>
    )
}

export default function Resultados() {
    return (
        <section className="py-28 px-[7%] border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-gson-yellow text-[11px] uppercase tracking-widest mb-3">Resultados reais</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-xl">
                        Números que falam por si.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
                    {metrics.map((m, i) => <MetricCard key={i} m={m} i={i} />)}
                </div>
            </div>
        </section>
    )
}
