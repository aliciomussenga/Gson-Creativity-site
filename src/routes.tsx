import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from './page/Home';
import Header from "./component/Header";
import Sobre from "./page/Sobre";
import Servicos from "./page/Servicos";
import Contato from "./page/Contato";
import Erro from "./page/Erro";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import PageTransition from "./component/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><Sobre /></PageTransition>} />
        <Route path="/servicos" element={<PageTransition><Servicos /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
        <Route path="*" element={<PageTransition><Erro /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function Approutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default Approutes;
