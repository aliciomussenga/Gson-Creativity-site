import { Monitor, PenTool, Share2, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    id: "web",
    icon: Monitor,
    title: "Desenvolvimento Web & UI/UX",
    description: "Sites institucionais, Landing Pages de alta conversão e E-commerces. Focados em velocidade, SEO e experiência do usuário (Mobile First).",
    details: "Inclui discovery de fluxo, prototipação interativa e otimização de conversão 2x."  
  },
  {
    id: "brand",
    icon: PenTool,
    title: "Design Gráfico & Branding",
    description: "Criação de identidades visuais que contam histórias. Logótipos, manuais de marca e materiais corporativos que transmitem confiança.",
    details: "Aplicações adaptativas para imprensa, social media e ambiente digital em guidelines completos."
  },
  {
    id: "social",
    icon: Share2,
    title: "Gestão de Redes Sociais & Conteúdo",
    description: "Estratégias para manter a sua marca relevante e engajada nas plataformas onde o seu cliente está.",
    details: "Fluxos de conteúdo mensais, relatórios com métricas e propostas de mídia paga com foco em conversão."
  },
  {
    id: "consultoria",
    icon: Lightbulb,
    title: "Consultoria Criativa",
    description: "Análise de presença digital e reestruturação da comunicação visual da sua empresa.",
    details: "Diagnóstico completo e roteiro de transformação com etapas acionáveis para 90 dias."
  }
];

interface ServiceGridProps {
  onSelect: (service: { title: string; description: string; details: string }) => void;
}

export default function ServiceGrid({ onSelect }: ServiceGridProps) {
  const [interest, setInterest] = useState<Record<string, number>>({});

  const interestCount = useMemo(() => {
    return services.reduce((acc, service) => {
      acc[service.id] = interest[service.id] ?? 0;
      return acc;
    }, {} as Record<string, number>);
  }, [interest]);

  const handleInterest = (id: string) => {
    setInterest((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
          index={index}
          interestCount={interestCount[service.id] ?? 0}
          onInterest={() => handleInterest(service.id)}
          onCaseStudy={() => onSelect({ title: service.title, description: service.description, details: service.details })}
        />
      ))}
    </section>
  );
}
