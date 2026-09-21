import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
    Coffee, Monitor, Users, Lightbulb, Rocket, ArrowRight,
    Volume2, VolumeX, Wifi, Battery, Clock
} from "lucide-react"
import { Link } from "react-router-dom"

interface Room {
    id: string
    name: string
    role: string
    emoji: string
    icon: React.ReactNode
    color: string
    ambiance: string
    description: string
    detail: string
    cta: { label: string; to: string }
    activity: string[]
}

const rooms: Room[] = [
    {
        id: "reception",
        name: "Recepção",
        role: "O teu primeiro contacto",
        emoji: "🚪",
        icon: <Coffee size={24} />,
        color: "#F2E30C",
        ambiance: "Cheira a café acabado de fazer. Música lo-fi ao fundo.",
        description: "Bem-vindo à Gson Creativity. A recepcionista levanta a cabeça do ecrã e sorri.",
        detail: "\"Tens reunião marcada? Não precisas. Aqui toda a gente é bem-vinda com ou sem agenda. Senta-te, o Gelson já vem.\"",
        cta: { label: "Iniciar Projecto", to: "/contato" },
        activity: ["Gelson a rever roadmap Q3", "Dev meeting em 15min", "3 propostas enviadas hoje"],
    },
    {
        id: "design",
        name: "Estúdio de Design",
        role: "Onde as ideias ganham forma",
        emoji: "🎨",
        icon: <Monitor size={24} />,
        color: "#F2B90C",
        ambiance: "Ecrãs duplos. Post-its amarelos por todo o lado. Figma aberto.",
        description: "O designer roda a cadeira. No ecrã, um wireframe que parece uma obra de arte.",
        detail: "\"Cada pixel tem um porquê. Não fazemos bonito — fazemos estratégico. Design que converte.\"",
        cta: { label: "Ver Projectos", to: "/servicos" },
        activity: ["UI do app Gson Academy em revisão", "Branding v3 aprovado", "Protótipo interactivo live"],
    },
    {
        id: "dev",
        name: "Sala de Engenharia",
        role: "O coração técnico",
        emoji: "⚡",
        icon: <Monitor size={24} />,
        color: "#F2E30C",
        ambiance: "Teclados mecânicos. 4 monitores. Terminal sempre aberto.",
        description: "Dois devs em pair programming. Um terceiro mergulhado em logs do Docker.",
        detail: "\"Pipeline verde. Deploy em 40 segundos. É isso que nos orgulha — não só o código funcionar, mas funcionar bem.\"",
        cta: { label: "Como Trabalhamos", to: "/" },
        activity: ["Backend API: 47 testes passados ✅", "Docker build 2m14s", "PR aberto: feature/auth-v2"],
    },
    {
        id: "strategy",
        name: "Sala de Estratégia",
        role: "Onde o futuro é desenhado",
        emoji: "🧠",
        icon: <Lightbulb size={24} />,
        color: "#F2B90C",
        ambiance: "Quadro branco cheio de setas e post-its. Silêncio pensativo.",
        description: "Uma reunião de roadmap. O Team Lead aponta para um diagrama de fluxo.",
        detail: "\"Não construímos apenas o que o cliente pede. Construímos o que o cliente precisa — que às vezes são coisas diferentes.\"",
        cta: { label: "Falar com a Equipa", to: "/contato" },
        activity: ["Sprint planning Q3 em curso", "OKRs revistos", "3 novos clientes qualificados"],
    },
    {
        id: "academy",
        name: "Sala de Formação",
        role: "Onde o talento cresce",
        emoji: "📚",
        icon: <Users size={24} />,
        color: "#F2E30C",
        ambiance: "Projetor ligado. 8 pessoas atentas. Alguém a tomar notas.",
        description: "Aula ao vivo da Gson Academy. O formador escreve código em tempo real.",
        detail: "\"Não formamos apenas programadores. Formamos pessoas que pensam como engenheiros e comunicam como designers.\"",
        cta: { label: "Gson Academy", to: "/" },
        activity: ["Turma Backend: 12 alunos online", "Episódio 14 gravado hoje", "80+ alunos activos"],
    },
    {
        id: "launch",
        name: "Sala de Lançamento",
        role: "O momento da verdade",
        emoji: "🚀",
        icon: <Rocket size={24} />,
        color: "#F2B90C",
        ambiance: "Silêncio tenso. Todos olham para o mesmo ecrã. Deploy em curso.",
        description: "Contagem regressiva. O terminal corre. Verde. Sempre verde.",
        detail: "\"Zero downtime. Sempre. Porque os nossos clientes têm utilizadores reais que não podem esperar.\"",
        cta: { label: "O Nosso Processo", to: "/servicos" },
        activity: ["App Gson Academy: LIVE ✅", "99.9% uptime este mês", "Último deploy: 0ms downtime"],
    },
]

