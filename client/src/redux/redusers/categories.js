const initialState = {
    categories: [],
    isLoaded: false
}

const categories = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                isLoaded: true
            }
        case 'SET_LOADED_CATEGORIES':
            return {
                ...state,
                isLoaded: action.payload
            }
        default:
            return state;
    }
}

export default categories