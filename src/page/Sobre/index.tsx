import Manifesto from "../../sections/Manifesto";
import Pilares from "../../sections/Pilares";

function Sobre() {
  return (
    <main className="bg-gson-black min-h-screen px-[7%] pt-32">
      <div className="max-w-7xl mx-auto">
        <Manifesto />
        <Pilares />
      </div>
    </main>
  );
}

export default Sobre;