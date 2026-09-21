import Hero from "../../component/sections/Hero"
import Ticker from "../../component/sections/Ticker"
import Metodo from "../../component/sections/Metodo"
import TechStack from "../../component/sections/TechStack"
import CallToAction from "../../component/sections/CallToAction"
import ProjectPlanner from "../../component/sections/ProjectPlanner"
import OpenStudio from "../../component/sections/OpenStudio"
import GsonAcademy from "../../component/sections/GsonAcademy"
import HumanConnection from "../../component/sections/HumanConnection"

function Home() {
    return (
        <div className="bg-[#fff9de] overflow-x-hidden pt-18 relative">
            <Hero />
            <Ticker />
            <HumanConnection />
            <ProjectPlanner />
            <OpenStudio />
            <GsonAcademy />
            <Metodo />
            <TechStack />
            <CallToAction />
        </div>
    )
}

export default Home
