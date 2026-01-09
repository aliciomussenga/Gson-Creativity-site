import { Instagram, Youtube} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gson-black border-t border-white/5 pt-16 pb-8 px-[7%]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          {/* Lado Esquerdo: Branding Subtil */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-white font-bold tracking-tighter text-xl">
              GSON <span className="text-gson-yellow text-2xl">Creativity</span>
            </h2>
            <p className="text-gson-sand/40 text-xs uppercase tracking-[0.3em]">
              High Performance Agency
            </p>
          </div>

          {/* Centro: Social Links */}
          <nav className="flex items-center gap-8">
            <Link to="https://www.instagram.com/gson_creativity/" target="_blank" className="text-gson-sand/60 hover:text-gson-yellow transition-colors flex items-center gap-2 group">
              <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium uppercase tracking-widest hidden sm:inline">Instagram</span>
            </Link>
            <Link to="https://www.youtube.com/@gsoncreativity" target="_blank" className="text-gson-sand/60 hover:text-gson-yellow transition-colors flex items-center gap-2 group">
              <Youtube size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium uppercase tracking-widest hidden sm:inline">YouTube</span>
            </Link>
          </nav>
        </div>

        {/* Linha Final: Copyright & Tech Stack */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.03] text-[10px] uppercase tracking-[0.2em] text-gson-sand/50">
          <p>
            Gson Creativity © {currentYear}. Todos os direitos reservados.
          </p>
          
          <p className="mt-4 md:mt-0">
            Tech Stack: <span className="text-gson-yellow/50">Developed with passion & code.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;