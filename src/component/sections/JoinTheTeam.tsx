import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
    MessageSquare, Code2, Smartphone, Rocket, CheckCircle2,
    GitBranch, Terminal, Zap, Users, Coffee, Play, ChevronRight
} from "lucide-react"

interface Step {
    id: number
    phase: string
    title: string
    description: string
    icon: React.ReactNode
    color: string
    chat: ChatMessage[]
    code?: string
    terminal?: string[]
}

interface ChatMessage {
    from: "gelson" | "team" | "client" | "system"
    avatar: string
    name: string
    text: string
    delay: number
}

const steps: Step[] = [
    {
        id: 0,
        phase: "BRIEFING",
        title: "O cliente chega com uma ideia",
        description: "Tudo começa com uma conversa. Ouvimos, desafiamos, entendemos o problema real por detrás do pedido.",
        icon: <MessageSquare size={28} />,
        color: "#F2E30C",
        chat: [
            { from: "client", avatar: "🧑‍💼", name: "Cliente", text: "Preciso de um app para gerir encomendas. Algo simples, sabe?", delay: 0 },
            { from: "gelson", avatar: "👨‍💻", name: "Gelson (Team Lead)", text: "Entendido. Mas antes — quem vai usar o app? Os clientes finais ou a equipa interna?", delay: 800 },
            { from: "client", avatar: "🧑‍💼", name: "Cliente", text: "Hmm... ambos, na verdade. Nunca pensei nisso assim.", delay: 1600 },
            { from: "gelson", avatar: "👨‍💻", name: "Gelson (Team Lead)", text: "Isso muda tudo. Dois fluxos distintos, dois UX diferentes. Vamos mapear isto juntos 🎯", delay: 2400 },
        ],
    },
    {
        id: 1,
        phase: "ARQUITECTURA",
        title: "Desenhamos a solução antes de escrever uma linha",
        description: "Arquitectura primeiro. Definimos stack, fluxos de dados, e estrutura de BD antes de qualquer código.",
        icon: <GitBranch size={28} />,
        color: "#F2B90C",
        chat: [
            { from: "gelson", avatar: "👨‍💻", name: "Gelson", text: "Equipa, reunião de 15 min. Temos dois tipos de utilizador — precisamos de duas apps ou um sistema role-based?", delay: 0 },
            { from: "team", avatar: "🧑‍🔬", name: "Dev Backend", text: "Role-based é mais limpo. Um só JWT, permissões por scope. Django REST + PostgreSQL.", delay: 700 },
            { from: "team", avatar: "📱", name: "Dev Mobile", text: "Flutter com feature flags por role. Mantém o mesmo codebase, UI adapta.", delay: 1400 },
            { from: "gelson", avatar: "👨‍💻", name: "Gelson", text: "Perfeito. Backend cria o schema hoje, mobile começa os wireframes. Docker local para todos ✅", delay: 2100 },
        ],
        code: `# models.py — Arquitectura decidida em equipa
class User(AbstractBaseUser):
    ROLES = [('client', 'Cliente'), ('admin', 'Gestor')]
    role = models.CharField(choices=ROLES)
    
class Order(models.Model):
    client = models.ForeignKey(User, on_delete=CASCADE)
    status = models.CharField(choices=ORDER_STATUS)
    created_at = models.DateTimeField(auto_now_add=True)`,
    },
    {
        id: 2,
        phase: "DESENVOLVIMENTO",
        title: "A magia acontece aqui",
        description: "Código limpo, revisões de código, CI/CD a correr. A equipa trabalha em paralelo com comunicação constante.",
        icon: <Code2 size={28} />,
        color: "#F2E30C",
        chat: [
            { from: "team", avatar: "🧑‍🔬", name: "Dev Backend", text: "API /orders/ está up. Postman collection partilhada no Notion.", delay: 0 },
            { from: "team", avatar: "📱", name: "Dev Mobile", text: "Flutter recebendo os dados. Mas o campo 'delivery_date' vem em formato errado.", delay: 700 },
            { from: "team", avatar: "🧑‍🔬", name: "Dev Backend", text: "Fix em 2 min. ISO 8601 agora. Já fiz push.", delay: 1300 },
            { from: "team", avatar: "🚀", name: "DevOps", text: "Pipeline verde ✅ Docker build 2m14s. Staging deploy automático.", delay: 2000 },
        ],
        terminal: [
            "$ git push origin feature/order-api",
            "→ Running tests... 47 passed, 0 failed",
            "→ Docker build... success (2m14s)",
            "→ Deploying to staging... done",
            "✓ Preview: https://staging.gson.ao/orders",
        ],
    },
    {
        id: 3,
        phase: "DESIGN & UX",
        title: "A interface que converte",
        description: "Design não é decoração. Cada pixel tem propósito. Testamos com utilizadores reais antes de entregar.",
        icon: <Smartphone size={28} />,
        color: "#F2B90C",
        chat: [
            { from: "gelson", avatar: "👨‍💻", name: "Gelson", text: "Cliente viu o protótipo. Adorou o fluxo. Mas o botão de confirmar encomenda está perdido.", delay: 0 },
            { from: "team", avatar: "🎨", name: "UI/UX", text: "Já vi isso no teste. Vou mover para floating action button. Thumb zone.", delay: 700 },
            { from: "team", avatar: "📱", name: "Dev Mobile", text: "Implementado. Fiz também haptic feedback no confirm. Mais satisfação.", delay: 1500 },
            { from: "client", avatar: "🧑‍💼", name: "Cliente", text: "Isto está muito bom. Exatamente o que imaginei mas melhor 🔥", delay: 2200 },
        ],
    },
    {
        id: 4,
        phase: "LANÇAMENTO",
        title: "Deploy. Play Store. Ao vivo.",
        description: "Não entregamos e desaparecemos. Monitoramos, iteramos, e garantimos que o produto cresce com o cliente.",
        icon: <Rocket size={28} />,
        color: "#F2E30C",
        chat: [
            { from: "team", avatar: "🚀", name: "DevOps", text: "Infra pronta. Load balancer configurado. Redis cache ativo.", delay: 0 },
            { from: "team", avatar: "📱", name: "Dev Mobile", text: "APK signed. Submissão à Play Store feita. Review em ~48h.", delay: 700 },
            { from: "system", avatar: "✅", name: "Sistema", text: "APP APROVADA NA PLAY STORE — Gson Academy já disponível para download!", delay: 1500 },
            { from: "gelson", avatar: "👨‍💻", name: "Gelson", text: "Este é o resultado de uma equipa que não se contenta com 'funciona'. Exige 'excele'. 🏆", delay: 2300 },
        ],
        terminal: [
            "$ ./scripts/deploy-production.sh",
            "→ Health checks... all green",
            "→ DB migrations... applied",
            "→ CDN cache... cleared",
            "→ Monitoring alerts... configured",
            "✓ LIVE: app.gson.ao — 0ms downtime deploy",
        ],
    },
]

