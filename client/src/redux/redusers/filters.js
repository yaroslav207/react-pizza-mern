const initialState = {
    category: null,
    sortBy: 'popular',
    order: 'desc'
}

const filters = (state = initialState, action) => {
    if(action.type === 'SET_SORT_BY'){
        return {
            ...state,
            sortBy: action.payload.type,
            order: action.payload.order
        }
    }
    if (action.type === 'SET_CATEGORY'){
        return {
            ...state,
            category: action.payload
        }
    }
    return state;
}

export default filters