import { motion } from "framer-motion"
import { Code2, Lightbulb, Rocket } from "lucide-react"

export default function FounderStory() {
    const journey = [
        {
            icon: <Code2 size={32} className="stroke-current" />,
            title: "Backend Engineer",
            desc: "Foco em construir infraestruturas robustas para sistemas com necessidades reais.",
        },
        {
            icon: <Lightbulb size={32} className="stroke-current" />,
            title: "Pensador Estratégico",
            desc: "Transformando problemas em soluções elegantes usando as melhores práticas de engenharia.",
        },
        {
            icon: <Rocket size={32} className="stroke-current" />,
            title: "Empreendedor",
            desc: "Criando produtos que resolvem desafios reais para empresas africanas em crescimento.",
        },
    ]

    return (
        <motion.section
            className="py-24 px-[7%] border-t border-gson-black/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gson-black leading-tight mb-6">
                            Por detrás de
                            <br />
                            <span className="text-gson-yellow">
                                Gson Creativity.
                            </span>
                        </h2>
                        <p className="text-gson-black/70 text-lg leading-relaxed mb-6">
                            Gelson do Souto é um desenvolvedor backend interessado
                            em construir sistemas robustos, escaláveis e seguros.
                            A agência nasceu da vontade de resolver problemas de
                            produto e arquitectura com empresas africanas.
                        </p>
                        <p className="text-gson-black/70 text-lg leading-relaxed">
                            A visão foi clara: criar uma agência que combine
                            excelência técnica com criatividade estratégica.
                            Gson Creativity nasceu dessa paixão por transformar
                            ideias complexas em produtos digitais de classe
                            mundial.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-white p-8 rounded-3xl border border-gson-yellow/50 shadow-lg">
                            <blockquote className="text-gson-black text-xl italic leading-relaxed">
                                "A diferença entre um bom produto e um excelente
                                produto está na atenção aos detalhes, na
                                performance, e na segurança dos dados."
                            </blockquote>
                            <p className="text-gson-yellow font-bold mt-6">
                                — Gelson do Souto
                            </p>
                            <p className="text-gson-black/55 text-sm mt-2">
                                Founder & Lead Backend Architect
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {journey.map((item, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-white p-8 rounded-2xl border border-gson-black/10"
                        >
                            <div className="text-gson-yellow mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-gson-black font-bold text-xl mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gson-black/65 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 bg-gson-black p-10 rounded-2xl"
                >
                    <h3 className="text-white text-2xl font-bold mb-6">
                        Missão
                    </h3>
                    <p className="text-gson-sand/80 text-lg leading-relaxed">
                        Ser a agência de referência para empresas africanas que
                        buscam digitalizar-se com{" "}
                        <span className="text-white font-bold">
                            excelência técnica e criatividade estratégica.
                        </span>{" "}
                        Criamos não apenas soluções, mas parcerias de longo
                        termo que impulsionam crescimento real e mensurável.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    )
}
