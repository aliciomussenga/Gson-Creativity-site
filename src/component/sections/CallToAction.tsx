import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-40 text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,227,12,0.12),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black text-white leading-tight"
        >
          A SUA MARCA MERECE SAIR DO <span className="text-gson-yellow">ANONIMATO.</span>
        </motion.h2>

        <Link to="/contato" className="relative inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white text-gson-black px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter hover:bg-gson-yellow hover:text-gson-black transition-all"
          >
            Vamos Construir o Futuro
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
