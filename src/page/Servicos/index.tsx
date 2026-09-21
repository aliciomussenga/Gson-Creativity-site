import { useState } from "react"
import ServiceGrid from "../../component/ServiceGrid"
import ServiceModal from "../../component/ServiceModal"

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
        <main className="bg-[#fff9de] min-h-screen pt-32 pb-20 px-[7%]">
            <div className="max-w-7xl mx-auto">
                <section className="mt-25 mb-20">
                    <h1 className="text-5xl md:text-8xl font-black text-gson-black leading-none tracking-tighter">
                        O QUE FAZEMOS <br />
                        <span className="text-transparent border-text">
                            DE MELHOR.
                        </span>
                    </h1>
                    <p className="mt-5 text-gson-black/70 text-lg md:text-xl max-w-3xl">
                        Explora as áreas abaixo. Abre um serviço para ver o que podemos conversar e marca os que fazem sentido para a tua ideia.
                    </p>
                </section>

                <ServiceGrid onSelect={showCaseStudy} />

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
