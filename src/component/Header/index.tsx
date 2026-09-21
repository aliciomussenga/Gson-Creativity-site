import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import logo from "../../assets/logo.png"

function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Agência", path: "/Sobre" },
        { name: "Expertise", path: "/Servicos" },
        // { name: "Portifólio", path: "/Obras" },
        { name: "Contato", path: "/Contato" },
    ]

    const prefersReducedMotion = useReducedMotion()

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-gson-black/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-[7%] py-4 flex justify-between items-center">
                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="z-[110]"
                >
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="transition-transform hover:scale-105 active:scale-95"
                    >
                        <img
                            src={logo}
                            alt="Gson Creativity"
                            className="w-16 sm:w-19 md:w-23 lg:w-25 h-auto object-contain"
                        />
                    </Link>
                </motion.div>

                {/* DESKTOP NAV */}
                <motion.nav
                    className="hidden md:flex items-center gap-10"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: 0.05,
                    }}
                >
                    {navLinks.slice(0, 3).map(link => (
                        <motion.div
                            key={link.path}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to={link.path}
                                className={`text-xs uppercase tracking-[0.3em] font-black transition-all hover:text-gson-yellow ${
                                    isActive(link.path)
                                        ? "text-gson-yellow"
                                        : "text-white"
                                }`}
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/Contato"
                            className="px-6 py-2 border border-gson-yellow text-gson-yellow text-xs uppercase tracking-widest font-black rounded-full hover:bg-gson-yellow hover:text-gson-black transition-all"
                        >
                            Iniciar Projeto
                        </Link>
                    </motion.div>
                </motion.nav>

                {/* MOBILE TRIGGER (HAMBURGER) */}
                <button
                    className="md:hidden z-[110] text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X size={32} className="text-gson-yellow" />
                    ) : (
                        <Menu size={32} />
                    )}
                </button>

                {/* MOBILE MENU OVERLAY */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed h-60 top-24 inset-x-0 bg-gson-black/90 backdrop-blur-md border-b border-white/5 z-[100] flex flex-col p-5 justify-center gap-8"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: prefersReducedMotion ? 0 : 0.35,
                            }}
                        >
                            {navLinks.map(link => (
                                <motion.div
                                    key={link.path}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-2x uppercase tracking-[0.3em] font-black ${
                                            isActive(link.path)
                                                ? "text-gson-yellow"
                                                : "text-white"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default Header
