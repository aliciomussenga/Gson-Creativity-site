import { Route, Routes, BrowserRouter } from "react-router-dom"
import Home from './page/Home';
import Header from "./component/Header";
import Sobre from "./page/Sobre";
import Servicos from "./page/Servicos";
import Contato from "./page/Contato";
import Erro from "./page/Erro";
import Footer from "./component/Footer";



function Approutes() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sobre" element={<Sobre/>}/>
        <Route path="/servicos" element={<Servicos/>} />
        <Route path="/contato" element={<Contato/>}/>
        <Route path="*" element={<Erro/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default Approutes