import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import ServiceModal from "./ServiceModal"

describe("ServiceModal", () => {
    const service = {
        title: "Teste Serviço",
        description: "Descrição de teste",
        details: "Detalhes profundos",
    }

    it("deve abrir, mostrar conteúdo e fechar via ESC", async () => {
        const onClose = vi.fn()

        render(<ServiceModal open={true} onClose={onClose} service={service} />)

        // Verifica se o conteúdo está renderizado
        expect(screen.getByText(service.title)).toBeInTheDocument()
        expect(screen.getByText(service.description)).toBeInTheDocument()
        expect(screen.getByText(service.details)).toBeInTheDocument()

        // Dispara o evento ESC no documento
        await waitFor(() => {
            fireEvent.keyDown(document, { key: "Escape", code: "Escape" })
        })

        // Aguarda a chamada da função
        await waitFor(() => {
            expect(onClose).toHaveBeenCalledWith(false)
        })
    })
})
