import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()   

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, color: action.payload}
        default: 
            return state
    }
}

export function ThemeProvider({ children }) {

    const [state, dispatch]= useReducer(themeReducer, { //dispatch allows you to send an action in the reducer function. It is the function you use to trigger an action in the reducer
        color: '#58249c'
    })

    //themeReducer is the function we use to update the state and the second argument is an object containing the inital state 

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color}) // type is the type of state change (usually a string, capitalised), the payload is the data that we want to base the state change on
    }

    return (
        <ThemeContext.Provider value={{ ...state, changeColor }}>
            {children}
        </ThemeContext.Provider>
    )
} 