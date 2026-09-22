import Manifesto from "../../component/sections/Manifesto"
import Pilares from "../../component/sections/Pilares"
import Certifications from "../../component/sections/Certifications"
import FounderStory from "../../component/sections/FounderStory"
import SyncedObject3D from "../../component/SyncedObject3D"

function Sobre() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#fff9de] px-[7%] pt-32">
            <SyncedObject3D object="wordmark" light className="right-[4%] top-24 h-36 w-36 opacity-55 md:h-56 md:w-56" />
            <div className="max-w-7xl mx-auto">
                <Manifesto />
                <FounderStory />
                <Pilares />
                <Certifications />
            </div>
        </main>
    )
}

export default Sobre
