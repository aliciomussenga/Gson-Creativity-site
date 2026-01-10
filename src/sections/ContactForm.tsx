import { Send } from "lucide-react";
import InputField from "../component/InputField";
import CustomSelect from "../component/CustomSelect";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado");
  };

  return (
    <div className="bg-white/[0.03] p-8 md:p-12 rounded-[40px] border border-white/5 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="Nome" 
            type="text" 
            placeholder="Seu nome completo" 
          />
          <InputField 
            label="E-mail" 
            type="email" 
            placeholder="seu@email.com" 
          />
        </div>

        {/* Substituímos o InputField select pelo CustomSelect */}
        <CustomSelect 
          label="Serviço de Interesse" 
          placeholder="Qual o seu desafio?"
          options={[
            "Desenvolvimento Web", 
            "Desenvolvimento Mobile", 
            "Cloud", 
            "Marketing",
            "Outro"
          ]} 
        />

        <InputField 
          label="Sua Mensagem" 
          type="textarea" 
          placeholder="Conte-nos detalhes sobre o seu projeto..." 
        />

        <button 
          type="submit"
          className="w-full bg-gson-yellow text-gson-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all duration-300 group"
        >
          <span>Enviar Mensagem</span>
          <Send 
            size={20} 
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
          />
        </button>
      </form>
    </div>
  );
}