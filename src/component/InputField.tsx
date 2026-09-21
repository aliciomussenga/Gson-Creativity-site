interface InputProps {
  label: string;
  name: string; // ADICIONADO: Essencial para o Formspree
  type?: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  required?: boolean; // ADICIONADO: Para validação básica
}

export default function InputField({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  options, 
  required = true 
}: InputProps) {
  
  const baseClass = "bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-gson-yellow transition-all w-full hover:bg-white/[0.05]";

  return (
    <div className="flex flex-col gap-2 w-full group">
      <label className="text-gson-yellow text-[10px] uppercase tracking-[0.2em] ml-2 font-black group-focus-within:text-white transition-colors">
        {label}
      </label>
      
      {type === "textarea" ? (
        <textarea 
          name={name} // Conexão com Formspree
          rows={4} 
          placeholder={placeholder} 
          required={required}
          className={`${baseClass} resize-none`} 
        />
      ) : type === "select" ? (
        <div className="relative">
          <select 
            name={name} // Conexão com Formspree
            required={required}
            className={`${baseClass} appearance-none cursor-pointer pr-12`}
          >
            <option value="" disabled selected className="bg-gson-black text-gson-sand/50">
              {placeholder || "Selecione uma opção"}
            </option>
            {options?.map((opt) => (
              <option key={opt} value={opt} className="bg-gson-black text-white py-4">
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gson-yellow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ) : (
        <input 
          name={name} // Conexão com Formspree
          type={type} 
          placeholder={placeholder} 
          required={required}
          className={baseClass} 
        />
      )}
    </div>
  );
}