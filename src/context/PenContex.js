import React, { useReducer } from 'react';
import { penReducer } from '../reducers/penReducer';
const { createContext } = require("react");

export const penInitialState = {
    color: '#000000',
    weight: 5,
    isHighlighter:  false,
    action: 'pen'
}

// actions: 
//     pen
//     figures
//     text
//     eraser

export const penContext = createContext({});

export const PenContextProvider = ({children}) => {

    const [penState, dispatch] = useReducer(penReducer, penInitialState)
 
    const changePenColor = (color) => {
        dispatch({type:'change-color', payload: color});
    }

    const changePenWeight = (weight) => {
        dispatch({type:'change-weight', payload: weight});
    }

    const setIsHighlighter = () => {
        dispatch({type:'change-highlighter'});
    }

    const setUserAction = (action) => {
        dispatch({type:'change-action', payload: action});
    }

    return (
        <penContext.Provider value={{penState, changePenColor, changePenWeight, setIsHighlighter, setUserAction}}>
            {children}
        </penContext.Provider>
    )
}