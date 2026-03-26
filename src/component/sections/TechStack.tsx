import { motion } from "framer-motion"

const techCategories = [
    {
        category: "Backend",
        techs: [
            "Python (Django, Flask)",
            "Node.js (Express)",
            "Java (Spring Boot)",
            "Go",
            "PHP (Laravel)",
        ],
    },
    {
        category: "Databases",
        techs: ["PostgreSQL", "Firebase", "MongoDB", "MySQL", "Redis"],
    },
    {
        category: "Cloud & DevOps",
        techs: ["Docker", "Kubernetes", "AWS", "Vercel", "CI/CD Pipelines"],
    },
    {
        category: "APIs & Architecture",
        techs: [
            "REST APIs",
            "GraphQL",
            "JWT Authentication",
            "Microservices",
            "System Design",
        ],
    },
]

export default function TechStack() {
    return (
        <motion.section
            className="py-32 px-[7%] border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-gson-yellow uppercase tracking-widest text-sm mb-4">
                        Expertise Técnica
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Stack Avançado de Engenharia.
                    </h2>
                </motion.div>

                <div className="text-center mb-8">
                    <p className="text-gson-yellow font-black text-xl">
                        + 12 ferramentas-chave | + 50 APIs integradas | 99% SLA
                        em projetos entregues
                    </p>
                    <p className="text-gson-sand/80 mt-2">
                        Stack validado em produção com foco em alta performance
                        e segurança.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {techCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="card-glass p-6 rounded-2xl border border-white/10"
                        >
                            <h3 className="text-gson-yellow font-black text-lg mb-4 uppercase tracking-widest">
                                {category.category}
                            </h3>
                            <ul className="space-y-3">
                                {category.techs.map((tech, techIndex) => (
                                    <motion.li
                                        key={techIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay:
                                                catIndex * 0.1 +
                                                techIndex * 0.05,
                                        }}
                                        className="flex items-center gap-2 text-white"
                                    >
                                        <span className="w-2 h-2 bg-gson-yellow rounded-full" />
                                        {tech}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 card-glass p-8 rounded-2xl border border-gson-yellow/30 text-center"
                >
                    <p className="text-gson-sand/80 text-lg">
                        Com{" "}
                        <span className="text-gson-yellow font-bold">
                            3+ anos
                        </span>{" "}
                        de experiência, otimizamos sistemas para performance,
                        segurança e escalabilidade.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    )
}
