export default function Manifesto() {
  return (
    <section className="py-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-black text-gson-black leading-none mb-12 tracking-tighter">
          SOMOS ARQUITETOS DE <span className="text-transparent border-text">PERCEPÇÃO.</span>
        </h1>
        
        <div className="space-y-8 text-gson-black/70 text-lg md:text-2xl font-light leading-relaxed">
          <p>
            "Num mundo digital saturado de ruído, o comum é invisível. Na <span className="text-gson-black font-medium">Gson Creativity</span>, procuramos quebrar barreiras visuais e criar ferramentas digitais com intenção."
          </p>
          <p className="border-l-2 border-gson-yellow pl-6 italic">
            "Acreditamos que o design robusto e a criatividade estratégica são os motores que separam as marcas líderes das marcas seguidoras."
          </p>
        </div>
      </div>
      <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; } .text-glow { text-shadow: 0 0 15px rgba(242, 227, 12, 0.2); }`}</style>
    </section>
  );
}
