import { BookOpen, Users, Zap, Award } from "lucide-react"
import { motion } from "framer-motion"

const academyFeatures = [
    {
        icon: <BookOpen size={32} className="stroke-current" />,
        title: "Cursos Práticos",
        desc: "De Backend a DevOps. Aprender fazendo com projetos reais.",
    },
    {
        icon: <Users size={32} className="stroke-current" />,
        title: "Mentoria Directa",
        desc: "Aulas ao vivo com especialistas da Gson Creativity.",
    },
    {
        icon: <Zap size={32} className="stroke-current" />,
        title: "Projetos em Produção",
        desc: "Deploy real, experiência de trabalho imediata e portfólio.",
    },
    {
        icon: <Award size={32} className="stroke-current" />,
        title: "Certificações",
        desc: "Reconhecidas pela indústria e pela comunidade tech.",
    },
]

export default function GsonAcademy() {
    return (
        <motion.section
            className="py-32 px-[7%] border-t border-white/5 bg-gradient-to-b from-[#0d0d0d] via-[#0a0a10] to-[#0d0d0d]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gson-yellow uppercase tracking-widest text-sm mb-4"
                    >
                        Novo Produto
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight"
                    >
                        GSON <span className="text-gson-yellow">ACADEMY</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gson-sand/80 text-xl mt-6 max-w-3xl mx-auto"
                    >
                        Plataforma de educação tech focada no mercado africano.
                        Aprender as melhores práticas de Backend, DevOps e
                        Arquitetura de Sistemas.
                    </motion.p>
                </div>

                <div className="text-center mb-10">
                    <p className="text-gson-sand/80 text-sm tracking-widest uppercase">
                        + 450 horas de conteúdo + 80 alunos ativos
                    </p>
                    <p className="text-gson-sand/80 text-sm tracking-widest uppercase">
                        8 turmas em andamento | 4 trilhas de carreira
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {academyFeatures.map((feature, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="card-glass p-6 rounded-2xl border border-white/10 text-center"
                        >
                            <div className="text-gson-yellow mb-4 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gson-sand/70 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/contato"
                        className="inline-block bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all"
                    >
                        Inscrever-se na Academy
                    </a>
                </motion.div>
            </div>
        </motion.section>
    )
}
