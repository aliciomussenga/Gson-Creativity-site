import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import {
    DoorOpen, Coffee, Code2, Users, Rocket, ArrowRight,
    MapPin, Clock,
    ChevronLeft, ChevronRight, Zap, Award, MessageSquare,
    Play
} from "lucide-react"
import { Link } from "react-router-dom"

// ─── Types ──────────────────────────────────────────────────────────────────
interface Room {
    id: string
    name: string
    emoji: string
    icon: React.ReactNode
    tagline: string
    accentColor: string
    bgGradient: string
    bgImage: string
    floorLabel: string
    ambientItems: AmbientItem[]
    interactables: Interactable[]
    guide: GuideMessage[]
    exitLine: string
}

interface AmbientItem {
    id: string
    emoji: string
    label: string
    x: number
    y: number
    size?: "sm" | "md" | "lg"
    pulse?: boolean
    glow?: boolean
}

interface Interactable {
    id: string
    emoji: string
    label: string
    action: string
    response: string
    x: number
    y: number
}

interface GuideMessage {
    text: string
    delay: number
}

// ─── Data ────────────────────────────────────────────────────────────────────
const rooms: Room[] = [
    {
        id: "reception",
        name: "Recepção",
        emoji: "🚪",
        icon: <DoorOpen size={20} />,
        tagline: "Bem-vindo à Gson Creativity",
        accentColor: "#F2E30C",
        bgGradient: "from-[#0d0d0d] via-[#111108] to-[#0d0d0d]",
        bgImage: "/room-reception.png",
        floorLabel: "Entrada — Piso 1",
        ambientItems: [
            { id: "logo", emoji: "⚡", label: "Logo Gson", x: 50, y: 30, size: "lg", glow: true },
            { id: "plant", emoji: "🌿", label: "Planta tropical", x: 10, y: 65, size: "md" },
            { id: "plant2", emoji: "🌱", label: "Planta", x: 82, y: 70, size: "sm" },
            { id: "screen", emoji: "📺", label: "Ecrã de boas-vindas", x: 50, y: 60, size: "lg", pulse: true },
            { id: "chair", emoji: "🪑", label: "Cadeira de espera", x: 20, y: 80, size: "sm" },
            { id: "chair2", emoji: "🪑", label: "Cadeira de espera", x: 75, y: 80, size: "sm" },
        ],
        interactables: [
            { id: "bell", emoji: "🔔", label: "Campainha", action: "Tocar campainha", response: "Ding dong! A recepcionista acena e diz: 'Olá! Bem-vindo à Gson Creativity. Podem começar o tour!' 🎉", x: 70, y: 45 },
            { id: "brochure", emoji: "📋", label: "Portfólio impresso", action: "Pegar portfólio", response: "O portfólio tem +50 projectos entregues. Apps mobile, sistemas backend, plataformas ERP. Cada página cheira a café e código limpo. ☕", x: 30, y: 55 },
            { id: "wifi", emoji: "📶", label: "WiFi da Gson", action: "Conectar ao WiFi", response: "Senha: GsonCreativity2024! 🔐 Fibra de 1Gbps — a equipa não tolera lag nem no código nem na net.", x: 85, y: 35 },
        ],
        guide: [
            { text: "Olá! Sou o Gelson, fundador da Gson Creativity. Bem-vindo ao nosso escritório em Luanda! 🇦🇴", delay: 0 },
            { text: "Hoje fazes um tour completo — vês como trabalhamos, conheces a equipa e descobres o que nos torna diferentes.", delay: 3500 },
            { text: "Podes explorar cada sala. Clica nos objectos para descobrir mais. Pronto para começar? 👇", delay: 7000 },
        ],
        exitLine: "Segue-me para a nossa Sala de Brainstorming →",
    },
    {
        id: "brainstorm",
        name: "Sala de Brainstorming",
        emoji: "💡",
        icon: <Coffee size={20} />,
        tagline: "Onde as ideias ganham forma",
        accentColor: "#F2B90C",
        bgGradient: "from-[#0d0d0d] via-[#0f0d08] to-[#0d0d0d]",
        bgImage: "/room-brainstorm.png",
        floorLabel: "Criatividade — Piso 1",
        ambientItems: [
            { id: "whiteboard", emoji: "📝", label: "Quadro branco", x: 50, y: 25, size: "lg", glow: true },
            { id: "coffee", emoji: "☕", label: "Café angolano", x: 15, y: 55, size: "md", pulse: true },
            { id: "postit1", emoji: "🟨", label: "Post-it de ideia", x: 30, y: 40, size: "sm" },
            { id: "postit2", emoji: "🟧", label: "Post-it urgente", x: 45, y: 38, size: "sm" },
            { id: "postit3", emoji: "🟩", label: "Post-it confirmado", x: 60, y: 42, size: "sm" },
            { id: "lamp", emoji: "💡", label: "Lâmpada de ideias", x: 80, y: 30, size: "md", pulse: true },
            { id: "book", emoji: "📚", label: "Biblioteca técnica", x: 85, y: 65, size: "sm" },
        ],
        interactables: [
            { id: "whiteboard_i", emoji: "✏️", label: "Escrever no quadro", action: "Escrever no quadro", response: "No quadro está escrito: 'O PROBLEMA DO CLIENTE → A NOSSA SOLUÇÃO → O IMPACTO NO MERCADO'. Esta é a fórmula que usamos em cada projecto. 🎯", x: 50, y: 20 },
            { id: "coffee_i", emoji: "☕", label: "Beber café", action: "Tomar café angolano", response: "O café de Angola é de outro nível. A equipa bebe em média 4 chávenas por sessão de brainstorming. Diz-se que as melhores ideias nascem na 3ª chávena. ✨", x: 15, y: 50 },
            { id: "postit_i", emoji: "🗂️", label: "Ler os post-its", action: "Ler post-its", response: "Amarelo: 'App para gestão de frotas — Angola tem 2M de viaturas não rastreadas!' 🚗 Laranja: 'Integrar M-Pesa no nosso gateway!' 💳 Verde: 'Cliente KzEduca aprovou o design V3!' ✅", x: 45, y: 35 },
        ],
        guide: [
            { text: "Aqui é onde tudo começa. Antes de escrever uma linha de código, passamos horas a entender o problema real.", delay: 0 },
            { text: "O nosso processo: Imersão → Estratégia → Execução. Nunca saltamos etapas.", delay: 3500 },
            { text: "Vês esses post-its? São ideias de projectos futuros. O mercado africano tem oportunidades imensas ainda por explorar. 🌍", delay: 7000 },
        ],
        exitLine: "Agora vê onde o código acontece →",
    },
    {
        id: "dev",
        name: "Estúdio de Dev",
        emoji: "💻",
        icon: <Code2 size={20} />,
        tagline: "Código limpo. Sistemas que escalam.",
        accentColor: "#F2E30C",
        bgGradient: "from-[#0d0d0d] via-[#080d0d] to-[#0d0d0d]",
        bgImage: "/room-dev.png",
        floorLabel: "Desenvolvimento — Piso 2",
        ambientItems: [
            { id: "monitors", emoji: "🖥️", label: "Setup triplo", x: 50, y: 25, size: "lg", glow: true },
            { id: "keyboard", emoji: "⌨️", label: "Teclado mecânico", x: 35, y: 55, size: "md" },
            { id: "coffee2", emoji: "☕", label: "Segundo café", x: 70, y: 55, size: "sm", pulse: true },
            { id: "docker", emoji: "🐳", label: "Docker a correr", x: 15, y: 40, size: "sm", pulse: true },
            { id: "github", emoji: "🐙", label: "GitHub aberto", x: 80, y: 40, size: "sm" },
            { id: "headphone", emoji: "🎧", label: "Headphones lofi", x: 20, y: 70, size: "sm" },
            { id: "sticky", emoji: "📌", label: "TODO list", x: 75, y: 70, size: "sm" },
        ],
        interactables: [
            { id: "screen", emoji: "👁️", label: "Ver ecrã do dev", action: "Ver o código no ecrã", response: "No ecrã: um terminal com Docker a fazer build, VS Code com Python aberto, e o Postman a testar uma API de pagamentos. Commit message: 'feat: add M-Pesa integration 🚀'. 100% de testes a passar. ✅", x: 50, y: 20 },
            { id: "pipeline", emoji: "⚙️", label: "Ver pipeline CI/CD", action: "Ver o pipeline de CI/CD", response: "GitHub Actions: build ✅ → testes 47/47 ✅ → Docker build 2m14s ✅ → deploy staging ✅. Zero downtime. O DevOps sorri. 😎", x: 15, y: 35 },
            { id: "stack", emoji: "📦", label: "Stack tecnológico", action: "Ver o stack completo", response: "Backend: Python + Django REST. DB: PostgreSQL + Redis. Mobile: Flutter. DevOps: Docker + K8s + AWS. Monitorização: Grafana + Prometheus. É disso que são feitos os produtos que duram. 💪", x: 80, y: 35 },
        ],
        guide: [
            { text: "Bem-vindo ao coração da Gson. Aqui é onde a magia acontece — literalmente a qualquer hora do dia.", delay: 0 },
            { text: "A nossa regra sagrada: código sem testes não existe. 100% de cobertura em features críticas, sempre.", delay: 4000 },
            { text: "Vês o pipeline? Deploy automático a cada commit na main. Zero stress, zero downtime. É assim que trabalhamos. 🔥", delay: 8000 },
        ],
        exitLine: "Segue para a Sala de Reuniões →",
    },
    {
        id: "meeting",
        name: "Sala de Reuniões",
        emoji: "🤝",
        icon: <Users size={20} />,
        tagline: "Onde alinhamos visões com clientes",
        accentColor: "#F2B90C",
        bgGradient: "from-[#0d0d0d] via-[#0d0a0f] to-[#0d0d0d]",
        bgImage: "/room-meeting.png",
        floorLabel: "Clientes — Piso 2",
        ambientItems: [
            { id: "table", emoji: "🪵", label: "Mesa de reuniões", x: 50, y: 50, size: "lg" },
            { id: "projector", emoji: "📽️", label: "Projector 4K", x: 50, y: 20, size: "lg", pulse: true },
            { id: "chairs", emoji: "🪑", label: "6 cadeiras", x: 25, y: 60, size: "sm" },
            { id: "chairs2", emoji: "🪑", label: "6 cadeiras", x: 75, y: 60, size: "sm" },
            { id: "water", emoji: "💧", label: "Água e sumos", x: 15, y: 45, size: "sm" },
            { id: "flag", emoji: "🇦🇴", label: "Bandeira Angola", x: 85, y: 30, size: "sm" },
            { id: "screen2", emoji: "📊", label: "Dashboard de métricas", x: 50, y: 35, size: "md", glow: true },
        ],
        interactables: [
            { id: "dashboard", emoji: "📈", label: "Ver dashboard do cliente", action: "Ver o dashboard", response: "No projector: dashboard de um cliente de e-commerce. Conversão subiu de 1.2% para 3.8% após o redesign. Revenue +217% em 3 meses. O cliente vem agradecer pessoalmente. 📈", x: 50, y: 15 },
            { id: "proposal", emoji: "📄", label: "Ler proposta em cima da mesa", action: "Ler a proposta", response: "Proposta para 'Sistema de Gestão de Encomendas — TomaTech Lda'. Inclui: arquitectura técnica, wireframes, cronograma de 8 semanas, e suporte pós-lançamento. Preço competitivo, valor real. 💼", x: 30, y: 55 },
            { id: "feedback", emoji: "⭐", label: "Ver feedback de clientes", action: "Ler feedback dos clientes", response: "'A Gson entregou antes do prazo e acima do esperado.' — CEO KzEduca | 'Aumentou as nossas vendas online em 300%.' — Director Nany App | 'Equipa profissional, comunicação excelente.' — CTO TechLuanda ⭐⭐⭐⭐⭐", x: 80, y: 45 },
        ],
        guide: [
            { text: "Esta sala é onde construímos confiança. Cada reunião aqui começa com uma pergunta: 'O que é sucesso para si, cliente?'", delay: 0 },
            { text: "Não vendemos tecnologia. Vendemos resultados. Conversão, receita, eficiência — métricas que o teu negócio realmente precisa.", delay: 4500 },
            { text: "Temos clientes que começaram com uma landing page e hoje têm sistemas completos. É uma parceria de longo prazo. 🤝", delay: 9000 },
        ],
        exitLine: "Último paragem — o nosso Rooftop! →",
    },
    {
        id: "rooftop",
        name: "Rooftop — Vista de Luanda",
        emoji: "🌅",
        icon: <Rocket size={20} />,
        tagline: "Angola como ponto de partida para o mundo",
        accentColor: "#F2E30C",
        bgGradient: "from-[#080810] via-[#0d0d0d] to-[#0a0808]",
        bgImage: "/room-rooftop.png",
        floorLabel: "Rooftop — Piso 4",
        ambientItems: [
            { id: "skyline", emoji: "🌇", label: "Skyline de Luanda", x: 50, y: 30, size: "lg", glow: true },
            { id: "stars", emoji: "✨", label: "Estrelas", x: 20, y: 15, size: "sm", pulse: true },
            { id: "stars2", emoji: "✨", label: "Estrelas", x: 75, y: 12, size: "sm", pulse: true },
            { id: "stars3", emoji: "⭐", label: "Estrela brilhante", x: 90, y: 20, size: "sm", pulse: true },
            { id: "telescope", emoji: "🔭", label: "Telescópio", x: 80, y: 55, size: "md" },
            { id: "phone", emoji: "📱", label: "Gson Academy no ar", x: 20, y: 60, size: "md", pulse: true },
            { id: "flag2", emoji: "🚩", label: "Gson Creativity", x: 50, y: 55, size: "sm", glow: true },
        ],
        interactables: [
            { id: "telescope_i", emoji: "🔭", label: "Olhar pelo telescópio", action: "Olhar pelo telescópio", response: "Vês o porto de Luanda, os edifícios de vidro da Zona Especial, e mais longe... o resto de África. O Gelson costuma dizer: 'Construímos aqui, mas pensamos no continente inteiro.' 🌍", x: 80, y: 50 },
            { id: "phone_i", emoji: "📱", label: "Ver a Gson Academy", action: "Ver a app Gson Academy", response: "A Gson Academy já está na Play Store! +80 alunos activos, 450+ horas de conteúdo em áudio, 4 trilhas de carreira. Em breve: App Store. É o orgulho da equipa! 🎓", x: 20, y: 55 },
            { id: "vision", emoji: "🗺️", label: "Ver o mapa estratégico", action: "Ver o mapa estratégico", response: "No mapa: Angola (base) → PALOP → África Subsariana → Diáspora. Cada círculo representa um mercado que a Gson vai servir nos próximos 3 anos. O plano está a ser executado. 📍", x: 50, y: 50 },
        ],
        guide: [
            { text: "Chegámos ao topo. Literalmente e figurativamente. Aqui é onde a equipa vem quando precisa de perspectiva.", delay: 0 },
            { text: "Angola tem um potencial enorme. +35 milhões de pessoas, economia em digitalização acelerada. Estamos no lugar certo, na hora certa.", delay: 4500 },
            { text: "Obrigado pela visita. Agora já sabes como trabalhamos, quem somos, e o que valorizamos. Que tal construirmos algo juntos? 🚀", delay: 9000 },
        ],
        exitLine: "Vamos construir algo juntos?",
    },
]

