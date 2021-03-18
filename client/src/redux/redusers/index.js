import {combineReducers} from 'redux'

import filters from './filters'
import pizzas from './pizzas'
import cart from './cart'
import categories from "./categories";
import auth from "./auth"


const rootReducer = combineReducers({
    filters,
    pizzas,
    cart,
    categories,
    auth
})

export default rootReducer