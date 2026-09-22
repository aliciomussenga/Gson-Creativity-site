import { useEffect, useState } from "react"
import { ArrowUp, Home, Layers3, Mail, Sparkles } from "lucide-react"
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
        <div className="fixed bottom-4 left-1/2 z-[150] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6">
            <AnimatePresence>
                {open && <motion.nav initial={{ opacity: 0, y: 12, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .95 }} className="rounded-2xl border border-white/10 bg-gson-black p-2 text-white shadow-2xl" aria-label="Navegação rápida">
                    {links.map(({ to, label, icon: Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${location.pathname === to ? "bg-gson-yellow text-gson-black" : "hover:bg-white/10"}`}><Icon size={16} />{label}</Link>)}
                </motion.nav>}
            </AnimatePresence>
            <div className="flex items-center gap-1 rounded-2xl border border-white/15 bg-[#0d0d12]/90 p-1.5 shadow-2xl backdrop-blur-xl">
                {links.map(({ to, label, icon: Icon }) => <Link key={to} to={to} aria-label={label} className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${location.pathname === to ? "bg-gson-yellow text-gson-black" : "text-white/60 hover:bg-white/10 hover:text-white"}`}><Icon size={17} /></Link>)}
                <span className="mx-1 h-6 w-px bg-white/10" />
                <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Abrir opções do workspace" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.07] text-gson-yellow transition hover:bg-gson-yellow hover:text-gson-black"><Sparkles size={17} /></button>
                {progress > 12 && <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-10 rounded-full bg-white text-gson-black px-3 text-xs font-black shadow-lg flex gap-1.5 items-center hover:bg-gson-sand transition-colors" aria-label="Voltar ao topo"><ArrowUp size={15} /> {progress}%</button>}
            </div>
        </div>
    )
}
