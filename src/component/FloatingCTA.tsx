import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, ArrowRight, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const messages = [
    { threshold: 0,    text: "Olá 👋 posso ajudar?",              sub: "Fala connosco" },
    { threshold: 0.15, text: "Gostaste do que vês?",               sub: "Arranca o teu projecto" },
    { threshold: 0.35, text: "Curioso sobre o nosso método?",      sub: "Vê como trabalhamos" },
    { threshold: 0.55, text: "Tens uma ideia em mente?",           sub: "Vamos transformá-la" },
    { threshold: 0.75, text: "Pronto para o próximo nível?",       sub: "Fala com a equipa" },
    { threshold: 0.90, text: "Até ao fundo! Impressionado? 😄",    sub: "Envia a tua ideia" },
]

export default function FloatingCTA() {
    const [expanded, setExpanded] = useState(false)
    const [msgIndex, setMsgIndex] = useState(0)
    const [pulse, setPulse] = useState(false)
    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
            const next = [...messages].reverse().find(m => progress >= m.threshold)
            const idx = messages.indexOf(next ?? messages[0])
            if (idx !== msgIndex) {
                setMsgIndex(idx)
                setPulse(true)
                setTimeout(() => setPulse(false), 600)
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true })

        // Auto-expand after 4s on first load
        const t = setTimeout(() => { if (!dismissed) setExpanded(true) }, 4000)
        return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t) }
    }, [msgIndex, dismissed])

    const msg = messages[msgIndex]

    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
            {/* Bubble */}
            <AnimatePresence>
                {expanded && !dismissed && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="bg-[#18181f] border border-white/15 rounded-2xl p-4 max-w-[220px] shadow-2xl"
                    >
                        <button
                            onClick={() => { setDismissed(true); setExpanded(false) }}
                            className="absolute top-2 right-2 text-gson-sand/30 hover:text-gson-sand transition-colors"
                        >
                            <X size={12} />
                        </button>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={msgIndex}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                            >
                                <p className="text-white text-sm font-bold leading-snug pr-4">{msg.text}</p>
                                <p className="text-gson-sand/50 text-xs mt-1">{msg.sub}</p>
                            </motion.div>
                        </AnimatePresence>
                        <Link
                            to="/contato"
                            onClick={() => setExpanded(false)}
                            className="mt-3 flex items-center gap-2 bg-gson-yellow text-gson-black text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gson-gold transition-all w-full justify-center"
                        >
                            Falar <ArrowRight size={12} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB button */}
            <motion.button
                onClick={() => { setExpanded(p => !p); setDismissed(false) }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                className="relative w-14 h-14 rounded-full bg-gson-yellow text-gson-black flex items-center justify-center shadow-lg shadow-gson-yellow/20"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={expanded ? "x" : "chat"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {expanded ? <X size={22} /> : <MessageCircle size={22} />}
                    </motion.div>
                </AnimatePresence>
                {/* Pulse ring on scroll trigger */}
                {pulse && (
                    <motion.span
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-full bg-gson-yellow"
                    />
                )}
                {/* Notification dot */}
                {!expanded && (
                    <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gson-black">
                        <Zap size={6} className="absolute inset-0 m-auto text-gson-black" />
                    </span>
                )}
            </motion.button>
        </div>
    )
}
