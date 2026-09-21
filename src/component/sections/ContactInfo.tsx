import { Mail, Phone, LocateFixed, Clock, MessageCircle, Linkedin, Instagram } from "lucide-react"
import { motion } from "framer-motion"

const contactItems = [
    { icon: <Mail size={20} />, label: "E-mail", value: "creativitygson@gmail.com", href: "mailto:creativitygson@gmail.com" },
    { icon: <Phone size={20} />, label: "WhatsApp", value: "+244 933 648 881", href: "https://wa.me/244933648881" },
    { icon: <LocateFixed size={20} />, label: "Localização", value: "Luanda, Angola", href: null },
    { icon: <Clock size={20} />, label: "Próximo passo", value: "Analisamos cada pedido antes de responder", href: null },
]

const socialLinks = [
    { icon: <MessageCircle size={18} />, label: "WhatsApp", href: "https://wa.me/244933648881", color: "hover:border-green-500/50 hover:text-green-400" },
    { icon: <Instagram size={18} />, label: "Instagram", href: "https://instagram.com/gson.creativity", color: "hover:border-pink-500/50 hover:text-pink-400" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/company/gson-creativity", color: "hover:border-blue-500/50 hover:text-blue-400" },
]

const processSteps = [
    { step: "01", title: "Envia a mensagem", desc: "Preenches o formulário com a tua ideia ou desafio." },
    { step: "02", title: "Análise do contexto", desc: "Lemos o pedido e identificamos o que precisamos de esclarecer." },
    { step: "03", title: "Alinhamento", desc: "Quando necessário, marcamos uma conversa para perceber melhor a ideia." },
    { step: "04", title: "Próximos passos", desc: "Partilhamos uma proposta de caminho adequada ao que foi conversado." },
]

export default function ContactInfo() {
    return (
        <div className="flex flex-col gap-10">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl md:text-6xl font-black text-white leading-none mb-4 tracking-tighter">
                    VAMOS TIRAR A IDEIA DO{" "}
                    <span className="text-transparent border-text">PAPEL?</span>
                </h1>
                <p className="text-gson-sand/70 text-lg leading-relaxed max-w-sm">
                    Não te preocupes em ter tudo definido. Chega com a ideia — a gente ajuda a estruturar o resto.
                </p>
            </motion.div>

            {/* Contact items */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
            >
                {contactItems.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-gson-yellow group-hover:bg-gson-yellow group-hover:text-gson-black transition-all flex-shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-gson-sand/50 text-[10px] uppercase tracking-widest">{item.label}</p>
                            {item.href ? (
                                <a href={item.href} className="text-white font-medium text-base hover:text-gson-yellow transition-colors">
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-white font-medium text-base">{item.value}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Process steps */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card-glass rounded-2xl border border-white/8 p-6"
            >
                <p className="text-gson-yellow text-[10px] uppercase tracking-widest mb-5 flex items-center gap-2">
                    <span className="w-4 h-px bg-gson-yellow" />
                    Como funciona o processo
                </p>
                <div className="space-y-4">
                    {processSteps.map((s, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <span className="text-gson-yellow/30 font-black text-sm w-5 flex-shrink-0 mt-0.5">{s.step}</span>
                            <div>
                                <p className="text-white text-sm font-bold">{s.title}</p>
                                <p className="text-gson-sand/50 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Social links */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <p className="text-gson-sand/40 text-xs uppercase tracking-widest mb-3">Também podes encontrar-nos em</p>
                <div className="flex gap-3">
                    {socialLinks.map((s, i) => (
                        <a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={s.label}
                            className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gson-sand/50 transition-all ${s.color}`}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </motion.div>

            <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
        </div>
    )
}
