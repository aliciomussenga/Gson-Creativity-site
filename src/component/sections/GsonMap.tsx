import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, ExternalLink, Copy, Check, Building2, Clock, Coffee } from "lucide-react"

// Gson Creativity coordinates — Talatona, Luanda Sul
const COORDS = { lat: -8.9167, lng: 13.2167 }
const ADDRESS = "Talatona, Luanda Sul, Angola"
const GMAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${COORDS.lat},${COORDS.lng}`

const nearbyPoints = [
    { emoji: "🏢", name: "Centro Convenções Talatona", dist: "2 min a pé" },
    { emoji: "🛒", label: "Shoprite Talatona", dist: "5 min" },
    { emoji: "✈️", name: "Aeroporto 4 de Fevereiro", dist: "20 min" },
    { emoji: "🌊", name: "Ilha de Luanda", dist: "30 min" },
]

function StaticMapFallback() {
    return (
        <div
            className="relative w-full h-full overflow-hidden"
            style={{ background: "#dcdc5a" }}
        >
            {/* Simulated street grid matching the snazzy style */}
            <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                {/* Background */}
                <rect width="600" height="400" fill="#dcdc5a" />

                {/* Major roads — lighter */}
                <g stroke="#c8c830" strokeWidth="8" fill="none" opacity="0.7">
                    {/* Av. Luanda Sul diagonal */}
                    <path d="M 0 320 L 600 200" />
                    {/* Via A2 */}
                    <path d="M 300 0 L 400 400" />
                    {/* Av. Pedro de Castro */}
                    <path d="M 0 120 L 600 80" />
                </g>

                {/* Secondary roads */}
                <g stroke="#b8b820" strokeWidth="4" fill="none" opacity="0.5">
                    <path d="M 0 200 L 600 180" />
                    <path d="M 150 0 L 200 400" />
                    <path d="M 450 0 L 500 400" />
                    <path d="M 0 280 L 600 290" />
                    <path d="M 50 0 L 80 400" />
                    <path d="M 0 350 L 600 360" />
                </g>

                {/* Tertiary streets — dense grid */}
                <g stroke="#a8a810" strokeWidth="1.5" fill="none" opacity="0.35">
                    {[60, 90, 120, 160, 230, 260, 330, 380, 420, 480, 540].map(x => (
                        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
                    ))}
                    {[40, 70, 100, 140, 160, 240, 260, 300, 340, 370].map(y => (
                        <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} />
                    ))}
                </g>

                {/* Block fills (buildings) */}
                <g fill="#c8c820" opacity="0.3">
                    {[
                        [30, 30, 50, 40], [90, 25, 40, 35], [180, 20, 60, 30],
                        [290, 30, 45, 25], [370, 15, 55, 40], [440, 25, 50, 30],
                        [30, 160, 60, 45], [110, 155, 45, 50], [200, 150, 70, 40],
                        [310, 160, 50, 45], [400, 155, 55, 50],
                        [30, 310, 55, 40], [110, 305, 40, 45], [200, 300, 65, 40],
                    ].map(([x, y, w, h], i) => (
                        <rect key={i} x={x} y={y} width={w} height={h} rx="2" />
                    ))}
                </g>

                {/* Water — Luanda Bay hint on left */}
                <path d="M 0 0 L 60 0 L 40 150 L 0 200 Z" fill="#b0b010" opacity="0.4" />

                {/* Neighbourhood labels */}
                <g fill="#1a2744" fontFamily="sans-serif" fontSize="11" fontWeight="bold" opacity="0.7">
                    <text x="300" y="230" textAnchor="middle">Talatona</text>
                    <text x="160" y="80" textAnchor="middle" fontSize="9">Luanda Sul</text>
                    <text x="450" y="60" textAnchor="middle" fontSize="9">Nova Vida</text>
                    <text x="480" y="370" textAnchor="middle" fontSize="9">Mbondo Chapé</text>
                </g>

                {/* Road name labels */}
                <g fill="#1a2744" fontFamily="sans-serif" fontSize="8" opacity="0.6" fontStyle="italic">
                    <text x="300" y="300" textAnchor="middle" transform="rotate(-10, 300, 300)">Av. Luanda Sul</text>
                    <text x="100" y="330" textAnchor="middle" transform="rotate(-70, 100, 330)">Via S8</text>
                    <text x="350" y="150" textAnchor="middle" transform="rotate(-5, 350, 150)">Av. Pedro de Castro Van-Dúnem Loy</text>
                </g>
            </svg>

            {/* Gson Creativity pin */}
            <div className="absolute" style={{ left: "50%", top: "55%", transform: "translate(-50%, -100%)" }}>
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-gson-black border-2 border-gson-yellow rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                        <span className="text-xs">⚡</span>
                        <span className="text-gson-yellow font-black text-xs">Gson Creativity</span>
                    </div>
                    <div className="w-0.5 h-3 bg-gson-yellow" />
                    <div className="w-3 h-3 rounded-full bg-gson-yellow border-2 border-gson-black shadow" />
                </motion.div>
                {/* Pulse */}
                <motion.div
                    animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gson-yellow"
                />
            </div>

            {/* Overlay gradient bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#dcdc5a]/60 to-transparent" />
        </div>
    )
}

export default function GsonMap() {
    const [copied, setCopied] = useState(false)
    const [mapImageFailed, setMapImageFailed] = useState(false)

    const copyAddress = () => {
        navigator.clipboard.writeText(ADDRESS)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Static map used directly (no API key needed)

    return (
        <section className="py-20 px-[7%] border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <p className="text-gson-yellow text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <MapPin size={12} />
                        Onde nos encontras
                    </p>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            Estamos em{" "}
                            <span className="text-gson-yellow">Talatona,</span>
                            <br />
                            <span className="text-white">Luanda Sul.</span>
                        </h2>
                        <a
                            href={GMAPS_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 border border-gson-yellow/30 text-gson-yellow px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gson-yellow hover:text-gson-black transition-all group"
                        >
                            <Navigation size={14} className="group-hover:rotate-12 transition-transform" />
                            Abrir no Google Maps
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </motion.div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Map — 2/3 width */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-gson-yellow/20"
                        style={{ height: "400px" }}
                    >
                        {/* Mapa real de Talatona com estilo Gson */}
                        <div className="absolute inset-0">
                            {mapImageFailed ? (
                                <StaticMapFallback />
                            ) : (
                                <img
                                    src="/map-talatona.png"
                                    alt="Mapa de Talatona, Luanda — Gson Creativity"
                                    className="w-full h-full object-cover"
                                    style={{ filter: "brightness(0.75) saturate(1.1)" }}
                                    onError={() => setMapImageFailed(true)}
                                />
                            )}
                            {/* Vignette overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,13,13,0.6)_100%)]" />
                        </div>

                        {/* Gson Creativity pin */}
                        <div className="absolute z-10" style={{ left: "42%", top: "58%", transform: "translate(-50%,-100%)" }}>
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <div className="bg-gson-black border-2 border-gson-yellow rounded-xl px-3 py-1.5 shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                                    <span style={{ fontSize: 14 }}>⚡</span>
                                    <span className="text-gson-yellow font-black text-xs">Gson Creativity</span>
                                </div>
                                <div className="w-px h-4 bg-gson-yellow" />
                                <div className="w-3 h-3 rounded-full bg-gson-yellow border-2 border-gson-black shadow-lg" />
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 2.8, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2.2 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gson-yellow/60 pointer-events-none"
                            />
                        </div>

                        {/* Bottom bar overlay */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gson-black/90 via-gson-black/40 to-transparent p-4 flex items-end justify-between">
                            <div>
                                <p className="text-white font-bold text-sm">Gson Creativity</p>
                                <p className="text-gson-sand/60 text-xs">{ADDRESS}</p>
                            </div>
                            <button
                                onClick={copyAddress}
                                className="flex items-center gap-1.5 bg-gson-black/60 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gson-sand hover:border-gson-yellow/30 hover:text-gson-yellow transition-all"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-green-400">
                                            <Check size={12} /> Copiado!
                                        </motion.span>
                                    ) : (
                                        <motion.span key="copy" className="flex items-center gap-1">
                                            <Copy size={12} /> Copiar morada
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right column — info cards */}
                    <div className="flex flex-col gap-4">
                        {/* Office info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="card-glass rounded-2xl border border-white/8 p-5 flex-1"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 size={16} className="text-gson-yellow" />
                                <p className="text-gson-yellow text-[10px] uppercase tracking-widest">O Escritório</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin size={14} className="text-gson-sand/40 mt-0.5 flex-shrink-0" />
                                    <p className="text-gson-sand text-sm leading-relaxed">Talatona, Luanda Sul<br /><span className="text-gson-sand/50 text-xs">Angola</span></p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock size={14} className="text-gson-sand/40 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-gson-sand text-sm">Seg – Sex: 08h00 – 18h00</p>
                                        <p className="text-gson-sand/50 text-xs">Sáb: 09h00 – 14h00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Coffee size={14} className="text-gson-sand/40 mt-0.5 flex-shrink-0" />
                                    <p className="text-gson-sand/70 text-sm">Reuniões presenciais mediante marcação</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Nearby reference points */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="card-glass rounded-2xl border border-white/8 p-5"
                        >
                            <p className="text-gson-yellow text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Navigation size={10} />
                                Pontos de referência
                            </p>
                            <div className="space-y-2.5">
                                {nearbyPoints.map((pt, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{pt.emoji}</span>
                                            <span className="text-gson-sand text-xs">{pt.name || pt.label}</span>
                                        </div>
                                        <span className="text-gson-sand/40 text-[10px]">{pt.dist}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.a
                            href={GMAPS_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-center gap-2 bg-gson-yellow/10 border border-gson-yellow/30 text-gson-yellow rounded-2xl p-4 font-bold text-sm hover:bg-gson-yellow hover:text-gson-black transition-all group"
                        >
                            <Navigation size={16} className="group-hover:rotate-12 transition-transform" />
                            Traçar rota no Google Maps
                        </motion.a>
                    </div>
                </div>

                {/* Map style credit */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-gson-sand/20 text-[10px] mt-4 text-center"
                >
                    Estilo de mapa personalizado · Gson Creativity Brand Colours · Talatona, Luanda Sul 🇦🇴
                </motion.p>
            </div>
        </section>
    )
}
