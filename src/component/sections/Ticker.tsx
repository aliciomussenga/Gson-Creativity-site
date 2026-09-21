import { motion, useReducedMotion } from "framer-motion"

const itemsTop = [
    "🇦🇴 Feito em Angola",
    "💬 Conversas antes de código",
    "💻 Web · Mobile · Sistemas",
    "🧩 Estratégia + Design + Tecnologia",
    "🔒 Segurança desde o início",
    "🤝 Construção em parceria",
]

const itemsBottom = [
    "🎯 Design com propósito",
    "⚙️ Processos claros",
    "🧠 Decisões orientadas ao problema",
    "✅ Qualidade em cada etapa",
    "☕ Café angolano + código limpo",
    "🔥 Tecnologia para criar impacto",
]

export default function Ticker() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
            className="overflow-hidden border-y border-gson-black"
        >
            {/* Top row — left to right */}
            <div className="bg-gson-yellow py-4 overflow-hidden whitespace-nowrap relative">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gson-yellow to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gson-yellow to-transparent z-10" />
                <div className="flex animate-ticker-ltr">
                    {[...itemsTop, ...itemsTop, ...itemsTop].map((text, i) => (
                        <span key={i} className="text-gson-black font-black uppercase tracking-tighter text-xl mx-10 flex-shrink-0">
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom row — right to left */}
            <div className="bg-gson-black border-t border-gson-yellow/20 py-3 overflow-hidden whitespace-nowrap relative">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gson-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gson-black to-transparent z-10" />
                <div className="flex animate-ticker-rtl">
                    {[...itemsBottom, ...itemsBottom, ...itemsBottom].map((text, i) => (
                        <span key={i} className="text-gson-sand/40 font-bold uppercase tracking-widest text-xs mx-8 flex-shrink-0">
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes ticker-ltr {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                @keyframes ticker-rtl {
                    0% { transform: translateX(-33.333%); }
                    100% { transform: translateX(0); }
                }
                .animate-ticker-ltr {
                    animation: ticker-ltr 25s linear infinite;
                }
                .animate-ticker-rtl {
                    animation: ticker-rtl 30s linear infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-ticker-ltr, .animate-ticker-rtl { animation: none; }
                }
            `}</style>
        </motion.div>
    )
}