// ─── Sub-components ──────────────────────────────────────────────────────────
function GuideAvatar({ speaking }: { speaking: boolean }) {
    return (
        <div className="relative flex-shrink-0">
            <div className={`w-11 h-11 rounded-full bg-gson-yellow border-2 ${speaking ? "border-gson-yellow" : "border-white/20"} flex items-center justify-center text-gson-black font-black text-base transition-all`}>
                G
            </div>
            {speaking && (
                <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border-2 border-gson-yellow"
                />
            )}
        </div>
    )
}

function TypingBubble({ text, onDone }: { text: string; onDone?: () => void }) {
    const [displayed, setDisplayed] = useState("")
    const [done, setDone] = useState(false)
    const idx = useRef(0)

    useEffect(() => {
        setDisplayed("")
        setDone(false)
        idx.current = 0
        const t = setInterval(() => {
            if (idx.current < text.length) {
                setDisplayed(text.slice(0, idx.current + 1))
                idx.current++
            } else {
                clearInterval(t)
                setDone(true)
                onDone?.()
            }
        }, 22)
        return () => clearInterval(t)
    }, [text]) // eslint-disable-line

    return (
        <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gson-sand leading-relaxed max-w-xs">
            {displayed}
            {!done && <span className="text-gson-yellow animate-pulse ml-0.5">▊</span>}
        </div>
    )
}

