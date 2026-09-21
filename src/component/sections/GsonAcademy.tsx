import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, BrainCircuit, Building2, ChevronLeft, ChevronRight, Download, Globe2, Play, Sparkles, Target } from "lucide-react"

const stories = [
    { image: "/gson-academy/tutor-ia.webp", alt: "Gson Academy: tutor com inteligência artificial", eyebrow: "Tutor IA", title: "Aprendizagem que acompanha o teu ritmo.", description: "Um tutor inteligente para explicar, praticar e criar o teu plano de estudo.", icon: BrainCircuit },
    { image: "/gson-academy/educacao-global.webp", alt: "Gson Academy: educação sem fronteiras", eyebrow: "Visão global", title: "Talento local, alcance sem fronteiras.", description: "Tecnologia e formação prática criadas em Angola para chegar mais longe.", icon: Globe2 },
    { image: "/gson-academy/empresas.webp", alt: "Gson Academy: formação de equipas empresariais", eyebrow: "Para empresas", title: "Equipas capacitadas transformam negócios.", description: "Programas de formação estratégica para competências que geram impacto real.", icon: Building2 },
    { image: "/gson-academy/dados.webp", alt: "Gson Academy: aprendizagem baseada em dados", eyebrow: "Resultados reais", title: "Decisões melhores começam por aprender melhor.", description: "Uma experiência educativa que evolui com dados, prática e resultados.", icon: Target },
    { image: "/gson-academy/equipa.webp", alt: "Gson Academy: soluções para equipas", eyebrow: "Desenvolvimento", title: "Potencia a tua equipa.", description: "Capacitação alinhada aos desafios reais de cada organização.", icon: Building2 },
    { image: "/gson-academy/aprendizagem.webp", alt: "Gson Academy: aprendizagem inteligente", eyebrow: "Personalização", title: "Um percurso tão único quanto tu.", description: "Conteúdo e prática orientados para desbloquear o teu próximo nível.", icon: Sparkles },
]

const highlights = [["450+", "horas de conteúdo"], ["80+", "alunos activos"], ["4", "trilhas de carreira"]]
const storeUrl = "https://play.google.com/store/apps/details?id=com.gson.academia&pcampaignid=web_share"

export default function GsonAcademy() {
    const [activeStory, setActiveStory] = useState(0)
    const prefersReducedMotion = useReducedMotion()
    const story = stories[activeStory]
    const StoryIcon = story.icon
    const selectStory = (index: number) => setActiveStory((index + stories.length) % stories.length)

    return (
        <section id="academy" className="relative overflow-hidden bg-[#050911] py-24 text-white sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(242,185,12,0.18),transparent_34%),radial-gradient(ellipse_at_85%_72%,rgba(29,78,216,0.20),transparent_38%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:54px_54px]" />

            <div className="relative mx-auto max-w-7xl px-[7%]">
                <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
                    <div className="max-w-3xl"><div className="mb-5 flex items-center gap-3 text-gson-yellow"><span className="h-px w-10 bg-current" /><span className="text-xs font-black uppercase tracking-[0.32em]">Uma criação Gson</span></div><h2 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">Aprender também é<br /><span className="text-gson-yellow">abrir caminhos.</span></h2></div>
                    <p className="max-w-sm text-base leading-relaxed text-white/65 sm:text-lg">A Gson Academy combina tecnologia, prática e pessoas que querem avançar juntas.</p>
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,.7fr)]">
                    <div className="relative min-h-[570px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#091323] shadow-2xl shadow-black/40 sm:min-h-[650px]">
                        <AnimatePresence mode="wait"><motion.img key={story.image} src={story.image} alt={story.alt} className="absolute inset-0 h-full w-full object-cover object-center" initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }} transition={{ duration: 0.45 }} /></AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03060c] via-[#03060c]/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10"><motion.div key={story.title} initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="max-w-xl"><div className="mb-4 flex items-center gap-3 text-gson-yellow"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-gson-yellow/40 bg-gson-yellow/10"><StoryIcon size={19} /></span><span className="text-xs font-black uppercase tracking-[0.25em]">{story.eyebrow}</span></div><h3 className="text-3xl font-black leading-tight sm:text-5xl">{story.title}</h3><p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">{story.description}</p></motion.div></div>
                        <div className="absolute right-5 top-5 flex gap-2"><button type="button" onClick={() => selectStory(activeStory - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-gson-black/45 text-white backdrop-blur transition hover:border-gson-yellow hover:text-gson-yellow" aria-label="História anterior"><ChevronLeft size={20} /></button><button type="button" onClick={() => selectStory(activeStory + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-gson-black/45 text-white backdrop-blur transition hover:border-gson-yellow hover:text-gson-yellow" aria-label="Próxima história"><ChevronRight size={20} /></button></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="rounded-[2rem] border border-gson-yellow/25 bg-gson-yellow p-7 text-gson-black sm:p-8"><div className="mb-10 flex items-start justify-between gap-3"><div><div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]"><Sparkles size={15} /> Gson Academy</div><p className="text-2xl font-black leading-tight">Aprende. Cria. Transforma.</p></div><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gson-black text-gson-yellow"><Play size={18} fill="currentColor" /></div></div><a href={storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gson-black px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:scale-[1.03]">Explorar a app <ArrowRight size={15} /></a></div>
                        <div className="grid grid-cols-3 gap-3 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur sm:p-6">{highlights.map(([value, label]) => <div key={label} className="text-center"><p className="text-xl font-black text-gson-yellow sm:text-2xl">{value}</p><p className="mt-1 text-[10px] leading-tight text-white/55 sm:text-xs">{label}</p></div>)}</div>
                        <div className="grid grid-cols-2 gap-3">{stories.map((item, index) => <button type="button" key={item.image} onClick={() => selectStory(index)} aria-pressed={activeStory === index} className={`group relative aspect-[1.05] overflow-hidden rounded-2xl border text-left transition ${activeStory === index ? "border-gson-yellow ring-2 ring-gson-yellow/35" : "border-white/10 hover:border-white/50"}`}><img src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#02050a]/90 via-transparent to-transparent" /><span className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-[0.14em] text-white">0{index + 1} · {item.eyebrow}</span></button>)}</div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><p className="text-sm text-white/70"><span className="font-bold text-white">Feita para quem quer avançar.</span> Formação digital com contexto, prática e propósito.</p><a href={storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-widest text-gson-yellow hover:text-white transition"><Download size={16} /> Download na Play Store</a></div>
            </div>
        </section>
    )
}
