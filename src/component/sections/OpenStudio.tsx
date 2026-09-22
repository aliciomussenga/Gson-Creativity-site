import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Eye, Handshake, LayoutPanelTop, MessageCircle, PanelsTopLeft } from "lucide-react"
import { Link } from "react-router-dom"
import SyncedObject3D from "../SyncedObject3D"

const spaces = [
    {
        id: "entrada", icon: <Handshake size={20} />, title: "A conversa", label: "Sem portas fechadas",
        text: "Começamos por ouvir o contexto, as dúvidas e o que ainda não está definido. Não precisas de chegar com uma solução pronta.",
        list: ["Objectivos e pessoas envolvidas", "Restrições reais do projecto", "O que vale a pena priorizar"],
    },
    {
        id: "mesa", icon: <LayoutPanelTop size={20} />, title: "A mesa de trabalho", label: "Decisões visíveis",
        text: "Ideias, fluxos e protótipos ficam claros antes da construção. O cliente acompanha e dá feedback nos momentos certos.",
        list: ["Estrutura e jornadas", "Protótipos para testar", "Prioridades partilhadas"],
    },
    {
        id: "produto", icon: <PanelsTopLeft size={20} />, title: "O produto", label: "Construção em conjunto",
        text: "Transformamos as decisões aprovadas em uma experiência digital, mostrando evolução e espaço para ajustes durante o caminho.",
        list: ["Entregas por etapas", "Demonstrações de progresso", "Aprendizagem contínua"],
    },
]

export default function OpenStudio() {
    const [active, setActive] = useState(spaces[0].id)
    const space = spaces.find((item) => item.id === active) ?? spaces[0]

    return (
        <section className="relative overflow-hidden py-28 px-[7%] bg-gson-yellow" aria-labelledby="open-studio-title">
            <SyncedObject3D object="signatureGrid" light className="-left-12 bottom-8 h-44 w-44 opacity-50 sm:left-3 sm:h-56 sm:w-56" />
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 mb-12">
                    <div className="max-w-2xl">
                        <p className="text-gson-black/60 text-[11px] uppercase tracking-widest mb-3 font-black">Gson por dentro</p>
                        <h2 id="open-studio-title" className="text-4xl md:text-6xl font-black text-gson-black tracking-tight leading-[.98]">Aqui não há bastidores escondidos.</h2>
                    </div>
                    <p className="text-gson-black/70 max-w-sm leading-relaxed">Explora o percurso e vê como uma ideia ganha forma connosco. Escolhe uma estação para entrar.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Estações do estúdio">
                        {spaces.map((item, index) => {
                            const isActive = item.id === active
                            return <button key={item.id} type="button" role="tab" aria-selected={isActive} onClick={() => setActive(item.id)} className={`min-w-[220px] lg:min-w-0 text-left flex items-center gap-4 p-5 rounded-2xl transition-colors ${isActive ? "bg-gson-black text-white" : "bg-gson-black/10 text-gson-black hover:bg-gson-black/20"}`}>
                                <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-gson-yellow text-gson-black" : "bg-gson-black text-gson-yellow"}`}>{item.icon}</span>
                                <span><span className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">0{index + 1}</span><span className="font-black">{item.title}</span></span>
                            </button>
                        })}
                    </div>

                    <div className="lg:col-span-7 bg-[#fff9de] rounded-3xl p-7 md:p-10 min-h-[300px] flex flex-col justify-between">
                        <AnimatePresence mode="wait">
                            <motion.div key={space.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .22 }}>
                                <div className="flex items-center gap-2 text-gson-gold text-xs uppercase tracking-widest font-black"><Eye size={15} /> {space.label}</div>
                                <h3 className="text-gson-black text-3xl md:text-4xl font-black mt-5">{space.title}</h3>
                                <p className="text-gson-black/70 text-lg leading-relaxed mt-4 max-w-xl">{space.text}</p>
                                <ul className="mt-7 grid sm:grid-cols-3 gap-3">
                                    {space.list.map((item) => <li key={item} className="border-t-2 border-gson-yellow pt-3 text-gson-black/70 text-sm font-medium">{item}</li>)}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                        <Link to="/contato" className="mt-10 self-start inline-flex gap-2 items-center text-gson-black font-black text-xs uppercase tracking-widest border-b-2 border-gson-black pb-2 hover:text-gson-gold hover:border-gson-gold transition-colors"><MessageCircle size={16} /> Trazer uma ideia <ArrowRight size={15} /></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
