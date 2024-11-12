import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const useTheme = () => {
    const context = useContext(ThemeContext) // returns object with value of context constant

    if(context === undefined) { // the context would be undefined if we are trying to use the context out of scope
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }

    return context
}