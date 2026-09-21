import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import CaseStudyGrid from "./CaseStudyGrid"

describe("CaseStudyGrid", () => {
    it("deve filtrar estudos por segmento", () => {
        render(<CaseStudyGrid />)

        expect(
            screen.getByText(/E-commerce de luxo - conversão \+120%/i)
        ).toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", { name: /SaaS/i }))
        expect(
            screen.queryByText(/E-commerce de luxo - conversão \+120%/i)
        ).not.toBeInTheDocument()
        expect(
            screen.getByText(/SaaS fintech - retenção \+33%/i)
        ).toBeInTheDocument()
    })
})
