import ContactInfo from "../../sections/ContactInfo";
import ContactForm from "../../sections/ContactForm";

function Contato() {
  return (
    <main className="bg-gson-black min-h-screen pt-48 pb-20 px-[7%]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <ContactInfo />
        <ContactForm />
      </div>
    </main>
  );
}

export default Contato;