"use client"

import { createContext, useContext } from "react"

const ThemeContext = createContext({})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
}