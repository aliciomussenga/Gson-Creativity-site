import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onCaseStudy: () => void;
}

export default function ServiceCard({ icon: Icon, title, description, index, selected, onSelect, onCaseStudy }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.99 }}
      className="group relative p-8 md:p-12 bg-white border border-gson-black/10 rounded-[32px] hover:border-gson-yellow hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      tabIndex={0}
      role="article"
      aria-label={`Serviço: ${title}`}
    >
      <div className="text-gson-yellow mb-8 ">
        <Icon size={48} strokeWidth={1.5} aria-hidden="true" />
      </div>

      <span className="text-gson-black/15 font-black text-4xl absolute top-8 right-10">
        0{index + 1}
      </span>

      <h3 className="text-gson-black text-2xl md:text-3xl font-bold mb-6 leading-tight">
        {title}
      </h3>

      <p className="text-gson-black/65 font-light leading-relaxed text-lg">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <button
          onClick={onSelect}
          aria-label={`${selected ? "Remover" : "Adicionar"} ${title} à conversa`}
          aria-pressed={selected}
          className={`text-sm px-4 py-2 rounded-full font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gson-yellow transition transform active:scale-95 ${selected ? "bg-gson-black text-white" : "bg-gson-yellow text-gson-black hover:bg-gson-gold"}`}
        >
          {selected ? "Na conversa ✓" : "Adicionar à conversa"}
        </button>
        <button
          onClick={onCaseStudy}
          aria-label={`Abrir caso de estudo de ${title}`}
          className="text-sm px-4 py-2 rounded-full font-bold border border-gson-black/20 text-gson-black hover:bg-gson-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gson-yellow transition"
        >
          Como abordamos
        </button>
      </div>

      <div className="mt-auto pt-8">
        <div className="h-[1px] w-0 group-hover:w-full bg-gson-yellow transition-all duration-700"></div>
      </div>
    </motion.div>
  );
}