function StatusBar() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="flex items-center gap-4 text-gson-sand/30 text-[10px] font-mono">
            <span className="flex items-center gap-1"><Wifi size={10} /> gson-office</span>
            <span className="flex items-center gap-1"><Battery size={10} /> 87%</span>
            <span className="flex items-center gap-1">
                <Clock size={10} />
                {time.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
            </span>
        </div>
    )
}

function ActivityFeed({ items }: { items: string[] }) {
    const [visible, setVisible] = useState(0)
    useEffect(() => {
        setVisible(0)
        let i = 0
        const t = setInterval(() => {
            i++
            setVisible(i)
            if (i >= items.length) clearInterval(t)
        }, 500)
        return () => clearInterval(t)
    }, [items])

    return (
        <div className="space-y-1.5">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={i < visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-xs text-gson-sand/50"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
                    {item}
                </motion.div>
            ))}
        </div>
    )
}

export default function OfficeVisit() {
    const [active, setActive] = useState(0)
    const [entered, setEntered] = useState(false)
    const [soundOn, setSoundOn] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

    const room = rooms[active]

    return (
        <section ref={containerRef} className="relative py-32 px-[7%] border-t border-white/5 overflow-hidden">
            {/* Parallax background layer */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(242,227,12,0.05),transparent_65%)]" />
                {/* Floating ambient dots */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-gson-yellow/20"
                        style={{
                            left: `${10 + (i * 7.3) % 80}%`,
                            top: `${5 + (i * 11.7) % 85}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.4,
                        }}
                    />
                ))}
            </motion.div>

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-gson-yellow uppercase tracking-widest text-sm mb-4">
                        Visita Virtual
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Entra no nosso{" "}
                        <span className="text-gson-yellow">escritório.</span>
                    </h2>
                    <p className="text-gson-sand/60 text-lg mt-4 max-w-xl mx-auto">
                        Cada sala tem a sua energia. Explora o que acontece por detrás dos produtos que entregamos.
                    </p>
                </motion.div>

                {/* Entry screen */}
                <AnimatePresence mode="wait">
                    {!entered ? (
                        <motion.div
                            key="entry"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center py-16 gap-8"
                        >
                            {/* Office door animation */}
                            <div className="relative w-32 h-44">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-[#2a2a1f] to-[#1a1a10] rounded-t-[50%] border-2 border-gson-yellow/40"
                                    animate={{ boxShadow: ["0 0 20px rgba(242,227,12,0.1)", "0 0 40px rgba(242,227,12,0.3)", "0 0 20px rgba(242,227,12,0.1)"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="absolute inset-3 bg-[#0d0d0d] rounded-t-[40%] border border-white/5" />
                                <motion.div
                                    className="absolute bottom-6 right-6 w-4 h-4 rounded-full bg-gson-yellow/60"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-3xl">🏢</div>
                            </div>

                            <div className="text-center">
                                <p className="text-white text-xl font-bold mb-1">Gson Creativity HQ</p>
                                <p className="text-gson-sand/50 text-sm">Luanda, Angola · {rooms.length} salas disponíveis</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <motion.button
                                    onClick={() => setEntered(true)}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(242,227,12,0.3)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-3 bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-black uppercase tracking-widest"
                                >
                                    Entrar no Escritório <ArrowRight size={18} />
                                </motion.button>
                                <button
                                    onClick={() => setSoundOn(p => !p)}
                                    className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-gson-sand/50 hover:border-gson-yellow/40 hover:text-gson-yellow transition-all"
                                    title={soundOn ? "Som ligado" : "Som desligado"}
                                >
                                    {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="office"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Floor plan nav */}
                            <div className="mb-8">
                                {/* Status bar */}
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-gson-sand/40 text-xs uppercase tracking-widest">
                                        {rooms.length} salas · Andar 3
                                    </p>
                                    <StatusBar />
                                </div>

                                {/* Room tabs — floor plan style */}
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {rooms.map((r, i) => (
                                        <motion.button
                                            key={r.id}
                                            onClick={() => setActive(i)}
                                            whileHover={{ y: -3 }}
                                            whileTap={{ scale: 0.96 }}
                                            className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center ${
                                                active === i
                                                    ? "bg-gson-yellow/10 border-gson-yellow/50"
                                                    : "border-white/8 hover:border-white/20"
                                            }`}
                                        >
                                            <span className="text-xl">{r.emoji}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wide leading-tight ${active === i ? "text-gson-yellow" : "text-gson-sand/50"}`}>
                                                {r.name}
                                            </span>
                                            {active === i && (
                                                <motion.div
                                                    layoutId="room-indicator"
                                                    className="absolute -bottom-px left-2 right-2 h-px bg-gson-yellow"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Room content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={room.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                                >
                                    {/* Main room panel */}
                                    <div className="lg:col-span-8 card-glass rounded-2xl border border-white/10 overflow-hidden">
                                        {/* Room header bar */}
                                        <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
                                            <div className="flex gap-1.5">
                                                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                                            </div>
                                            <span className="text-gson-sand/40 text-xs font-mono ml-2">
                                                gson-hq/{room.id}
                                            </span>
                                            <div className="ml-auto flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                <span className="text-gson-sand/30 text-[10px]">ocupada</span>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8">
                                            {/* Room identity */}
                                            <div className="flex items-start gap-4 mb-8">
                                                <motion.div
                                                    key={room.id + "-icon"}
                                                    initial={{ scale: 0.7, rotate: -15 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                                                    style={{ background: `${room.color}18`, border: `1px solid ${room.color}30` }}
                                                >
                                                    {room.emoji}
                                                </motion.div>
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: room.color }}>
                                                        {room.role}
                                                    </p>
                                                    <h3 className="text-white text-2xl font-black">{room.name}</h3>
                                                    <p className="text-gson-sand/50 text-sm mt-1 italic">{room.ambiance}</p>
                                                </div>
                                            </div>

                                            {/* Narrative */}
                                            <div className="space-y-4 mb-8">
                                                <p className="text-gson-sand/80 text-base leading-relaxed">
                                                    {room.description}
                                                </p>
                                                <blockquote className="border-l-2 border-gson-yellow/50 pl-4 italic text-gson-sand/70 text-sm leading-relaxed">
                                                    {room.detail}
                                                </blockquote>
                                            </div>

                                            {/* CTA */}
                                            <Link
                                                to={room.cta.to}
                                                className="inline-flex items-center gap-2 text-gson-yellow text-sm font-bold hover:gap-4 transition-all group"
                                            >
                                                {room.cta.label}
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Sidebar: live activity */}
                                    <div className="lg:col-span-4 flex flex-col gap-4">
                                        <div className="card-glass rounded-2xl border border-white/10 p-5 flex-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gson-sand/30 mb-4 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                Actividade ao vivo
                                            </p>
                                            <ActivityFeed items={room.activity} />
                                        </div>

                                        {/* Navigation hint */}
                                        <div className="card-glass rounded-2xl border border-white/8 p-4">
                                            <p className="text-gson-sand/30 text-[10px] uppercase tracking-widest mb-3">Próxima sala</p>
                                            <button
                                                onClick={() => setActive((active + 1) % rooms.length)}
                                                className="w-full flex items-center justify-between gap-3 text-gson-sand/60 hover:text-gson-yellow transition-colors group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{rooms[(active + 1) % rooms.length].emoji}</span>
                                                    <span className="text-sm font-bold">{rooms[(active + 1) % rooms.length].name}</span>
                                                </div>
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Room counter */}
                                        <div className="flex gap-1.5 justify-center">
                                            {rooms.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActive(i)}
                                                    className={`h-1 rounded-full transition-all duration-300 ${
                                                        i === active ? "w-6 bg-gson-yellow" : "w-2 bg-white/15 hover:bg-white/30"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
