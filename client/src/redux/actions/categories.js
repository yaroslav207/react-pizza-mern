import axios from "axios";


export const setLoadedCategories = (payload) => ({
    type: 'SET_LOADED_CATEGORIES',
    payload,
})

export const fetchCategories = () => (dispatch) => {
    dispatch(setLoadedCategories(false))
    axios.get(`/api/categories/`)
        .then(({data}) => {
            console.log(data)
            dispatch(setCategories(data));
        })
}

export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    payload: categories
})
