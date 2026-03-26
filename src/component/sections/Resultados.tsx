import { motion, useReducedMotion } from "framer-motion"

const metrics = [
    {
        label: "Conversão média",
        value: "+78%",
        details:
            "Média dos projetos entregues que trouxeram aumento real de vendas.",
    },
    {
        label: "Retorno sobre investimento",
        value: "4.8x",
        details: "ROI em campanhas e e-commerce para clientes B2B e B2C.",
    },
    {
        label: "SLA de entrega",
        value: "99%",
        details: "Termos de prazo cumpridos com garantia e revisões rápidas.",
    },
    {
        label: "Retenção de clientes",
        value: "92%",
        details:
            "Clientes que renovam contratos e ampliam escopo a cada ciclo.",
    },
]

export default function Resultados() {
    const prefersReducedMotion = useReducedMotion()

    return (
        <section className="py-24 px-[7%] bg-gradient-to-r from-black via-[#0e0e13] to-black border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={
                        prefersReducedMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="text-4xl md:text-6xl font-black text-white mb-12"
                >
                    Nossos números traduzem confiança.
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {metrics.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0.7, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card-glass p-6 rounded-2xl border border-white/10 hover:border-gson-yellow/60 hover:shadow-[0_20px_45px_rgba(242,227,12,0.25)] transition-all"
                        >
                            <div className="text-gson-yellow text-5xl font-black">
                                {item.value}
                            </div>
                            <h3 className="text-white text-xl font-bold mt-3 mb-2">
                                {item.label}
                            </h3>
                            <p className="text-gson-sand/70 leading-relaxed text-sm">
                                {item.details}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
