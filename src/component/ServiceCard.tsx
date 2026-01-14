import { type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  return (
    <div className="group relative p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-gson-yellow/30 transition-all duration-500 flex flex-col h-full">
      <div className="text-gson-yellow mb-8 ">
        <Icon size={48} strokeWidth={1.5} />
      </div>
      
      <span className="text-gson-sand/20 font-black text-4xl absolute top-8 right-10">
        0{index + 1}
      </span>

      <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 leading-tight">
        {title}
      </h3>
      
      <p className="text-gson-sand/60 font-light leading-relaxed text-lg">
        {description}
      </p>

      <div className="mt-auto pt-8">
        <div className="h-[1px] w-0 group-hover:w-full bg-gson-yellow transition-all duration-700"></div>
      </div>
    </div>
  );
}