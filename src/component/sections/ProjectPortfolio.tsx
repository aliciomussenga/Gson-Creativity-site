import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface Project {
    id: string
    title: string
    subtitle: string
    description: string
    techs: string[]
    category: string
    link?: string
    github?: string
}

const projects: Project[] = [
    {
        id: "kz-educa",
        title: "KzEduca APP",
        subtitle: "Educação Financeira",
        description:
            "Aplicação mobile para educação financeira focada no mercado angolano, resolvendo problemas de finança pessoal e empresarial.",
        techs: ["Flutter", "Dart", "Firebase"],
        category: "Mobile App",
        github: "https://github.com/Gelson-do-Souto/KzEduca-app",
    },
    {
        id: "ecommerce-api",
        title: "E-commerce Backend API",
        subtitle: "Sistema Completo",
        description:
            "API RESTful robusto para e-commerce com gestão de produtos, utilizadores, autenticação JWT e carrinho de compras seguro.",
        techs: ["Python", "Django REST", "PostgreSQL", "Docker"],
        category: "Backend",
        github: "https://github.com/Gelson-do-Souto/ecommerce-backend-api",
    },
    {
        id: "nany-app",
        title: "Nany App",
        subtitle: "Rede Social",
        description:
            "Plataforma social community-driven. Projeto desenvolvido por paixão que demonstra expertise em full-stack mobile.",
        techs: ["Flutter", "Dart", "Firebase", "Python"],
        category: "Mobile App",
        github: "https://github.com/Gelson-do-Souto/App_nany",
    },
    {
        id: "gson-academy",
        title: "Gson Academy",
        subtitle: "Academia de capacitação tech",
        description:
            "Plataforma educacional em desenvolvimento de software e DevOps para profissionais e equipes.",
        techs: ["React", "Node.js", "Docker", "CI/CD"],
        category: "Gson Academy",
        link: "https://play.google.com/store/apps/details?id=com.gson.academia&pcampaignid=web_share",
    },
    {
        id: "odoo-localization",
        title: "Módulo de Localização Odoo",
        subtitle: "ERP Customização",
        description:
            "Módulo especializado para planos de contas angolanos, taxas e localização. Implementação de conformidade fiscal e regulatória.",
        techs: ["Python", "XML", "PostgreSQL", "CSV"],
        category: "Enterprise",
    },
]

export default function ProjectPortfolio() {
    return (
        <motion.section
            className="py-32 px-[7%] border-t border-white/5 bg-gradient-to-b from-[#0d0d0d] via-[#0a0a10] to-[#0d0d0d]"
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
                        Portfólio de Projetos
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Produtos & Soluções Entregues.
                    </h2>
                    <p className="text-gson-sand/80 text-lg mt-6 max-w-3xl mx-auto">
                        Projetos que demonstram excelência técnica, criatividade
                        e impacto real no mercado africano.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="card-glass p-6 rounded-2xl border border-white/10 flex flex-col h-full hover:border-gson-yellow/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-white text-2xl font-bold">
                                        {project.title}
                                    </h3>
                                    <p className="text-gson-yellow text-sm font-bold uppercase tracking-widest mt-1">
                                        {project.category}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gson-sand text-sm mb-2">
                                {project.subtitle}
                            </p>
                            <p className="text-gson-sand/70 text-sm leading-relaxed mb-6 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techs.map(tech => (
                                    <span
                                        key={tech}
                                        className="inline-block bg-white/5 text-gson-sand/80 text-xs px-3 py-1 rounded-full border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/10">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gson-yellow hover:text-gson-gold transition-colors text-sm font-bold"
                                    >
                                        <Github size={16} />
                                        Código
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gson-yellow hover:text-gson-gold transition-colors text-sm font-bold ml-auto"
                                    >
                                        Visitar
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
