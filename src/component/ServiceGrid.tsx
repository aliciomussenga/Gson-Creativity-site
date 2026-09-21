import { Monitor, PenTool, Share2, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const services = [
  {
    id: "web",
    icon: Monitor,
    title: "Desenvolvimento Web & UI/UX",
    description: "Sites institucionais, Landing Pages de alta conversão e E-commerces. Focados em velocidade, SEO e experiência do usuário (Mobile First).",
    details: "Começamos por perceber quem usa, que decisão o site precisa facilitar e qual é o conteúdo essencial. Depois desenhamos e desenvolvemos por etapas."
  },
  {
    id: "brand",
    icon: PenTool,
    title: "Design Gráfico & Branding",
    description: "Criação de identidades visuais que contam histórias. Logótipos, manuais de marca e materiais corporativos que transmitem confiança.",
    details: "Definimos a linguagem visual e as aplicações prioritárias para que a marca se mantenha reconhecível nos seus canais reais."
  },
  {
    id: "social",
    icon: Share2,
    title: "Gestão de Redes Sociais & Conteúdo",
    description: "Estratégias para manter a sua marca relevante e engajada nas plataformas onde o seu cliente está.",
    details: "Planeamos temas, formatos e ritmo editorial a partir dos objectivos, público e capacidade da equipa para manter a presença activa."
  },
  {
    id: "consultoria",
    icon: Lightbulb,
    title: "Consultoria Criativa",
    description: "Análise de presença digital e reestruturação da comunicação visual da sua empresa.",
    details: "Mapeamos a presença actual, prioridades e oportunidades para criar um caminho realista antes de investir na execução."
  }
];

interface ServiceGridProps {
  onSelect: (service: { title: string; description: string; details: string }) => void;
}

export default function ServiceGrid({ onSelect }: ServiceGridProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const selectedServices = useMemo(() => services.filter((service) => selected.includes(service.id)), [selected]);

  const toggleService = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <section className="py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
          index={index}
          selected={selected.includes(service.id)}
          onSelect={() => toggleService(service.id)}
          onCaseStudy={() => onSelect({ title: service.title, description: service.description, details: service.details })}
        />
      ))}</div>
      <div className="mt-8 rounded-3xl border border-gson-black/10 bg-gson-black p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-gson-yellow" size={19} /><div><p className="font-bold">{selectedServices.length ? `Vamos falar sobre ${selectedServices.map((service) => service.title).join(", ")}.` : "Escolhe os serviços que fazem sentido para o teu momento."}</p><p className="mt-1 text-sm leading-relaxed text-white/60">Não é uma encomenda nem uma estimativa automática. É apenas um ponto de partida para uma conversa mais clara.</p></div></div>
        <Link to="/contato" className="mt-5 inline-flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-widest text-gson-yellow transition hover:text-white sm:mt-0">Iniciar conversa <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
