import Hero from "../../sections/Hero";
import Ticker from "../../sections/Ticker";
import Metodo from "../../sections/Metodo";
import CallToAction from "../../sections/CallToAction";

function Home() {
  return (
    <div className="bg-gson-black overflow-x-hidden pt-20">
      <Hero />
      <Ticker />
      <Metodo />
      <CallToAction />
    </div>
  );
}

export default Home;