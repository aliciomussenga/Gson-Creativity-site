import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, HeartHandshake, MessageCircle, Sparkles, UsersRound } from "lucide-react"
import { Link } from "react-router-dom"

const conversations = [
    {
        label: "Tenho uma ideia",
        title: "Não precisa de chegar com tudo resolvido.",
        text: "Traz a vontade de fazer acontecer. Nós ajudamos a fazer as perguntas certas, a dar forma à ideia e a encontrar o primeiro passo possível.",
        detail: "Uma conversa honesta vale mais do que um briefing perfeito.",
        icon: Sparkles,
        image: "/gson-academy/educacao-global.webp",
    },
    {
        label: "Tenho um desafio",
        title: "Problemas reais merecem atenção real.",
        text: "Ouvimos o contexto antes de sugerir tecnologia. Assim, a solução serve as pessoas que a usam — e não apenas uma lista de funcionalidades.",
        detail: "Menos ruído. Mais clareza para decidir em conjunto.",
        icon: MessageCircle,
        image: "/gson-academy/aprendizagem.webp",
    },
    {
        label: "Tenho uma equipa",
        title: "As melhores experiências nascem de parceria.",
        text: "Trabalhamos lado a lado com quem conhece o negócio. Cada entrega é uma conversa contínua, com espaço para aprender e ajustar.",
        detail: "Tecnologia ganha valor quando aproxima pessoas.",
        icon: UsersRound,
        image: "/gson-academy/equipa.webp",
    },
]

export default function HumanConnection() {
    const [active, setActive] = useState(0)
    const prefersReducedMotion = useReducedMotion()
    const conversation = conversations[active]
    const Icon = conversation.icon

    return (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="human-connection-title">
            <div className="pointer-events-none absolute -right-28 top-8 h-80 w-80 rounded-full bg-gson-yellow/20 blur-3xl" />
            <div className="relative mx-auto grid max-w-6xl gap-12 px-[7%] lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                    <div className="mb-5 flex items-center gap-3 text-gson-gold"><HeartHandshake size={19} /><span className="text-xs font-black uppercase tracking-[0.25em]">Tecnologia com escuta</span></div>
                    <h2 id="human-connection-title" className="max-w-lg text-4xl font-black leading-[.98] tracking-tight text-gson-black sm:text-6xl">Por trás de cada projecto, <span className="text-gson-gold">há pessoas.</span></h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-gson-black/65">A Gson não trabalha para perfis abstratos. Trabalha com pessoas, equipas e ambições que merecem ganhar vida.</p>
                    <div className="mt-9 flex flex-col gap-2" role="tablist" aria-label="Começar uma conversa">
                        {conversations.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`flex items-center justify-between rounded-2xl px-5 py-4 text-left text-sm font-bold transition-all ${active === index ? "bg-gson-black text-white shadow-lg" : "border border-gson-black/10 text-gson-black hover:border-gson-gold/60 hover:bg-gson-yellow/10"}`}><span><span className="mr-3 text-gson-gold">0{index + 1}</span>{item.label}</span><ArrowRight size={17} className={active === index ? "text-gson-yellow" : "text-gson-black/40"} /></button>)}
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-[#0b1320] shadow-[0_24px_60px_rgba(13,13,13,.16)] sm:min-h-[520px]">
                        <AnimatePresence mode="wait"><motion.img key={conversation.image} src={conversation.image} alt="" className="absolute inset-0 h-full w-full object-cover" initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0 }} transition={{ duration: .45, ease: "easeOut" }} /></AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#060a10] via-[#060a10]/70 to-transparent" />
                        <AnimatePresence mode="wait"><motion.div key={conversation.title} initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .3, ease: "easeOut" }} className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10"><span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gson-yellow text-gson-black"><Icon size={22} /></span><p className="text-xs font-black uppercase tracking-[.2em] text-gson-yellow">{conversation.label}</p><h3 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-5xl">{conversation.title}</h3><p className="mt-4 max-w-xl leading-relaxed text-white/75">{conversation.text}</p><p className="mt-6 border-l-2 border-gson-yellow pl-3 text-sm font-medium text-white/85">{conversation.detail}</p></motion.div></AnimatePresence>
                    </div>
                    <Link to="/contato" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gson-black transition hover:text-gson-gold">Vamos conversar <ArrowRight size={16} /></Link>
                </div>
            </div>
        </section>
    )
}
