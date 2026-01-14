import Hero from "../../component/sections/Hero";
import Ticker from "../../component/sections/Ticker";
import Metodo from "../../component/sections/Metodo";
import CallToAction from "../../component/sections/CallToAction";

function Home() {
  return (
    <div className="bg-gson-black overflow-x-hidden pt-18">
      <Hero />
      <Ticker />
      <Metodo />
      <CallToAction />
    </div>
  );
}

export default Home;