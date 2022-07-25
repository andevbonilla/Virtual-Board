export const figureReducer = (figureState, action) => {

    switch (action.type) {
        case 'change-figure':
            return {
                      ...figureState,
                      figure: action.payload,
                      figureSelected: true
                   }
        case 'change-is-adding-figure':
            return {
                        ...figureState,
                        figureSelected: !figureState.figureSelected
                    }
    
        default:
            return figureState
    }
    
}