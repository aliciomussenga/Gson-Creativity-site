import { Lightbulb, Shield, Eye } from "lucide-react";

const pilarData = [
  {
    icon: <Lightbulb size={32} />,
    title: "Inovação",
    desc: "Fugir do óbvio é a nossa regra número um."
  },
  {
    icon: <Shield size={32} />,
    title: "Robustez",
    desc: "Beleza sem funcionalidade é apenas decoração. Nós criamos sistemas que funcionam."
  },
  {
    icon: <Eye size={32} />,
    title: "Transparência",
    desc: "Você acompanha cada passo do processo criativo."
  }
];

export default function Pilares() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {pilarData.map((pilar, index) => (
          <div key={index} className="space-y-6 group">
            <div className="text-gson-yellow group-hover:scale-110 transition-transform duration-500">
              {pilar.icon}
            </div>
            <h3 className="text-white text-2xl font-bold uppercase tracking-widest">
              {pilar.title}
            </h3>
            <p className="text-gson-sand/60 text-lg font-light leading-relaxed">
              {pilar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}