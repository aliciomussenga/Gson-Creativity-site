import { BookOpen, Users, Zap, Award, Smartphone, Star, Download } from "lucide-react"
import { motion } from "framer-motion"

const academyFeatures = [
    {
        icon: <BookOpen size={32} className="stroke-current" />,
        title: "Cursos em Áudio",
        desc: "Aprende em movimento — no trânsito, caminhada ou descanso. Conteúdo prático em formato podcast.",
    },
    {
        icon: <Users size={32} className="stroke-current" />,
        title: "Mentoria Directa",
        desc: "Aulas ao vivo com especialistas da Gson Creativity. Feedback real, não teoria.",
    },
    {
        icon: <Zap size={32} className="stroke-current" />,
        title: "Projectos Reais",
        desc: "Deploy em produção, experiência imediata e portfólio que impressiona.",
    },
    {
        icon: <Award size={32} className="stroke-current" />,
        title: "100% Gratuito",
        desc: "Conteúdo de qualidade acessível a todos. Sem barreiras ao conhecimento.",
    },
]

const stats = [
    { value: "450+", label: "Horas de conteúdo" },
    { value: "80+", label: "Alunos activos" },
    { value: "8", label: "Turmas em curso" },
    { value: "4", label: "Trilhas de carreira" },
]

export default function GsonAcademy() {
    return (
        <motion.section
            className="py-32 px-[7%] border-t border-white/5 bg-gradient-to-b from-[#0d0d0d] via-[#0a0a10] to-[#0d0d0d] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gson-yellow uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-2"
                    >
                        <Smartphone size={14} />
                        Agora na Play Store
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
                        A plataforma de educação tech focada no mercado africano.
                        Aprende Backend, DevOps e Arquitectura de Sistemas — onde quiseres.
                    </motion.p>
                </div>

                {/* Main content — app showcase + features */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                    {/* Phone mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 flex justify-center"
                    >
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gson-yellow/10 rounded-[40px] blur-3xl scale-90" />
                            {/* Phone shell */}
                            <div className="relative w-56 rounded-[36px] bg-gradient-to-b from-[#1a1a20] to-[#0d0d12] border border-white/15 shadow-2xl overflow-hidden" style={{ aspectRatio: '9/19' }}>
                                {/* Notch */}
                                <div className="w-20 h-5 bg-[#0d0d12] rounded-b-2xl mx-auto" />
                                {/* App UI mockup */}
                                <div className="px-4 py-3">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-lg bg-gson-yellow flex items-center justify-center">
                                            <BookOpen size={14} className="text-gson-black" />
                                        </div>
                                        <span className="text-white text-xs font-bold">Gson Academy</span>
                                        <div className="ml-auto flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={8} className="fill-gson-yellow text-gson-yellow" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Course cards */}
                                    {[
                                        { title: "Backend com Python", progress: 72, color: "bg-gson-yellow" },
                                        { title: "DevOps Essentials", progress: 45, color: "bg-gson-gold" },
                                        { title: "System Design", progress: 20, color: "bg-white/40" },
                                    ].map((course, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className="mb-3 bg-white/5 rounded-xl p-3 border border-white/8"
                                        >
                                            <p className="text-white text-[10px] font-bold mb-2">{course.title}</p>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${course.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                                                    className={`h-full rounded-full ${course.color}`}
                                                />
                                            </div>
                                            <p className="text-gson-sand/40 text-[9px] mt-1">{course.progress}% completo</p>
                                        </motion.div>
                                    ))}

                                    {/* Now playing */}
                                    <div className="mt-4 bg-gson-yellow/10 border border-gson-yellow/20 rounded-xl p-3">
                                        <p className="text-gson-yellow text-[9px] uppercase tracking-widest mb-1">A ouvir agora</p>
                                        <p className="text-white text-[10px] font-bold">Ep. 12 — APIs RESTful</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="w-2/5 h-full bg-gson-yellow rounded-full" />
                                            </div>
                                            <span className="text-gson-sand/40 text-[9px]">8:43</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side — features + CTA */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {academyFeatures.map((feature, index) => (
                                <motion.article
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    className="card-glass p-5 rounded-2xl border border-white/10 flex gap-4 items-start"
                                >
                                    <div className="text-gson-yellow flex-shrink-0 mt-0.5">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base mb-1">{feature.title}</h3>
                                        <p className="text-gson-sand/70 text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-3 mb-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.08 }}
                                    className="text-center"
                                >
                                    <p className="text-gson-yellow font-black text-2xl">{stat.value}</p>
                                    <p className="text-gson-sand/50 text-xs mt-0.5">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Download CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <a
                                href="https://play.google.com/store/apps/details?id=com.gson.academia&pcampaignid=web_share"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-gson-yellow text-gson-black px-6 py-3.5 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all group"
                            >
                                <Download size={18} className="group-hover:scale-110 transition-transform" />
                                Download na Play Store
                            </a>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {['🇦🇴','🇵🇹','🇧🇷','🇲🇿'].map((flag, i) => (
                                        <span key={i} className="text-lg -ml-1 first:ml-0">{flag}</span>
                                    ))}
                                </div>
                                <span className="text-gson-sand/50 text-xs">Disponível em Angola e PALOP</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
