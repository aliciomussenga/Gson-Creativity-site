import { useEffect, useRef, useState } from "react"
import { ArrowUp, Command, Home, Layers3, Mail, Search, Sparkles, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"

const commands = [
    { label: "Abrir Home", hint: "Visão geral da Gson", icon: Home, path: "/", terms: "home inicio visão geral" },
    { label: "Abrir Agência", hint: "Conhecer a Gson", icon: Sparkles, path: "/sobre", terms: "agencia sobre equipa gson" },
    { label: "Abrir Expertise", hint: "Serviços e soluções", icon: Layers3, path: "/servicos", terms: "expertise servicos soluções" },
    { label: "Iniciar projecto", hint: "Falar com a equipa", icon: Mail, path: "/contato", terms: "contacto contato projecto falar" },
]

export default function GsonCommandPalette() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const reduceMotion = useReducedMotion()
    const filtered = commands.filter(command => `${command.label} ${command.hint} ${command.terms}`.toLowerCase().includes(query.toLowerCase().trim()))

    useEffect(() => {
        const toggle = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value) }
            if (event.key === "Escape") setOpen(false)
        }
        const openPalette = () => setOpen(true)
        window.addEventListener("keydown", toggle)
        window.addEventListener("gson:open-command", openPalette)
        return () => { window.removeEventListener("keydown", toggle); window.removeEventListener("gson:open-command", openPalette) }
    }, [])

    useEffect(() => { if (open) { setQuery(""); window.setTimeout(() => inputRef.current?.focus(), 40) } }, [open])
    useEffect(() => { setOpen(false) }, [location.pathname])
    const go = (path: string) => { navigate(path); setOpen(false) }

    return <AnimatePresence>
        {open && <motion.div className="fixed inset-0 z-[250] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Comandos do Gson Studio">
            <motion.div className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#101015] shadow-[0_32px_90px_rgba(0,0,0,.55)]" initial={reduceMotion ? false : { opacity: 0, y: -16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }} onMouseDown={event => event.stopPropagation()}>
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><Search size={18} className="text-gson-yellow" /><input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Procurar uma vista ou acção..." className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/35" /><button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 text-white/45 hover:bg-white/10 hover:text-white" aria-label="Fechar comandos"><X size={17} /></button></div>
                <div className="p-2"><p className="px-3 pb-2 pt-1 text-[9px] font-black uppercase tracking-[.2em] text-white/35">Navegar no Gson Studio</p>{filtered.length ? filtered.map(({ label, hint, icon: Icon, path }) => <button type="button" key={path} onClick={() => go(path)} className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-gson-yellow hover:text-gson-black"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[.08] text-gson-yellow group-hover:bg-gson-black/10 group-hover:text-gson-black"><Icon size={17} /></span><span className="flex-1"><span className="block text-sm font-bold">{label}</span><span className="block text-xs text-white/45 group-hover:text-gson-black/60">{hint}</span></span><span className="text-[10px] font-black opacity-45">abrir</span></button>) : <p className="px-3 py-8 text-center text-sm text-white/45">Nenhum comando encontrado.</p>}</div>
                <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[9px] font-bold uppercase tracking-[.13em] text-white/35"><span className="flex items-center gap-1"><Command size={12} /> K para alternar</span><button type="button" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false) }} className="flex items-center gap-1 transition hover:text-gson-yellow"><ArrowUp size={12} /> voltar ao topo</button></div>
            </motion.div>
        </motion.div>}
    </AnimatePresence>
}
