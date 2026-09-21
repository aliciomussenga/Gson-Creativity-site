import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const ALL_TECHS = [
    { name: "Python / Django", cat: "Backend",   icon: "🐍" },
    { name: "Node.js",         cat: "Backend",   icon: "🟩" },
    { name: "Go",              cat: "Backend",   icon: "🔵" },
    { name: "PostgreSQL",      cat: "Database",  icon: "🐘" },
    { name: "Redis",           cat: "Database",  icon: "🔴" },
    { name: "MongoDB",         cat: "Database",  icon: "🍃" },
    { name: "Flutter",         cat: "Mobile",    icon: "💙" },
    { name: "React / Next",    cat: "Frontend",  icon: "⚛️"  },
    { name: "TypeScript",      cat: "Frontend",  icon: "🔷" },
    { name: "Docker",          cat: "DevOps",    icon: "🐳" },
    { name: "Kubernetes",      cat: "DevOps",    icon: "☸️"  },
    { name: "AWS / EC2",       cat: "DevOps",    icon: "☁️"  },
    { name: "REST APIs",       cat: "Arch",      icon: "🔗" },
    { name: "GraphQL",         cat: "Arch",      icon: "◉"  },
    { name: "Microservices",   cat: "Arch",      icon: "⚙️"  },
    { name: "Odoo ERP",        cat: "Backend",   icon: "🟣" },
]

const CATS = ["Todos", "Backend", "Frontend", "Mobile", "Database", "DevOps", "Arch"]

function TechCard({ tech, index }: { tech: typeof ALL_TECHS[0]; index: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 bg-[#fff9de] border border-gson-black/10 hover:border-gson-yellow hover:bg-gson-yellow/10 rounded-xl px-4 py-3 transition-colors group cursor-default"
        >
            <span className="text-xl leading-none">{tech.icon}</span>
            <div>
                <p className="text-gson-black text-sm font-bold group-hover:text-gson-gold transition-colors">{tech.name}</p>
                <p className="text-gson-black/45 text-[9px] uppercase tracking-widest">{tech.cat}</p>
            </div>
        </motion.div>
    )
}

export default function TechStack() {
    const [active, setActive] = useState("Todos")
    const layoutRef = useRef<HTMLDivElement>(null)

    const filtered = active === "Todos"
        ? ALL_TECHS
        : ALL_TECHS.filter(t => t.cat === active)

    // anime.js createLayout — smooth reflow when filter changes
    useEffect(() => {
        const el = layoutRef.current
        if (!el) return
        let cleanupFn: (() => void) | null = null
        ;(async () => {
            const { createLayout } = await import("animejs/layout")
            const layout = createLayout(el, {
                duration: 450,
                ease: "outExpo",
            })
            cleanupFn = () => layout.cancel?.()
        })()
        return () => { cleanupFn?.() }
    }, [active])

    return (
        <section className="py-28 px-[7%] bg-[#f2e1ae] border-t border-gson-black/10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <p className="text-gson-yellow text-[11px] uppercase tracking-widest mb-3">Stack técnico</p>
                    <h2 className="text-4xl md:text-5xl font-black text-gson-black leading-tight max-w-xl">
                        Ferramentas que podemos usar para construir consigo.
                    </h2>
                </motion.div>

                {/* Filter tabs — individual CSS transforms via anime.js WAAPI */}
                <FilterTabs active={active} onSelect={setActive} />

                {/* Tech grid — animated reflow with createLayout */}
                <div
                    ref={layoutRef}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-8"
                >
                    {filtered.map((tech, i) => (
                        <TechCard key={tech.name} tech={tech} index={i} />
                    ))}
                </div>

                {/* Bottom stat line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-gson-black/45 text-xs uppercase tracking-widest mt-10 text-center"
                >
                    Tecnologias escolhidas conforme as necessidades de cada projecto
                </motion.p>
            </div>
        </section>
    )
}

// Filter tabs with anime.js individual CSS transforms (translateX + scale independent)
function FilterTabs({ active, onSelect }: { active: string; onSelect: (c: string) => void }) {
    const tabsRef = useRef<HTMLDivElement>(null)

    const handleSelect = async (cat: string) => {
        onSelect(cat)
        // Animate the selected tab with individual CSS transforms
        const tabs = tabsRef.current?.querySelectorAll("[data-tab]")
        if (!tabs) return
        const { animate } = await import("animejs")
        tabs.forEach((tab) => {
            const isActive = tab.getAttribute("data-tab") === cat
            animate(tab as HTMLElement, {
                scale: isActive ? [1, 1.08, 1] : 1,
                y: isActive ? [0, -3, 0] : 0,
                duration: 380,
                ease: "outBack(2)",
            })
        })
    }

    return (
        <div ref={tabsRef} className="flex flex-wrap gap-2">
            {CATS.map(cat => (
                <button
                    key={cat}
                    data-tab={cat}
                    onClick={() => handleSelect(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                        active === cat
                            ? "bg-gson-yellow text-gson-black border-gson-yellow"
                            : "border-gson-black/15 text-gson-black/60 hover:border-gson-black/40 hover:text-gson-black"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}
