import { useState, useRef } from "react"; // Adicionado useRef
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import InputField from "../InputField";
import CustomSelect from "../CustomSelect";

export default function ContactForm() {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  
  // 1. Criamos uma referência para o formulário
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    // 2. Usamos a referência para capturar os dados
    const formData = new FormData(formRef.current!);
    
    try {
      const response = await fetch("https://formspree.io/f/xreegqeo", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("SUCCESS");
        // 3. Limpamos o formulário usando a referência com segurança
        formRef.current?.reset(); 
      } else {
        setStatus("ERROR");
        console.error("Erro no envio:", response.statusText);
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      setStatus("ERROR");
    }
  };

  if (status === "SUCCESS") {
    return (
      <div className="bg-white/[0.03] p-12 rounded-[40px] border border-gson-yellow/30 text-center flex flex-col items-center justify-center min-h-[450px]">
        <CheckCircle size={64} className="text-gson-yellow mb-6" />
        <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Mensagem Enviada!</h2>
        <button 
          onClick={() => setStatus("IDLE")} 
          className="mt-8 text-gson-yellow underline italic"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] p-8 md:p-12 rounded-[40px] border border-white/5 backdrop-blur-md">
      {/* 4. Conectamos a ref ao formulário */}
      <form method="POST" ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Nome" name="nome" type="text" placeholder="Seu nome completo" required />
          <InputField label="E-mail" name="email" type="email" placeholder="seu@email.com" required />
        </div>

        <CustomSelect 
          label="Serviço de Interesse" 
          name="servico"
          placeholder="Qual o seu desafio?"
          options={["Desenvolvimento Web", "Branding", "Social Media", "Consultoria", "Outro"]} 
        />

        <InputField label="Sua Mensagem" name="mensagem" type="textarea" placeholder="Conte-nos detalhes do projeto..." required />

        <button 
          type="submit"
          disabled={status === "SENDING"}
          className="w-full bg-gson-yellow text-gson-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50"
        >
          {status === "SENDING" ? "Processando..." : "Enviar Mensagem"}
          <Send size={20} />  
        </button>

        {status === "ERROR" && (
          <div className="flex items-center gap-2 text-red-400 justify-center text-sm">
            <AlertCircle size={16} />
            <span>Ocorreu um problema. Tente novamente.</span>
          </div>
        )}
      </form>
    </div>
  );
}