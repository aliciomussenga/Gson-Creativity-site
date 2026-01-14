import ServiceGrid from "../../component/ServiceGrid";

function Servicos() {
  return (
    <main className="bg-gson-black min-h-screen pt-32 pb-20 px-[7%]">
      <div className="max-w-7xl mx-auto">
        <section className="mt-25 mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
            O QUE FAZEMOS <br /> 
            <span className="text-transparent border-text">DE MELHOR.</span>
          </h1>
        </section>

        <ServiceGrid  />
      </div>
      <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
    </main>
  );
}

export default Servicos;