function AmbientObject({ item }: { item: AmbientItem }) {
    const sizePx = item.size === "lg" ? 52 : item.size === "sm" ? 24 : 36

    return (
        <motion.div
            className="absolute select-none pointer-events-none z-[2]"
            style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%,-50%)",
                fontSize: sizePx,
                lineHeight: 1,
                userSelect: "none",
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.random() * 0.6, type: "spring", stiffness: 180, damping: 14 }}
            title={item.label}
        >
            {item.emoji}
            {item.pulse && (
                <motion.span
                    animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="absolute inset-0 rounded-full bg-gson-yellow/15 pointer-events-none"
                    style={{ display: "block" }}
                />
            )}
            {item.glow && (
                <span
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        inset: "-8px",
                        background: "radial-gradient(circle, rgba(242,227,12,0.25) 0%, transparent 70%)",
                        filter: "blur(8px)",
                        zIndex: -1,
                        display: "block",
                    }}
                />
            )}
        </motion.div>
    )
}

function InteractableButton({ item, onInteract }: { item: Interactable; onInteract: (r: string) => void }) {
    return (
        <motion.button
            className="absolute"
            style={{ left: `${item.x}%`, top: `${item.y}%`, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + Math.random() * 0.4, type: "spring" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onInteract(item.response)}
        >
            <div className="relative group">
                <div className="rounded-full bg-gson-black/70 border-2 border-gson-yellow/60 backdrop-blur-md flex items-center justify-center hover:bg-gson-yellow/20 hover:border-gson-yellow transition-all shadow-lg shadow-black/50" style={{ width: 52, height: 52, fontSize: 22 }}>
                    {item.emoji}
                </div>
                {/* Tooltip */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gson-black border border-gson-yellow/30 text-gson-yellow text-[10px] uppercase tracking-widest px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.action}
                </div>
                {/* Ping */}
                <motion.span
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="absolute inset-0 rounded-full border-2 border-gson-yellow/50"
                />
            </div>
        </motion.button>
    )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function OfficeTour() {
    const [started, setStarted] = useState(false)
    const [roomIdx, setRoomIdx] = useState(0)
    const [guideStep, setGuideStep] = useState(0)
    const [interactionMsg, setInteractionMsg] = useState<string | null>(null)
    const [interactionHistory, setInteractionHistory] = useState<string[]>([])
    const [visitedRooms, setVisitedRooms] = useState<Set<number>>(new Set([0]))
    const guideTimers = useRef<NodeJS.Timeout[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    const room = rooms[roomIdx]

    const clearGuideTimers = useCallback(() => {
        guideTimers.current.forEach(clearTimeout)
        guideTimers.current = []
    }, [])

    const startGuide = useCallback((messages: typeof room.guide) => {
        clearGuideTimers()
        setGuideStep(0)
        messages.forEach((msg, i) => {
            if (i === 0) return
            const t = setTimeout(() => setGuideStep(i), msg.delay)
            guideTimers.current.push(t)
        })
    }, [clearGuideTimers])

    const goToRoom = useCallback((idx: number) => {
        setRoomIdx(idx)
        setInteractionMsg(null)
        setVisitedRooms(prev => new Set([...prev, idx]))
        startGuide(rooms[idx].guide)
    }, [startGuide])

    useEffect(() => {
        if (started) startGuide(room.guide)
        return clearGuideTimers
    }, [started]) // eslint-disable-line

    const handleInteract = (response: string) => {
        setInteractionMsg(response)
        setInteractionHistory(prev => [response, ...prev].slice(0, 5))
        if (scrollRef.current) {
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
        }
    }

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const bgShiftX = useTransform(mouseX, [-1, 1], ["-1%", "1%"])
    const bgShiftY = useTransform(mouseY, [-1, 1], ["-1%", "1%"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        mouseX.set(((e.clientX - left) / width - 0.5) * 2)
        mouseY.set(((e.clientY - top) / height - 0.5) * 2)
    }

    return (
        <section className="relative py-24 px-[7%] border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_50%,rgba(242,227,12,0.04),transparent_60%)]" />

            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-gson-yellow uppercase tracking-widest text-sm mb-4 flex items-center justify-center gap-2">
                        <MapPin size={14} />
                        Tour Virtual — Gson Creativity, Luanda
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Entra no nosso{" "}
                        <span className="text-gson-yellow">escritório.</span>
                    </h2>
                    <p className="text-gson-sand/60 text-lg mt-4 max-w-xl mx-auto">
                        Visita cada divisão, explora, interage com o que encontras. É assim que trabalhamos de verdade.
                    </p>
                </motion.div>

                {/* Start screen */}
                {!started && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-8 py-16"
                    >
                        {/* Office door */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="relative"
                        >
                            <div className="w-40 h-56 rounded-t-[80px] bg-gradient-to-b from-[#1a1508] to-[#0d0d0d] border-2 border-gson-yellow/30 flex flex-col items-center justify-center gap-3 cursor-pointer relative overflow-hidden"
                                onClick={() => setStarted(true)}
                            >
                                {/* Door shine */}
                                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-gson-yellow/5 to-transparent" />
                                <span className="text-5xl">🚪</span>
                                <div className="w-2 h-2 rounded-full bg-gson-yellow/60 absolute right-6 top-1/2" />
                            </div>
                            {/* Glow */}
                            <div className="absolute -inset-4 bg-gson-yellow/5 rounded-full blur-2xl -z-10" />
                            {/* Sign */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gson-yellow text-gson-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md whitespace-nowrap">
                                Gson Creativity
                            </div>
                        </motion.div>

                        <div className="text-center">
                            <p className="text-white font-bold text-lg mb-1">Pronto para entrar?</p>
                            <p className="text-gson-sand/50 text-sm">5 divisões · ~3 min de tour · 100% interactivo</p>
                        </div>

                        <button
                            onClick={() => setStarted(true)}
                            className="flex items-center gap-3 bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-gson-gold transition-all group text-sm"
                        >
                            <DoorOpen size={18} />
                            Entrar no escritório
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {/* Tour experience */}
                {started && (
                    <div className="space-y-4">
                        {/* Room map strip */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {rooms.map((r, i) => (
                                <button
                                    key={r.id}
                                    onClick={() => goToRoom(i)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                                        i === roomIdx
                                            ? "bg-gson-yellow/10 border-gson-yellow/50 text-gson-yellow"
                                            : visitedRooms.has(i)
                                            ? "border-white/20 text-gson-sand/70 hover:border-white/40"
                                            : "border-white/8 text-gson-sand/30 hover:border-white/20"
                                    }`}
                                >
                                    <span>{r.emoji}</span>
                                    <span className="hidden sm:inline">{r.name}</span>
                                    {visitedRooms.has(i) && i !== roomIdx && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-gson-yellow/60" />
                                    )}
                                </button>
                            ))}
                            <div className="ml-auto flex-shrink-0">
                                <span className="text-gson-sand/30 text-xs">{roomIdx + 1}/{rooms.length}</span>
                            </div>
                        </div>

                        {/* Main room */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                onMouseMove={handleMouseMove}
                                className="relative rounded-2xl border border-white/10"
                                style={{ height: "420px", overflow: "hidden" }}
                            >
                                {/* Room background image */}
                                <motion.div
                                    style={{ x: bgShiftX, y: bgShiftY }}
                                    className="absolute inset-0 scale-110"
                                >
                                    {/* Room illustration */}
                                    <img
                                        src={room.bgImage}
                                        alt={room.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{ opacity: 0.55 }}
                                    />
                                    {/* Dark overlay so text/emojis stay readable */}
                                    <div className="absolute inset-0 bg-gson-black/55" />
                                    {/* Bottom vignette for labels */}
                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gson-black/80 to-transparent" />
                                    {/* Top vignette for floor label */}
                                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gson-black/70 to-transparent" />
                                </motion.div>

                                {/* Floor label */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 z-10 bg-gson-black/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
                                    <span className="text-2xl">{room.emoji}</span>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest" style={{ color: room.accentColor }}>{room.floorLabel}</p>
                                        <p className="text-white font-black text-sm">{room.name}</p>
                                    </div>
                                </div>

                                {/* Ambient objects */}
                                {room.ambientItems.map(item => (
                                    <AmbientObject key={item.id} item={item} />
                                ))}

                                {/* Interactable buttons */}
                                {room.interactables.map(item => (
                                    <InteractableButton key={item.id} item={item} onInteract={handleInteract} />
                                ))}

                                {/* Hint */}
                                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-gson-sand/30 text-[10px]">
                                    <Zap size={10} />
                                    <span>Clica nos objectos para interagir</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Guide + Interaction panel */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Guide speech */}
                            <div className="card-glass rounded-2xl border border-white/8 p-5">
                                <div className="flex items-start gap-3">
                                    <GuideAvatar speaking={true} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="text-white text-xs font-bold">Gelson</p>
                                            <span className="text-gson-yellow text-[9px] uppercase tracking-widest border border-gson-yellow/30 px-1.5 py-0.5 rounded">Guia</span>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`${room.id}-${guideStep}`}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <TypingBubble text={room.guide[guideStep]?.text ?? ""} />
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Guide step dots */}
                                        <div className="flex gap-1 mt-3">
                                            {room.guide.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setGuideStep(i)}
                                                    className={`h-1 rounded-full transition-all ${i === guideStep ? "w-5 bg-gson-yellow" : i < guideStep ? "w-2 bg-gson-yellow/40" : "w-2 bg-white/15"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interaction log */}
                            <div className="card-glass rounded-2xl border border-white/8 p-5">
                                <p className="text-[10px] uppercase tracking-widest text-gson-sand/40 mb-3 flex items-center gap-2">
                                    <MessageSquare size={10} />
                                    O que descobriste
                                </p>
                                {interactionMsg ? (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={interactionMsg.slice(0, 20)}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-gson-sand text-sm leading-relaxed"
                                            ref={scrollRef}
                                        >
                                            {interactionMsg}
                                        </motion.div>
                                    </AnimatePresence>
                                ) : (
                                    <p className="text-gson-sand/30 text-sm">
                                        Clica num dos objectos brilhantes na sala para descobrir mais sobre a Gson Creativity...
                                    </p>
                                )}

                                {interactionHistory.length > 1 && (
                                    <div className="mt-3 pt-3 border-t border-white/8">
                                        <p className="text-[9px] uppercase tracking-widest text-gson-sand/30 mb-2">Histórico</p>
                                        <div className="space-y-1">
                                            {interactionHistory.slice(1, 3).map((h, i) => (
                                                <p key={i} className="text-gson-sand/30 text-xs truncate">{h.slice(0, 60)}...</p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between pt-2">
                            <button
                                onClick={() => goToRoom(Math.max(0, roomIdx - 1))}
                                disabled={roomIdx === 0}
                                className="flex items-center gap-2 text-gson-sand/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
                            >
                                <ChevronLeft size={16} />
                                Sala anterior
                            </button>

                            <div className="flex items-center gap-2 text-gson-sand/30 text-xs">
                                <Clock size={12} />
                                <span>{room.floorLabel}</span>
                            </div>

                            {roomIdx < rooms.length - 1 ? (
                                <button
                                    onClick={() => goToRoom(roomIdx + 1)}
                                    className="flex items-center gap-2 text-gson-yellow hover:text-gson-gold font-bold text-sm transition-colors group"
                                >
                                    {room.exitLine.replace("→", "")}
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <Link
                                    to="/contato"
                                    className="flex items-center gap-2 bg-gson-yellow text-gson-black px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gson-gold transition-all group"
                                >
                                    Arrancar projecto
                                    <Rocket size={14} className="group-hover:translate-y-[-2px] transition-transform" />
                                </Link>
                            )}
                        </div>

                        {/* Final CTA after all rooms visited */}
                        {visitedRooms.size === rooms.length && roomIdx === rooms.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="card-glass rounded-2xl border border-gson-yellow/20 p-6 text-center"
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Award size={20} className="text-gson-yellow" />
                                    <p className="text-gson-yellow text-sm font-black uppercase tracking-widest">Tour Completo!</p>
                                </div>
                                <p className="text-gson-sand/70 text-sm mb-5">
                                    Visitaste todas as divisões da Gson Creativity. Agora já sabes como pensamos, como codamos e como entregamos.
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Link
                                        to="/contato"
                                        className="bg-gson-yellow text-gson-black px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gson-gold transition-all flex items-center gap-2"
                                    >
                                        Iniciar o meu projecto <Rocket size={14} />
                                    </Link>
                                    <button
                                        onClick={() => { setRoomIdx(0); setVisitedRooms(new Set([0])); startGuide(rooms[0].guide); setInteractionMsg(null); setInteractionHistory([]) }}
                                        className="border border-white/20 text-gson-sand px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:border-white/40 transition-all flex items-center gap-2"
                                    >
                                        <Play size={14} /> Repetir tour
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
