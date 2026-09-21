import { Instagram, Youtube, Linkedin, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Agência", to: "/sobre" },
    { label: "Expertise", to: "/servicos" },
    { label: "Contacto", to: "/contato" },
]

const socialLinks = [
    { icon: <Instagram size={18} />, label: "Instagram", href: "https://www.instagram.com/gson_creativity/" },
    { icon: <Youtube size={18} />, label: "YouTube", href: "https://www.youtube.com/@gsoncreativity" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/company/gson-creativity" },
    { icon: <Mail size={18} />, label: "Email", href: "mailto:creativitygson@gmail.com" },
]

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-gson-black border-t border-white/5 pt-16 pb-8 px-[7%]">
            <div className="max-w-7xl mx-auto">

                {/* Top row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <h2 className="text-white font-black tracking-tighter text-2xl mb-2">
                            GSON <span className="text-gson-yellow">Creativity</span>
                        </h2>
                        <p className="text-gson-sand/40 text-xs uppercase tracking-[0.3em] mb-4">
                            High Performance Agency
                        </p>
                        <div className="flex items-center gap-1.5 text-gson-sand/40 text-xs">
                            <MapPin size={11} />
                            <span>Luanda, Angola</span>
                        </div>
                    </div>

                    {/* Nav */}
                    <div>
                        <p className="text-gson-sand/30 text-[10px] uppercase tracking-widest mb-4">Navegação</p>
                        <nav className="flex flex-col gap-2.5">
                            {navLinks.map((l) => (
                                <Link
                                    key={l.to}
                                    to={l.to}
                                    className="text-gson-sand/60 hover:text-gson-yellow text-sm transition-colors w-fit"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="text-gson-sand/30 text-[10px] uppercase tracking-widest mb-4">Redes</p>
                        <div className="flex flex-col gap-2.5">
                            {socialLinks.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-gson-sand/60 hover:text-gson-yellow text-sm transition-colors w-fit group"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <span className="text-gson-sand/30 group-hover:text-gson-yellow transition-colors">
                                        {s.icon}
                                    </span>
                                    {s.label}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.04] gap-4">
                    <p className="text-gson-sand/25 text-[10px] uppercase tracking-widest">
                        © {year} Gson Creativity. Todos os direitos reservados.
                    </p>
                    <p className="text-gson-sand/20 text-[10px] uppercase tracking-widest">
                        Built in Angola 🇦🇴 · React · TypeScript · Tailwind
                    </p>
                </div>
            </div>
        </footer>
    )
}
