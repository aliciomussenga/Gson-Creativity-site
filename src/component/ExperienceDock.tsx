import { useEffect, useState } from "react"
import { ArrowUp, Compass, Home, Layers3, Mail, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"

const links = [
    { to: "/", label: "Início", icon: Home },
    { to: "/sobre", label: "Agência", icon: Sparkles },
    { to: "/servicos", label: "Expertise", icon: Layers3 },
    { to: "/contato", label: "Contacto", icon: Mail },
]

export default function ExperienceDock() {
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const location = useLocation()

    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0)
        }
        update()
        window.addEventListener("scroll", update, { passive: true })
        return () => window.removeEventListener("scroll", update)
    }, [location.pathname])

    return (
        <div className="fixed left-4 bottom-5 z-[150] flex flex-col items-start gap-2 sm:left-6 sm:bottom-6">
            <AnimatePresence>
                {open && <motion.nav initial={{ opacity: 0, y: 12, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .95 }} className="rounded-2xl bg-gson-black text-white p-2 shadow-2xl border border-white/10" aria-label="Navegação rápida">
                    {links.map(({ to, label, icon: Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${location.pathname === to ? "bg-gson-yellow text-gson-black" : "hover:bg-white/10"}`}><Icon size={16} />{label}</Link>)}
                </motion.nav>}
            </AnimatePresence>
            <div className="flex items-center gap-2">
                <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Abrir navegação rápida" className="w-12 h-12 rounded-full bg-gson-yellow text-gson-black shadow-lg shadow-gson-yellow/25 flex items-center justify-center hover:bg-gson-gold transition-colors"><Compass size={21} /></button>
                {progress > 12 && <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-10 rounded-full bg-white text-gson-black px-3 text-xs font-black shadow-lg flex gap-1.5 items-center hover:bg-gson-sand transition-colors" aria-label="Voltar ao topo"><ArrowUp size={15} /> {progress}%</button>}
            </div>
        </div>
    )
}
