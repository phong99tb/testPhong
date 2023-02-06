const initState = {
    random: [],
    disconnect: true
}
const rootReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "Random":
            return {
                ...state,
                random: action.payload
            }
        case "Disconnect":
            return {
                ...state,
                disconnect: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;
