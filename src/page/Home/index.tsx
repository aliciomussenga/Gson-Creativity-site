import Hero from "../../component/sections/Hero"
import Ticker from "../../component/sections/Ticker"
import Metodo from "../../component/sections/Metodo"
import TechStack from "../../component/sections/TechStack"
import Pilares from "../../component/sections/Pilares"
import Resultados from "../../component/sections/Resultados"
import GsonAcademy from "../../component/sections/GsonAcademy"
import Certifications from "../../component/sections/Certifications"
import CallToAction from "../../component/sections/CallToAction"

function Home() {
    return (
        <div className="bg-gson-black overflow-x-hidden pt-18 relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(242,227,12,0.08),transparent_40%)]" />

            <Hero />
            <Ticker />
            <Metodo />
            <TechStack />
            <Pilares />
            <Resultados />
            <GsonAcademy />
            <Certifications />
            <CallToAction />
        </div>
    )
}

export default Home
