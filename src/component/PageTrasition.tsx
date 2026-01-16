import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Começa invisível
      animate={{ opacity: 1 }} // Aparece
      transition={{ duration: 0.5, ease: "easeInOut" }} // Velocidade da transição
    >
      {children}
    </motion.div>
  );
}