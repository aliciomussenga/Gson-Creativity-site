import ContactInfo from "../../component/sections/ContactInfo";
import ContactForm from "../../component/sections/ContactForm";

function Contato() {
  return (
    // Mantivemos o pt-48 para garantir que a Navbar não cubra o título
    <main className="bg-gson-black min-h-screen pt-48 pb-20 px-[7%]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Lado Esquerdo: Informações de contacto (Texto, Redes, Email) */}
        <ContactInfo />
        
        {/* Lado Direito: O formulário retificado com Formspree */}
        <ContactForm />
      </div>
    </main>
  );
}

export default Contato;