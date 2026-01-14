import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Agência", path: "/Sobre" },
    { name: "Expertise", path: "/Servicos" },
    // { name: "Portifólio", path: "/Obras" },
    { name: "Contato", path: "/Contato" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-gson-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-[7%] py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)} className="z-[110] transition-transform hover:scale-105 active:scale-95">
        <img src={logo} alt="Gson Creativity" className="w-16 sm:w-19 md:w-23 lg:w-25 h-auto object-contain" />
        </Link> 

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs uppercase tracking-[0.3em] font-black transition-all hover:text-gson-yellow ${
                isActive(link.path) ? "text-gson-yellow" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/Contato" 
            className="px-6 py-2 border border-gson-yellow text-gson-yellow text-xs uppercase tracking-widest font-black rounded-full hover:bg-gson-yellow hover:text-gson-black transition-all"
          >
            Iniciar Projeto
          </Link>
        </nav>

        {/* MOBILE TRIGGER (HAMBURGER) */}
        <button 
          className="md:hidden z-[110] text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} className="text-gson-yellow" /> : <Menu size={32} />}
        </button>

          {/* MOBILE MENU OVERLAY */}
        <div className={`fixed  h-60 top-25 inset-0 bg-gson-black transition-all duration-500 ease-in-out z-[100] flex flex-col p-5 mt-3 justify-center gap-8 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2x uppercase tracking-[0.3em] font-black ${
                isActive(link.path) ? "text-gson-yellow" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
      </div>
    </header>
  );
}

export default Header;