import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-[7%] pt-28 md:pt-32">
      <div className="max-w-6xl">
        <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] tracking-tighter mb-8">
          A LÓGICA É <span className="text-transparent border-text mb-10">VOSSA.</span><br />
          A MAGIA É <span className="text-gson-yellow">NOSSA.</span>
        </h1>
        <p className="text-gson-sand text-xl md:text-2xl max-w-2xl font-light leading-relaxed mb-12">
          Transformamos ideias complexas em experiências digitais que vendem, inspiram e marcam. Bem-vindo à <span className="text-white font-medium">Gson Creativity.</span>
        </p>
        <div className="flex flex-wrap gap-6">
          <Link to="/servicos" className="bg-gson-yellow text-gson-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gson-gold transition-all flex items-center gap-3">
            Ver Nossos Projetos <ArrowRight size={20} />
            </Link>
          <Link to="/contato" className="border border-gson-beige/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-3">
            Falar com Especialista <MessageSquare size={20} />
          </Link>
        </div>
      </div>
      <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
    </section>
  );
}