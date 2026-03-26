import { Award, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const certifications = [
    {
        title: "Software Engineering",
        subtitle: "Professional Diploma Program",
        issuer: "European Open University",
        year: "2024",
    },
    {
        title: "Odoo Functional Certification",
        subtitle: "ERP System Implementation",
        issuer: "Odoo S.A.",
        year: "2025",
    },
    {
        title: "Odoo DevOps Crash Course",
        subtitle: "Infrastructure & Deployment",
        issuer: "Udemy",
        year: "2025",
    },
    {
        title: "Python Fundamentals",
        subtitle: "Networking Academy",
        issuer: "Cisco",
        year: "2024",
    },
]

export default function Certifications() {
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
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Award size={32} className="text-gson-yellow" />
                        <p className="text-gson-yellow uppercase tracking-widest text-sm font-black">
                            Credibilidade & Reconhecimento
                        </p>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Certificações Profissionais.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                borderColor: "rgba(242, 227, 12, 0.5)",
                            }}
                            className="card-glass p-6 rounded-2xl border border-white/10 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className="pt-1">
                                    <CheckCircle
                                        size={24}
                                        className="text-gson-yellow flex-shrink-0"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {cert.title}
                                    </h3>
                                    <p className="text-gson-sand/70 text-sm mt-1">
                                        {cert.subtitle}
                                    </p>
                                    <div className="flex justify-between items-end mt-4">
                                        <p className="text-gson-sand/60 text-xs uppercase tracking-widest">
                                            {cert.issuer}
                                        </p>
                                        <span className="text-gson-yellow font-black text-sm">
                                            {cert.year}
                                        </span>
                                    </div>
                                </div>
                            </div>
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
                    <p className="text-gson-sand/80 text-lg">
                        Formação contínua e aprendizado constante garantem
                        soluções de{" "}
                        <span className="text-white font-bold">
                            qualidade enterprise
                        </span>
                        .
                    </p>
                </motion.div>
            </div>
        </motion.section>
    )
}
