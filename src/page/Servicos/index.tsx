import { useState } from "react"
import ServiceGrid from "../../component/ServiceGrid"
import ServiceModal from "../../component/ServiceModal"
import SyncedObject3D from "../../component/SyncedObject3D"

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
        <main className="relative overflow-hidden bg-[#fff9de] min-h-screen pt-32 pb-20 px-[7%]">
            <SyncedObject3D object="signatureGrid" light className="right-[4%] top-24 h-36 w-36 opacity-55 md:h-56 md:w-56" />
            <div className="max-w-7xl mx-auto">
                <section className="mt-25 mb-20">
                    <h1 className="text-5xl md:text-8xl font-black text-gson-black leading-none tracking-tighter">
                        O QUE PODEMOS <br />
                        <span className="text-transparent border-text">CONSTRUIR JUNTOS.</span>
                    </h1>
                    <p className="mt-5 text-gson-black/70 text-lg md:text-xl max-w-3xl">
                        Cada projecto começa num contexto diferente. Explora as áreas abaixo, entende como pensamos e selecciona o que faz sentido para a tua conversa connosco.
                    </p>
                    <p className="mt-6 max-w-2xl border-l-2 border-gson-yellow pl-4 text-sm leading-relaxed text-gson-black/55">Não trabalhamos com promessas universais nem pacotes fechados: o caminho, o âmbito e os prazos são definidos depois de compreender o desafio.</p>
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
