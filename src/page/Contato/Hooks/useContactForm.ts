import { type FormEvent, useState } from "react"

export function useContactForm(endpoint: string) {
    // Estados para controlar o fluxo do formulário
    const [status, setStatus] = useState<
        "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
    >("IDLE")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("SENDING")

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            })

            if (response.ok) {
                setStatus("SUCCESS")
            } else {
                setStatus("ERROR")
            }
        } catch {
            setStatus("ERROR")
        }
    }

    const resetStatus = () => setStatus("IDLE")

    return { status, handleSubmit, resetStatus }
}
