import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
    return (
        <section className="py-32 px-[7%] bg-gson-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(242,227,12,0.22),transparent_60%)]" />

            <div className="max-w-4xl mx-auto relative">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-gson-yellow text-[11px] uppercase tracking-widest mb-6"
                >
                    Próximo passo
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-10"
                >
                    Tens uma ideia.
                    <br />
                    <span className="text-gson-yellow">Nós construímos.</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="flex flex-wrap items-center gap-6"
                >
                    <Link to="/contato">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3 bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest group"
                        >
                            Iniciar conversa
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </Link>

                    <div className="flex items-center gap-3 text-gson-sand/50 text-sm">
                        <div className="flex -space-x-2">
                            {["G", "D", "B"].map((l, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-xs font-black text-gson-yellow">
                                    {l}
                                </div>
                            ))}
                        </div>
                        <span>Conte-nos onde quer chegar</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
