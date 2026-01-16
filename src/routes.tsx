import { Route, Routes, BrowserRouter } from "react-router-dom"
import Home from './page/Home';
import Header from "./component/Header";
import Sobre from "./page/Sobre";
import Servicos from "./page/Servicos";
import Contato from "./page/Contato";
import Erro from "./page/Erro";
import Footer from "./component/Footer";
// import Obras from "./page/Obras";
import ScrollToTop from "./component/ScrollToTop";
import PageTransition from "./component/PageTrasition";



function Approutes() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes>
        <Route path="/" element={  <PageTransition><Home/></PageTransition>} />

        <Route path="/sobre" element={<PageTransition><Sobre/></PageTransition>}/>
        <Route path="/servicos" element={<PageTransition><Servicos/></PageTransition>} />
        {/* <Route path="/obras" element={<Obras/>} /> */}
        <Route path="/contato" element={<PageTransition><Contato/></PageTransition>}/>



        <Route path="*" element={  <PageTransition><Erro/></PageTransition>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default Approutes