function ChatBubble({ msg, visible }: { msg: ChatMessage; visible: boolean }) {
    const isRight = msg.from === "gelson" || msg.from === "system"
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex items-end gap-2 mb-3 ${isRight ? "flex-row-reverse" : "flex-row"}`}
        >
            <span className="text-2xl flex-shrink-0">{msg.avatar}</span>
            <div className={`max-w-[80%] ${isRight ? "items-end" : "items-start"} flex flex-col`}>
                <span className="text-[10px] text-gson-sand/40 mb-1 px-1">{msg.name}</span>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isRight
                        ? "bg-gson-yellow text-gson-black font-medium rounded-br-sm"
                        : msg.from === "system"
                        ? "bg-green-500/20 border border-green-500/40 text-green-300 rounded-bl-sm"
                        : "bg-white/8 border border-white/10 text-gson-sand rounded-bl-sm"
                }`}>
                    {msg.text}
                </div>
            </div>
        </motion.div>
    )
}

function CodeBlock({ code }: { code: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 rounded-xl overflow-hidden border border-white/10"
        >
            <div className="bg-[#1a1a1f] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-gson-sand/40 text-xs ml-2">models.py</span>
            </div>
            <pre className="bg-[#0d0d12] p-4 text-xs text-gson-sand/80 font-mono overflow-x-auto leading-relaxed">
                {code}
            </pre>
        </motion.div>
    )
}

