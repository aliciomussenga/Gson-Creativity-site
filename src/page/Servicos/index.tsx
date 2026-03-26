import { useState } from "react"
import ServiceGrid from "../../component/ServiceGrid"
import ServiceModal from "../../component/ServiceModal"
import CaseStudyGrid from "../../component/CaseStudyGrid"
import ProjectPortfolio from "../../component/sections/ProjectPortfolio"

function Servicos() {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<{
        title: string
        description: string
        details: string
    } | null>(null)

    const showCaseStudy = (service: {
        title: string
        description: string
        details: string
    }) => {
        setSelectedService(service)
        setModalOpen(true)
    }

    return (
        <main className="bg-gson-black min-h-screen pt-32 pb-20 px-[7%]">
            <div className="max-w-7xl mx-auto">
                <section className="mt-25 mb-20">
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
                        O QUE FAZEMOS <br />
                        <span className="text-transparent border-text">
                            DE MELHOR.
                        </span>
                    </h1>
                    <p className="mt-5 text-gson-sand/80 text-lg md:text-xl max-w-3xl">
                        Cada serviço inclui roadmap, entrega de protótipos
                        executáveis e análises de impacto para KPI da sua
                        operação.
                    </p>
                </section>

                <ServiceGrid onSelect={showCaseStudy} />
                <CaseStudyGrid />
                <ProjectPortfolio />

                <ServiceModal
                    open={modalOpen}
                    onClose={setModalOpen}
                    service={selectedService}
                />
            </div>

            <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
        </main>
    )
}

export default Servicos
