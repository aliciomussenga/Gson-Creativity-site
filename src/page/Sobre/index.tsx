import Manifesto from "../../component/sections/Manifesto"
import Pilares from "../../component/sections/Pilares"
import Certifications from "../../component/sections/Certifications"
import FounderStory from "../../component/sections/FounderStory"

function Sobre() {
    return (
        <main className="bg-[#fff9de] min-h-screen px-[7%] pt-32">
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
