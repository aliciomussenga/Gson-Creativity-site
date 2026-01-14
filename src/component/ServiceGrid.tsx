import { Monitor, PenTool, Share2, Lightbulb } from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Monitor,
    title: "Desenvolvimento Web & UI/UX",
    description: "Sites institucionais, Landing Pages de alta conversão e E-commerces. Focados em velocidade, SEO e experiência do usuário (Mobile First)."
  },
  {
    icon: PenTool,
    title: "Design Gráfico & Branding",
    description: "Criação de identidades visuais que contam histórias. Logótipos, manuais de marca e materiais corporativos que transmitem confiança."
  },
  {
    icon: Share2,
    title: "Gestão de Redes Sociais & Conteúdo",
    description: "Estratégias para manter a sua marca relevante e engajada nas plataformas onde o seu cliente está."
  },
  {
    icon: Lightbulb,
    title: "Consultoria Criativa",
    description: "Análise de presença digital e reestruturação da comunicação visual da sua empresa."
  }
];

export default function ServiceGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} index={index} />
      ))}
    </section>
  );
}