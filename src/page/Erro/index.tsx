import { Link } from "react-router-dom";
import { MoveLeft, Ghost } from "lucide-react";

function Erro() {
  return (
    <main className="min-h-screen bg-gson-black flex items-center justify-center px-6 selection:bg-gson-yellow selection:text-gson-black">
      <div className="text-center space-y-8">
        
        {/* Elemento Visual - O "404" com efeito Stroke e Glow */}
        <div className="relative">
          <h1 className="text-[100px] md:text-[250px] font-black leading-none text-transparent stroke-text opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <Ghost size={80} className="text-gson-yellow animate-bounce" />
          </div>
        </div>

        {/* Texto de Mensagem */}
        <div className="max-w-md mx-auto space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Ops! Você navegou para <span className="text-gson-yellow">fora da caixa.</span>
          </h3>
          <p className="text-gson-sand/70 text-lg font-light leading-relaxed">
            Esta página não existe, mas a solução para o seu negócio está logo ali, no ponto de partida.
          </p>
        </div>

        {/* Botão de Retorno Componentizado com Tailwind */}
        <div className="pt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gson-yellow text-gson-black font-bold uppercase tracking-widest rounded-full hover:bg-gson-gold hover:scale-105 transition-all shadow-[0_0_20px_rgba(242,227,12,0.2)]"
          >
            <MoveLeft size={20} />
            Voltar ao início
          </Link>
        </div>
      </div>

      {/* Estilos específicos para o efeito de contorno */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px #F2B90C;
        }
      `}</style>
    </main>
  );
}

export default Erro;