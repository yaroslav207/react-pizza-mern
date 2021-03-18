import axios from "axios";

export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
})

export const fetchPizzas = (category= null, sortBy= 'name', order) => (dispatch) => {
    dispatch(setLoaded(false))
    axios.get(`api/pizza/?${(category !== null)?'category=' + category:''}&_sort=${sortBy}&_order=${order}`)
        .then(({data}) => {
            dispatch(setPizzas(data.pizzas));
        })
}

export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items
})

