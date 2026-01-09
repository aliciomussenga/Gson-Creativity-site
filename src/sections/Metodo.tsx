export default function Metodo() {
  const cards = [
    { title: "Imersão", desc: "Entendemos o seu negócio a fundo antes de criar." },
    { title: "Estratégia", desc: "Planejamos cada pixel para converter visitantes em clientes." },
    { title: "Execução", desc: "Desenvolvimento robusto com as tecnologias mais modernas." }
  ];

  return (
    <section className="py-32 px-[7%]">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-20">
        Não é apenas Design.<br/><span className="text-gson-gold italic">É Ciência Criativa.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="p-10 border border-white/10 bg-white/5 rounded-2xl hover:border-gson-yellow/50 transition-colors group">
            <span className="text-gson-yellow text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
            <h3 className="text-2xl font-bold text-white mt-4 mb-4">{card.title}</h3>
            <p className="text-gson-sand/70 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}