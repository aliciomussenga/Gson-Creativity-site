import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Link } from "react-router-dom"

interface ServiceModalProps {
    open: boolean
    onClose: Dispatch<SetStateAction<boolean>>
    service: {
        title: string
        description: string
        details: string
    } | null
}

function getFocusableElements(container: HTMLElement | null) {
    if (!container) return [] as HTMLElement[]
    const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    return Array.from(focusable)
}

export default function ServiceModal({
    open,
    onClose,
    service,
}: ServiceModalProps) {
    const shouldReduceMotion = useReducedMotion()
    const modalRef = useRef<HTMLDivElement>(null)
    const lastFocused = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!open) {
            lastFocused.current?.focus()
            return
        }

        lastFocused.current = document.activeElement as HTMLElement

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                onClose(false)
                return
            }

            if (event.key === "Tab") {
                const focusable = getFocusableElements(modalRef.current)
                if (focusable.length === 0) return

                const currentIndex = focusable.indexOf(
                    document.activeElement as HTMLElement
                )
                let nextIndex = currentIndex

                if (event.shiftKey) {
                    nextIndex =
                        currentIndex <= 0
                            ? focusable.length - 1
                            : currentIndex - 1
                } else {
                    nextIndex =
                        currentIndex === focusable.length - 1
                            ? 0
                            : currentIndex + 1
                }

                event.preventDefault()
                focusable[nextIndex]?.focus()
            }
        }

        const timer = window.setTimeout(() => {
            const focusable = getFocusableElements(modalRef.current)
            if (focusable.length > 0) focusable[0].focus()
        }, 0)

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            window.clearTimeout(timer)
            document.removeEventListener("keydown", handleKeyDown)
            lastFocused.current?.focus()
        }
    }, [open, onClose])

    const modalTransition = useMemo(() => {
        if (shouldReduceMotion) return { duration: 0 }
        return { duration: 0.25 }
    }, [shouldReduceMotion])

    return (
        <AnimatePresence>
            {open && service && (
                <motion.div
                    className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onClose(false)}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-gson-black border border-white/10 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl"
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={modalTransition}
                        onClick={event => event.stopPropagation()}
                    >
                        <button
                            onClick={() => onClose(false)}
                            aria-label="Fechar detalhes do serviço"
                            className="absolute top-4 right-4 text-gson-sand/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gson-yellow"
                        >
                            ✕
                        </button>

                        <h3 className="text-white text-3xl md:text-4xl font-black mb-3">
                            {service.title}
                        </h3>
                        <p className="text-gson-sand/80 text-lg mb-4">
                            {service.description}
                        </p>
                        <p className="text-gson-sand leading-relaxed mb-6">
                            {service.details}
                        </p>

                        <ul className="space-y-2 text-gson-sand/80">
                            <li>• Contexto, objectivos e pessoas que vão usar</li>
                            <li>• Escopo priorizado de acordo com o momento do projecto</li>
                            <li>• Forma de colaboração e entregas que façam sentido</li>
                            <li>• Próximos passos definidos depois de uma conversa inicial</li>
                        </ul>

                        <Link to="/contato" onClick={() => onClose(false)} className="mt-6 inline-block bg-gson-yellow text-gson-black py-3 px-6 rounded-full font-bold uppercase hover:bg-gson-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gson-yellow">Falar sobre este serviço</Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
