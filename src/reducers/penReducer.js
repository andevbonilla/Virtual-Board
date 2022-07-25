export const penReducer = (penState, action) => {

    switch (action.type) {
        case 'change-color':
            return {
                      ...penState,
                      color: action.payload
                   }

        case 'change-weight':
            return {
                       ...penState,
                       weight: action.payload
                   }

        case 'change-highlighter':
            return {
                       ...penState,
                       isHighlighter: !penState.isHighlighter
                   }

        case 'change-action':
           return {
                        ...penState,
                        action: action.payload
                  }
    
        default:
            return penState
    }
    
}