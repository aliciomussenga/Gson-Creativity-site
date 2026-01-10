import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-40 text-center px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
          A SUA MARCA MERECE SAIR DO <span className="text-gson-yellow">ANONIMATO.</span>
        </h2>
        <Link to="/contato">
          <button className="bg-white text-gson-black px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter hover:bg-gson-yellow transition-all transform hover:scale-110">
            Vamos Construir o Futuro
          </button>
        </Link>
      </div>
    </section>
  );
}