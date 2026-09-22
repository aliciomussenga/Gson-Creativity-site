import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Command, Menu, X } from "lucide-react"
import logo from "../../assets/logo.png"

const views = [
    { name: "Home", path: "/", code: "01" },
    { name: "Agência", path: "/sobre", code: "02" },
    { name: "Expertise", path: "/servicos", code: "03" },
]
const viewNames: Record<string, string> = { "/": "Visão geral", "/sobre": "Agência", "/servicos": "Expertise", "/contato": "Novo projecto" }

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const reduceMotion = useReducedMotion()
    const activeView = viewNames[location.pathname] ?? "Gson Studio"

    return (
        <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-[#09090d]/95 text-white backdrop-blur-xl">
            {/* Workspace status bar */}
            <div className="h-7 border-b border-white/[.07] bg-black/30">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-[7%] text-[9px] font-bold uppercase tracking-[.2em] text-white/45">
                    <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gson-yellow shadow-[0_0_9px_#F2E30C]" /> Gson Studio <span className="hidden sm:inline text-white/20">/ Workspace</span></div>
                    <div className="flex items-center gap-3"><span className="hidden sm:inline">Luanda · AO</span><span className="text-gson-yellow">Sistema activo</span></div>
                </div>
            </div>

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-[7%]">
                <Link to="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)} aria-label="Gson Creativity, início">
                    <img src={logo} alt="" className="h-9 w-9 object-contain transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" />
                    <div className="hidden sm:block"><p className="text-[10px] font-black uppercase tracking-[.22em] text-white">Gson Creativity</p><p className="mt-0.5 text-[8px] uppercase tracking-[.18em] text-gson-yellow">Digital workspace</p></div>
                </Link>

                <nav className="hidden h-full items-center md:flex" aria-label="Vistas do workspace">
                    {views.map((view) => {
                        const active = location.pathname === view.path
                        return <Link key={view.path} to={view.path} className={`relative flex h-full items-center gap-2 px-5 text-[10px] font-black uppercase tracking-[.2em] transition-colors ${active ? "text-gson-yellow" : "text-white/60 hover:text-white"}`}>
                            <span className="text-[8px] text-white/25">{view.code}</span>{view.name}
                            {active && <motion.span layoutId="workspace-tab" className="absolute inset-x-4 bottom-0 h-0.5 bg-gson-yellow" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                        </Link>
                    })}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <button type="button" onClick={() => window.dispatchEvent(new Event("gson:open-command"))} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.13em] text-white/55 transition hover:border-gson-yellow/60 hover:text-white" aria-label="Abrir comandos, Control K"><Command size={13} className="text-gson-yellow" /><span>Comandos</span><kbd className="rounded bg-white/10 px-1 py-0.5 text-[8px] text-white/45">⌘K</kbd></button>
                    <div className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-white/55"><span className="text-gson-yellow">●</span> {activeView}</div>
                    <Link to="/contato" className="rounded-full bg-gson-yellow px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-gson-black transition hover:bg-gson-gold">Iniciar projecto</Link>
                </div>

                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[.04] md:hidden" onClick={() => setIsOpen(value => !value)} aria-expanded={isOpen} aria-label="Abrir navegação">
                    {isOpen ? <X size={19} className="text-gson-yellow" /> : <Menu size={19} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && <motion.nav initial={reduceMotion ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} className="border-t border-white/10 bg-[#0d0d12] p-4 md:hidden" aria-label="Navegação móvel">
                    {views.concat({ name: "Contacto", path: "/contato", code: "04" }).map((view) => <Link key={view.path} to={view.path} onClick={() => setIsOpen(false)} className={`mb-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black uppercase tracking-[.16em] ${location.pathname === view.path ? "bg-gson-yellow text-gson-black" : "text-white hover:bg-white/10"}`}><span>{view.name}</span><span className="text-[10px] opacity-50">{view.code}</span></Link>)}
                </motion.nav>}
            </AnimatePresence>
        </header>
    )
}
