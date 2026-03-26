import { motion, useReducedMotion } from "framer-motion"

export default function Metodo() {
    const prefersReducedMotion = useReducedMotion()
    const cards = [
        {
            title: "Imersão",
            desc: "Entendemos o seu negócio a fundo antes de criar.",
        },
        {
            title: "Estratégia",
            desc: "Planejamos cada pixel para converter visitantes em clientes.",
        },
        {
            title: "Execução",
            desc: "Desenvolvimento robusto com as tecnologias mais modernas.",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.14,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="py-32 px-[7%]"
        >
            <motion.h2
                variants={itemVariants}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-6xl font-bold text-white mb-20"
            >
                Não é apenas Design.
                <br />
                <span className="text-gson-gold italic">
                    É Ciência Criativa.
                </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        transition={{
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="card-glass p-10 rounded-2xl hover:border-gson-yellow/50 transition-all duration-300 group"
                        whileHover={{
                            y: -5,
                            boxShadow: "0 20px 45px rgba(242, 227, 12, 0.18)",
                        }}
                    >
                        <span className="text-gson-yellow text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
                            0{i + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-4 mb-4 text-glow">
                            {card.title}
                        </h3>
                        <p className="text-gson-sand/70 leading-relaxed">
                            {card.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}
