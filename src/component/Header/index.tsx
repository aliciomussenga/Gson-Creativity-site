import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  const location = useLocation();

  // Função para verificar se o link está ativo
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[7%] py-4 bg-gson-black/80 backdrop-blur-md border-b border-white/5">
      
      {/* LOGO AREA */}
      <div className="flex items-center">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img 
            src={logo} 
            alt="Gson Creativity" 
            className="w-20 h-auto object-contain" 
          />
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="hidden md:flex items-center gap-10">
        {[
          { name: "A agência", path: "/" },
          { name: "Expertise", path: "/Sobre" },
          { name: "Nossas Obras", path: "/Servicos" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:text-gson-yellow ${
              isActive(link.path) ? "text-gson-yellow" : "text-gson-sand/60"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* ACTION BUTTON (CTA) */}
      <div className="flex items-center">
        <Link 
          to="/Contato" 
          className="px-6 py-2 border border-gson-yellow text-gson-yellow text-xs uppercase tracking-widest font-bold rounded-full hover:bg-gson-yellow hover:text-gson-black transition-all duration-500"
        >
          Iniciar Projeto
        </Link>
      </div>

    </header>
  );
}

export default Header;