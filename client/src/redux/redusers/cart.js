const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
    orderConfirmation: false
}


const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_CART':
            console.log(action.payload)

            const currentPizzaItems = !state.items[action.payload.id] ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const items = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPriceItems: currentPizzaItems.length * action.payload.price
                }
            };

            const allPizzas = [].concat.apply([], Object.values(items).map((obj => obj.items)));

            return {
                ...state,
                items: items,
                totalCount: allPizzas.length,
                totalPrice: allPizzas.reduce((sum, obj) => obj.price + sum, 0)
            };

        case 'CLEAR_CART':
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0,
                orderConfirmation: false
            };

        case 'DELETE_PIZZA':
            const newItems = {
                ...state.items
            };
            const totalPriceItem = newItems[action.payload].totalPriceItems
            const totalCountItem = newItems[action.payload].items.length

            delete newItems[action.payload];
            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount - totalCountItem,
                totalPrice: state.totalPrice - totalPriceItem,
            };

        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[action.payload].items
            console.log(oldItems)
            if (oldItems.length <= 1){
                return state
            }

            const newItems = oldItems.slice(1)

            const newState = {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: {
                        items: newItems,
                        totalPriceItems: newItems.length * newItems[0].price
                    }
                },
                totalPrice: state.totalPrice - newItems[0].price,
                totalCount: state.totalCount - 1
            };
            return newState
        }

        case 'PLUS_CART_ITEM': {
            const newItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: {
                        items: newItems,
                        totalPriceItems: newItems.length * newItems[0].price
                    }
                },
                totalPrice: state.totalPrice + newItems[0].price,
                totalCount: state.totalCount + 1
            };
        }

        case 'ORDER_CONFIRMATION': {
            return {
                ...state,
                orderConfirmation: action.payload
            }
        }
    }
    return state;
}

export default cart;