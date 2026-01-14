import { Mail, Phone, LocateFixed} from "lucide-react";

export default function ContactInfo() {
  const items = [
    { icon: <Mail size={20} />, label: "E-mail", value: "creativitygson@gmail.com" },
    { icon: <Phone size={20} />, label: "WhatsApp", value: "+244 933 648 881" },
    { icon: <LocateFixed size={20} />, label: "Localização", value: "Luanda, Angola" },
  ];

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-10 tracking-tighter">
        VAMOS TIRAR A IDEIA DO <span className="text-transparent border-text">PAPEL?</span>
      </h1>
      
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gson-yellow group-hover:bg-gson-yellow group-hover:text-gson-black transition-all">
              {item.icon}
            </div>
            <div>
              <p className="text-gson-sand/40 text-[10px] uppercase tracking-widest">{item.label}</p>
              <p className="text-white font-medium text-lg">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`.border-text { -webkit-text-stroke: 1px #F2E30C; }`}</style>
    </div>
  );
}