function TerminalBlock({ lines }: { lines: string[] }) {
    const [visibleLines, setVisibleLines] = useState(0)
    useEffect(() => {
        let i = 0
        const t = setInterval(() => {
            i++
            setVisibleLines(i)
            if (i >= lines.length) clearInterval(t)
        }, 400)
        return () => clearInterval(t)
    }, [lines.length])

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 rounded-xl overflow-hidden border border-white/10"
        >
            <div className="bg-[#0a0a0a] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <Terminal size={12} className="text-gson-yellow" />
                <span className="text-gson-sand/40 text-xs">terminal</span>
            </div>
            <div className="bg-[#050505] p-4 font-mono text-xs space-y-1">
                {lines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={line.startsWith("✓") ? "text-green-400" : line.startsWith("$") ? "text-gson-yellow" : "text-gson-sand/60"}
                    >
                        {line}
                    </motion.div>
                ))}
                {visibleLines < lines.length && (
                    <span className="text-gson-yellow animate-pulse">▊</span>
                )}
            </div>
        </motion.div>
    )
}

export default function JoinTheTeam() {
    const [activeStep, setActiveStep] = useState(0)
    const [visibleMessages, setVisibleMessages] = useState(0)
    const [started, setStarted] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const autoRef = useRef<NodeJS.Timeout | null>(null)
    const prefersReduced = useReducedMotion()

    const step = steps[activeStep]

    const runChat = useCallback((chatLength: number) => {
        setVisibleMessages(0)
        let count = 0
        const msgs = chatLength

        const scheduleNext = () => {
            if (count >= msgs) return
            const delay = prefersReduced ? 50 : steps[activeStep]?.chat[count]?.delay ?? count * 600
            timerRef.current = setTimeout(() => {
                count++
                setVisibleMessages(count)
                scheduleNext()
            }, delay + 300)
        }
        scheduleNext()
    }, [activeStep, prefersReduced])

    const goToStep = useCallback((idx: number) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setActiveStep(idx)
        setVisibleMessages(0)
        setTimeout(() => runChat(steps[idx].chat.length), 100)
    }, [runChat])

    useEffect(() => {
        if (!started) return
        runChat(step.chat.length)
        return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }, [activeStep, started]) // eslint-disable-line

    // Auto-advance
    useEffect(() => {
        if (!autoPlay) { if (autoRef.current) clearInterval(autoRef.current); return }
        autoRef.current = setInterval(() => {
            setActiveStep(prev => {
                const next = (prev + 1) % steps.length
                goToStep(next)
                return next
            })
        }, 7000)
        return () => { if (autoRef.current) clearInterval(autoRef.current) }
    }, [autoPlay, goToStep])

    return (
        <section className="relative py-32 px-[7%] border-t border-white/5 overflow-hidden">
            {/* BG glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,227,12,0.06),transparent_60%)]" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-gson-yellow uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-2">
                        <Users size={14} />
                        Junta-te à Equipa por um Momento
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        É assim que{" "}
                        <span className="text-gson-yellow">construímos</span>
                        <br />o teu produto.
                    </h2>
                    <p className="text-gson-sand/70 text-lg mt-6 max-w-2xl mx-auto">
                        Do briefing ao deploy — vê cada fase como se estivesses dentro da equipa.
                    </p>
                </motion.div>

                {/* Start screen */}
                {!started && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 gap-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gson-yellow/10 border border-gson-yellow/30 flex items-center justify-center">
                                <Coffee size={40} className="text-gson-yellow" />
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full border border-gson-yellow/20"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-white text-xl font-bold mb-2">Bem-vindo à Gson Creativity</p>
                            <p className="text-gson-sand/60 text-sm">Vai ver como transformamos ideias em produtos reais</p>
                        </div>
                        <button
                            onClick={() => { setStarted(true); setAutoPlay(true) }}
                            className="flex items-center gap-3 bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all group"
                        >
                            <Play size={18} className="group-hover:scale-110 transition-transform" />
                            Começar a Experiência
                        </button>
                        <p className="text-gson-sand/30 text-xs">Duração: ~40 segundos</p>
                    </motion.div>
                )}

                {/* Main experience */}
                {started && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Step nav — left column */}
                        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                            {steps.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setAutoPlay(false); goToStep(i) }}
                                    className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left w-full ${
                                        activeStep === i
                                            ? "bg-gson-yellow/10 border-gson-yellow/50 text-gson-yellow"
                                            : "border-white/8 text-gson-sand/50 hover:border-white/20 hover:text-gson-sand"
                                    }`}
                                >
                                    <span className={`transition-colors ${activeStep === i ? "text-gson-yellow" : "text-gson-sand/30"}`}>
                                        {activeStep > i ? <CheckCircle2 size={18} /> : s.icon}
                                    </span>
                                    <div className="hidden lg:block">
                                        <p className="text-[10px] uppercase tracking-widest opacity-60">{s.phase}</p>
                                        <p className="text-xs font-bold leading-tight mt-0.5">{s.title.split(" ").slice(0, 4).join(" ")}...</p>
                                    </div>
                                    <span className="lg:hidden text-xs font-bold">{s.phase}</span>
                                </button>
                            ))}

                            {/* Auto-play toggle */}
                            <button
                                onClick={() => setAutoPlay(p => !p)}
                                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-xs transition-all ${
                                    autoPlay ? "border-gson-yellow/40 text-gson-yellow bg-gson-yellow/5" : "border-white/10 text-gson-sand/40"
                                }`}
                            >
                                <Zap size={12} />
                                <span className="hidden lg:inline">{autoPlay ? "Auto ON" : "Auto OFF"}</span>
                            </button>
                        </div>

                        {/* Main panel */}
                        <div className="lg:col-span-9">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="card-glass rounded-2xl border border-white/10 overflow-hidden"
                                >
                                    {/* Panel header */}
                                    <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
                                        <span style={{ color: step.color }}>
                                            {step.icon}
                                        </span>
                                        <div>
                                            <p className="text-[11px] uppercase tracking-widest" style={{ color: step.color }}>
                                                Fase {step.id + 1}/{steps.length} — {step.phase}
                                            </p>
                                            <h3 className="text-white font-bold text-lg">{step.title}</h3>
                                        </div>
                                        <div className="ml-auto flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-gson-sand/70 text-sm mb-6 leading-relaxed">{step.description}</p>

                                        {/* Chat window */}
                                        <div className="bg-[#0a0a0f] rounded-xl border border-white/8 p-4 min-h-[200px] max-h-[260px] overflow-y-auto">
                                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/8">
                                                <MessageSquare size={12} className="text-gson-yellow" />
                                                <span className="text-gson-sand/40 text-[10px] uppercase tracking-widest">Gson Team Chat</span>
                                                <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            </div>
                                            {step.chat.map((msg, i) => (
                                                <ChatBubble key={i} msg={msg} visible={i < visibleMessages} />
                                            ))}
                                            {visibleMessages < step.chat.length && (
                                                <div className="flex items-center gap-1 mt-2 ml-8">
                                                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-1.5 rounded-full bg-gson-sand/40" />
                                                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gson-sand/40" />
                                                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gson-sand/40" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Code / Terminal */}
                                        {step.code && <CodeBlock code={step.code} />}
                                        {step.terminal && <TerminalBlock lines={step.terminal} />}

                                        {/* Progress & next */}
                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="flex gap-1.5">
                                                {steps.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 rounded-full transition-all duration-500 ${
                                                            i === activeStep ? "w-8 bg-gson-yellow" : i < activeStep ? "w-4 bg-gson-yellow/40" : "w-4 bg-white/10"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            {activeStep < steps.length - 1 && (
                                                <button
                                                    onClick={() => { setAutoPlay(false); goToStep(activeStep + 1) }}
                                                    className="flex items-center gap-2 text-gson-yellow text-sm font-bold hover:gap-3 transition-all"
                                                >
                                                    Próxima fase <ChevronRight size={16} />
                                                </button>
                                            )}
                                            {activeStep === steps.length - 1 && (
                                                <button
                                                    onClick={() => { setAutoPlay(false); goToStep(0) }}
                                                    className="flex items-center gap-2 text-gson-yellow text-sm font-bold hover:gap-3 transition-all"
                                                >
                                                    Recomeçar <ChevronRight size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* CTA after experience */}
                {started && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <p className="text-gson-sand/60 text-sm mb-6">
                            Pronto para ter esta equipa a trabalhar no teu projecto?
                        </p>
                        <a
                            href="/contato"
                            className="inline-flex items-center gap-3 bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all"
                        >
                            Arrancar o Projecto <Rocket size={18} />
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
