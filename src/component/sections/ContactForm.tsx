import { useState, useRef } from "react"
import { Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react"
import InputField from "../InputField"

const services = [
    "Desenvolvimento de App Mobile",
    "Desenvolvimento Web / Landing Page",
    "Sistema Backend / API",
    "ERP / Odoo Customização",
    "DevOps / Infraestrutura",
    "Branding & Design",
    "Gson Academy",
    "Consultoria",
    "Outro",
]

const budgets = [
    "Menos de $500",
    "$500 – $1.500",
    "$1.500 – $5.000",
    "$5.000 – $15.000",
    "Acima de $15.000",
    "Ainda a definir",
]

const timelines = [
    "Urgente (menos de 2 semanas)",
    "1 mês",
    "2 – 3 meses",
    "3 – 6 meses",
    "Sem prazo definido",
]

const faqs = [
    {
        q: "Trabalham com startups sem capital inicial?",
        a: "Sim. Temos planos adaptados a diferentes estágios. O mais importante é a ideia e o comprometimento.",
    },
    {
        q: "Quanto tempo demora um projecto típico?",
        a: "Depende da complexidade. Uma landing page pode ficar pronta em 1–2 semanas. Um app mobile completo leva entre 2 e 4 meses.",
    },
    {
        q: "Trabalham apenas em Angola?",
        a: "Não. Trabalhamos remotamente com clientes de toda a África, Portugal e Brasil.",
    },
    {
        q: "O que acontece depois que eu enviar o formulário?",
        a: "Vamos analisar a tua mensagem e responder pelo contacto indicado. Se fizer sentido, marcamos uma conversa de alinhamento.",
    },
]

function NativeSelect({ label, name, options, placeholder }: { label: string; name: string; options: string[]; placeholder: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-gson-sand/70 text-sm font-medium">{label}</label>
            <div className="relative">
                <select
                    name={name}
                    defaultValue=""
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-gson-sand appearance-none focus:outline-none focus:border-gson-yellow/50 focus:bg-white/8 transition-all pr-10 text-sm"
                >
                    <option value="" disabled className="bg-[#0d0d0d] text-gson-sand/50">{placeholder}</option>
                    {options.map(o => (
                        <option key={o} value={o} className="bg-[#0d0d0d] text-gson-sand">{o}</option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gson-sand/40 pointer-events-none" />
            </div>
        </div>
    )
}

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-white/8 last:border-0">
            <button
                onClick={() => setOpen(p => !p)}
                className="w-full text-left py-4 flex items-center justify-between gap-3 text-white hover:text-gson-yellow transition-colors"
            >
                <span className="text-sm font-medium leading-snug">{q}</span>
                <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-gson-sand/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <p className="text-gson-sand/60 text-sm pb-4 leading-relaxed -mt-1">{a}</p>
            )}
        </div>
    )
}

export default function ContactForm() {
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE")
    const [briefProgress, setBriefProgress] = useState(0)
    const formRef = useRef<HTMLFormElement>(null)

    const updateBriefProgress = () => {
        const data = new FormData(formRef.current!)
        const fields = ["nome", "email", "servico", "mensagem"]
        setBriefProgress(Math.round(fields.filter((field) => String(data.get(field) ?? "").trim()).length / fields.length * 100))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("SENDING")
        const formData = new FormData(formRef.current!)
        try {
            const response = await fetch("https://formspree.io/f/xreegqeo", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            })
            if (response.ok) {
                setStatus("SUCCESS")
                formRef.current?.reset()
            } else {
                setStatus("ERROR")
            }
        } catch {
            setStatus("ERROR")
        }
    }

    if (status === "SUCCESS") {
        return (
            <div className="bg-white/[0.03] p-12 rounded-[40px] border border-gson-yellow/30 text-center flex flex-col items-center justify-center min-h-[500px]">
                <CheckCircle size={64} className="text-gson-yellow mb-6" />
                <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Mensagem Enviada!</h2>
                <p className="text-gson-sand/60 text-sm mt-3 mb-8 max-w-xs leading-relaxed">
                    Vamos analisar a tua mensagem e responder pelo contacto indicado.
                </p>
                <button
                    onClick={() => setStatus("IDLE")}
                    className="text-gson-yellow underline italic text-sm hover:text-gson-gold transition-colors"
                >
                    Enviar outra mensagem
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Form card */}
            <div className="bg-white/[0.03] p-8 md:p-10 rounded-[32px] border border-white/8 backdrop-blur-md">
                <div className="mb-8">
                    <h2 className="text-white text-2xl font-black mb-1">Conta-nos sobre o projecto</h2>
                    <p className="text-gson-sand/50 text-sm">Quanto mais detalhes, mais precisa será a nossa proposta.</p>
                    <div className="mt-5 flex items-center gap-3" aria-live="polite">
                        <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gson-yellow transition-all duration-300" style={{ width: `${briefProgress}%` }} /></div>
                        <span className="text-gson-yellow text-[10px] font-black tracking-widest">BRIEF {briefProgress}%</span>
                    </div>
                </div>

                <form method="POST" ref={formRef} onInput={updateBriefProgress} onChange={updateBriefProgress} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Nome" name="nome" type="text" placeholder="O teu nome" required />
                        <InputField label="E-mail" name="email" type="email" placeholder="teu@email.com" required />
                    </div>

                    <InputField label="Empresa / Projecto (opcional)" name="empresa" type="text" placeholder="Nome da empresa ou projecto" />

                    <NativeSelect
                        label="Serviço pretendido"
                        name="servico"
                        placeholder="Qual é o teu desafio?"
                        options={services}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <NativeSelect
                            label="Orçamento disponível"
                            name="orcamento"
                            placeholder="Selecciona uma faixa"
                            options={budgets}
                        />
                        <NativeSelect
                            label="Prazo desejado"
                            name="prazo"
                            placeholder="Quando precisas?"
                            options={timelines}
                        />
                    </div>

                    <InputField
                        label="Descreve o teu projecto"
                        name="mensagem"
                        type="textarea"
                        placeholder="O que queres construir? Qual o problema que resolve? Quem vai usar? Quanto mais detalhe, melhor."
                        required
                    />

                    <button
                        type="submit"
                        disabled={status === "SENDING"}
                        className="w-full bg-gson-yellow text-gson-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gson-gold transition-all disabled:opacity-50 text-sm"
                    >
                        {status === "SENDING" ? "A enviar..." : "Enviar Mensagem"}
                        <Send size={18} />
                    </button>

                    {status === "ERROR" && (
                        <div className="flex items-center gap-2 text-red-400 justify-center text-sm">
                            <AlertCircle size={16} />
                            <span>Ocorreu um problema. Tenta novamente.</span>
                        </div>
                    )}
                </form>
            </div>

            {/* FAQ */}
            <div className="card-glass rounded-[24px] border border-white/8 p-6">
                <p className="text-gson-yellow text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gson-yellow" />
                    Perguntas frequentes
                </p>
                <div>
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>
        </div>
    )
}
