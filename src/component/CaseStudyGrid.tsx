import { useMemo, useState } from "react"
import { motion } from "framer-motion"

interface CaseStudy {
    id: string
    title: string
    segment: string
    result: string
    status: "live" | "beta"
}

const caseStudies: CaseStudy[] = [
    {
        id: "cs1",
        title: "E-commerce de luxo - conversão +120%",
        segment: "E-commerce",
        result: "4x ROI em 90 dias",
        status: "live",
    },
    {
        id: "cs2",
        title: "SaaS fintech - retenção +33%",
        segment: "SaaS",
        result: "ROI 5x em 120 dias",
        status: "beta",
    },
    {
        id: "cs3",
        title: "Marca de moda - engajamento +210%",
        segment: "Branding",
        result: "Aumento de 120k seguidores orgânicos",
        status: "beta",
    },
    {
        id: "cs4",
        title: "Marketplace B2B - médias de ticket +27%",
        segment: "Marketplace",
        result: "Crescimento de MRV 38%",
        status: "live",
    },
    {
        id: "cs5",
        title: "Gson Academy - +80 alunos formados",
        segment: "Gson Academy",
        result: "70% redução de time-to-market em pipelines de entrega",
        status: "live",
    },
]

const segments = [
    "Todos",
    "E-commerce",
    "SaaS",
    "Branding",
    "Marketplace",
    "Gson Academy",
]

export default function CaseStudyGrid() {
    const [filter, setFilter] = useState<string>("Todos")

    const filteredStudies = useMemo(() => {
        if (filter === "Todos") return caseStudies
        return caseStudies.filter(item => item.segment === filter)
    }, [filter])

    return (
        <section className="px-[7%] py-20 bg-[#09090f] border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <p className="text-gson-yellow uppercase tracking-widest text-sm mb-3">
                    Case Studies
                </p>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                    Resultados reais que falam mais alto.
                </h2>

                <div className="flex flex-wrap gap-3 mb-10">
                    {segments.map(segment => (
                        <button
                            key={segment}
                            onClick={() => setFilter(segment)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold border ${filter === segment ? "bg-gson-yellow text-gson-black border-gson-yellow" : "bg-white/5 text-gson-sand border-white/20"}`}
                        >
                            {segment}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredStudies.map(study => (
                        <motion.article
                            key={study.id}
                            whileHover={{ y: -4 }}
                            className="card-glass p-6 rounded-2xl border border-white/10"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-xl font-bold leading-snug">
                                    {study.title}
                                </h3>
                                {study.status === "beta" ? (
                                    <span className="text-black bg-gson-yellow px-3 py-1 rounded-full text-xs font-black">
                                        Beta Público
                                    </span>
                                ) : (
                                    <span className="text-gson-black bg-gson-sand px-3 py-1 rounded-full text-xs font-bold">
                                        Live
                                    </span>
                                )}
                            </div>
                            <p className="text-gson-sand/80 mt-4">
                                Segmento: <strong>{study.segment}</strong>
                            </p>
                            <p className="text-white/95 mt-2">{study.result}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
