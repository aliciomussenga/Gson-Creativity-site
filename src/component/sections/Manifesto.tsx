export default function Manifesto() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl">
        <div className="mb-7 flex items-center gap-3 text-gson-gold">
          <span className="h-px w-10 bg-current" />
          <span className="text-xs font-black uppercase tracking-[.28em]">Gson Creativity · Luanda</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-gson-black leading-[.9] mb-10 tracking-tighter">
          TECNOLOGIA QUE COMEÇA POR <span className="text-transparent border-text">ENTENDER.</span>
        </h1>
        <div className="grid gap-8 border-t border-gson-black/10 pt-8 md:grid-cols-[1.25fr_.75fr] md:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-gson-black/70 md:text-xl">
          <p>Na <span className="font-semibold text-gson-black">Gson Creativity</span>, cada projecto começa com contexto: as pessoas envolvidas, o problema que precisa de ser resolvido e a mudança que se quer criar.</p>
          <p>Juntamos estratégia, design e tecnologia para transformar ideias em experiências digitais claras, úteis e preparadas para evoluir.</p>
          </div>
          <p className="border-l-2 border-gson-yellow pl-5 text-base italic leading-relaxed text-gson-black/65 md:text-lg">Não acreditamos em soluções iguais para todos. Acreditamos em ouvir bem, escolher o essencial e construir em parceria.</p>
        </div>
      </div>
      <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; } .text-glow { text-shadow: 0 0 15px rgba(242, 227, 12, 0.2); }`}</style>
    </section>
  );
}
