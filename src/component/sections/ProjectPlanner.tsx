import { useMemo, useState } from "react"
import { ArrowRight, Check, Compass, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const options = [
    { id: "website", label: "Website", description: "Uma presença digital clara e memorável." },
    { id: "app", label: "App", description: "Uma experiência pensada para pessoas em movimento." },
    { id: "system", label: "Sistema", description: "Uma ferramenta para organizar operações e equipas." },
    { id: "strategy", label: "Estratégia", description: "Direcção para transformar uma ideia em produto." },
]

export default function ProjectPlanner() {
    const [selected, setSelected] = useState<string[]>([])
    const [step, setStep] = useState<"choose" | "ready">("choose")

    const selectedLabels = useMemo(
        () => options.filter((option) => selected.includes(option.id)).map((option) => option.label),
        [selected],
    )

    const toggleOption = (id: string) => {
        setStep("choose")
        setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    }

    return (
        <section className="py-24 px-[7%] bg-[#fff9de]" aria-labelledby="project-planner-title">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5">
                    <p className="text-gson-yellow text-[11px] uppercase tracking-widest mb-4">Comece por aqui</p>
                    <h2 id="project-planner-title" className="text-4xl md:text-5xl font-black text-gson-black leading-tight tracking-tight">
                        Que tipo de projecto tens em mente?
                    </h2>
                    <p className="text-gson-black/65 leading-relaxed mt-5 max-w-md">
                        Escolhe uma ou mais áreas. Usamos isto apenas para orientar a primeira conversa — sem promessas ou estimativas automáticas.
                    </p>
                </div>

                <div className="lg:col-span-7 rounded-3xl border border-gson-black/10 bg-white p-5 md:p-7 shadow-[0_20px_50px_rgba(13,13,13,.08)]">
                    <div className="grid sm:grid-cols-2 gap-3" role="group" aria-label="Tipos de projecto">
                        {options.map((option) => {
                            const isSelected = selected.includes(option.id)
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => toggleOption(option.id)}
                                    className={`text-left rounded-2xl p-5 border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gson-yellow ${isSelected ? "border-gson-yellow bg-gson-yellow/15" : "border-gson-black/10 hover:border-gson-yellow bg-[#fffdf2]"}`}
                                >
                                    <span className={`mb-5 inline-flex w-7 h-7 rounded-full items-center justify-center border ${isSelected ? "bg-gson-yellow border-gson-yellow text-gson-black" : "border-gson-black/20 text-transparent"}`}>
                                        <Check size={15} strokeWidth={3} />
                                    </span>
                                    <span className="block text-gson-black font-bold">{option.label}</span>
                                    <span className="block text-gson-black/60 text-sm leading-relaxed mt-1">{option.description}</span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-6 pt-5 border-t border-gson-black/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <div className="flex gap-3 items-start text-sm text-gson-black/65">
                            {step === "ready" ? <Lightbulb className="text-gson-yellow shrink-0" size={19} /> : <Compass className="text-gson-yellow shrink-0" size={19} />}
                            <p>{step === "ready" ? `Óptimo — vamos conversar sobre ${selectedLabels.join(", ")}.` : selected.length ? `${selected.length} área${selected.length > 1 ? "s" : ""} seleccionada${selected.length > 1 ? "s" : ""}.` : "Selecciona o que melhor descreve a tua necessidade."}</p>
                        </div>
                        {step === "ready" ? (
                            <Link to="/contato" className="shrink-0 inline-flex items-center justify-center gap-2 bg-gson-yellow text-gson-black px-5 py-3 rounded-full text-xs uppercase tracking-widest font-black hover:bg-gson-gold transition-colors">
                                Falar connosco <ArrowRight size={15} />
                            </Link>
                        ) : (
                            <motion.button
                                type="button"
                                onClick={() => setStep("ready")}
                                disabled={!selected.length}
                                whileTap={{ scale: selected.length ? 0.97 : 1 }}
                                className="shrink-0 inline-flex items-center justify-center gap-2 bg-gson-yellow disabled:bg-gson-black/10 disabled:text-gson-black/30 text-gson-black px-5 py-3 rounded-full text-xs uppercase tracking-widest font-black transition-colors"
                            >
                                Continuar <ArrowRight size={15} />
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
