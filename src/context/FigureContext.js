import React, { useReducer } from 'react';
import { figureReducer } from '../reducers/figureReducer';
const { createContext } = require("react");

export const figureInitialState = {
    figureSelected: false,
    figure: 'circle'
}

export const figureContext = createContext({});

export const FigureContextProvider = ({children}) => {

    const [figureState, dispatch] = useReducer(figureReducer, figureInitialState)
 
    const changeFigure = (figure) => {
        dispatch({type:'change-figure', payload: figure});
    }

    const changeIsAddingFigure = () => {
        dispatch({type:'change-is-adding-figure'});
    }


    return (
        <figureContext.Provider value={{figureState, changeFigure, changeIsAddingFigure}}>
            {children}
        </figureContext.Provider>
    )
}