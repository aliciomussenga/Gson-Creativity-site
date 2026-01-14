import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
}

export default function CustomSelect({ label, name, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const out = (e: any) => ref.current && !ref.current.contains(e.target) && setIsOpen(false);
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={ref}>
      <label className="text-gson-yellow text-[10px] uppercase tracking-widest ml-2 font-black">
        {label}
      </label>

      {/* RETIFICAÇÃO: O input hidden agora tem o atributo 'required'. 
          O Formspree precisa do 'name' para capturar o valor de 'value'.
      */}
      <input 
        type="hidden" 
        name={name} 
        value={selected} 
        required 
      />
      
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className={`bg-white/[0.03] border ${isOpen ? 'border-gson-yellow' : 'border-white/10'} rounded-2xl px-6 py-4 text-white cursor-pointer flex justify-between items-center hover:bg-white/[0.06] transition-all`}
      >
        <span className={selected ? "text-white" : "text-gson-sand/40"}>
          {selected || placeholder}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-gson-yellow transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </div>

      {isOpen && (
        <ul className="absolute top-[105%] left-0 w-full bg-[#121212] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in zoom-in duration-200">
          {options.map((opt: string) => (
            <li 
              key={opt} 
              onClick={() => { setSelected(opt); setIsOpen(false); }} 
              className="px-6 py-4 text-gson-sand hover:bg-gson-yellow hover:text-gson-black transition-colors cursor-pointer font-bold uppercase text-[10px] tracking-widest"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}