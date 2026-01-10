import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  label: string;
  options: string[];
  placeholder?: string;
}

export default function CustomSelect({ label, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef}>
      <label className="text-gson-yellow text-[10px] uppercase tracking-[0.2em] ml-2 font-black">
        {label}
      </label>

      {/* Gatilho do Select */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white/[0.03] border ${isOpen ? 'border-gson-yellow' : 'border-white/10'} rounded-2xl px-6 py-4 text-white cursor-pointer transition-all flex justify-between items-center hover:bg-white/[0.07]`}
      >
        <span className={selected ? "text-white" : "text-gson-sand/40"}>
          {selected || placeholder || "Selecione uma opção"}
        </span>
        <ChevronDown size={18} className={`text-gson-yellow transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* A DIV QUE APARECE (O Menu de Opções) */}
      {isOpen && (
        <ul className="absolute top-[105%] left-0 w-full bg-[#121212] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in zoom-in duration-200">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="px-6 py-4 text-gson-sand hover:bg-gson-yellow hover:text-gson-black transition-colors cursor-pointer font-medium"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}