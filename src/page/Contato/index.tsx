import ContactInfo from "../../component/sections/ContactInfo"
import ContactForm from "../../component/sections/ContactForm"
import GsonMap from "../../component/sections/GsonMap"
import { motion } from "framer-motion"

function Contato() {
    return (
        <main className="bg-gson-black min-h-screen pt-32 pb-24 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(242,227,12,0.2),transparent_55%)]" />

            <div className="max-w-7xl mx-auto px-[7%]">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-gson-yellow uppercase tracking-widest text-xs mb-12 flex items-center gap-2"
                >
                    <span className="w-4 h-px bg-gson-yellow" />
                    Gson Creativity — Contacto
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>

            {/* Map section — full width below the form */}
            <GsonMap />
        </main>
    )
}

export default Contato
