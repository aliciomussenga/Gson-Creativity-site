import { Lightbulb, Shield, Eye } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

const pilarData = [
    {
        icon: <Lightbulb size={32} className="stroke-current" />,
        title: "Inovação estratégica",
        desc: "Prototipamos soluções que ganham status de benchmark na indústria.",
    },
    {
        icon: <Shield size={32} className="stroke-current" />,
        title: "Arquitetura resiliente",
        desc: "Escalabilidade alinhada à segurança e performance para 100k+ usuários.",
    },
    {
        icon: <Eye size={32} className="stroke-current" />,
        title: "Visibilidade total",
        desc: "Relatórios mensais, métricas reais e dashboards que orientam decisões.",
    },
]

export default function Pilares() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <motion.section
            className="py-24 px-[7%] border-t border-white/5"
            initial={
                prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        >
            <div className="max-w-6xl mx-auto text-center mb-12">
                <p className="text-gson-yellow uppercase tracking-widest text-sm mb-3">
                    Nossos pilares
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Confiança construída por três fundamentos.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pilarData.map((pilar, index) => (
                    <motion.article
                        key={index}
                        whileHover={{ y: -8, scale: 1.01 }}
                        transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 18,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="card-glass p-8 rounded-2xl border border-white/10"
                    >
                        <div className="text-gson-yellow mb-4">
                            {pilar.icon}
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3">
                            {pilar.title}
                        </h3>
                        <p className="text-gson-sand/70 leading-relaxed">
                            {pilar.desc}
                        </p>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    )
}
