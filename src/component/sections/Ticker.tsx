export default function Ticker() {
  const items = ["+50 Projetos Entregues", "Design de Alta Performance", "Estratégias Digitais", "Inovação Visual"];
  
  return (
    <div className="bg-gson-yellow py-6 overflow-hidden whitespace-nowrap border-y border-gson-black">
      <div className="flex animate-marquee">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="text-gson-black font-black uppercase tracking-tighter text-2xl mx-12 flex items-center">
            • {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
}