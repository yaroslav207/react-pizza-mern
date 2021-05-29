const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
    orderConfirmation: false
}


const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_CART':
            console.log(action.payload)

            const items = state.items.find((item) => item.id === action.payload.id)
                ? (state.items.map(item => {
                    console.log(item.id === action.payload.id)
                    return(item.id === action.payload.id)
                        ? {...item, count: item.count + 1, totalPriceItems: action.payload.price}
                        : {...item}
                }))
                : ([
                    ...state.items,
                    {
                        ...action.payload,
                        count: 1,
                        totalPriceItems: action.payload.price
                    }
                ])
            console.log(items)
            return {
                ...state,
                items: items,
                totalCount: state.totalCount + 1,
                totalPrice: state.totalCount + action.payload.price
            };

        case 'CLEAR_CART':
            return {
                items: [],
                totalPrice: 0,
                totalCount: 0,
                orderConfirmation: false
            };

        case 'DELETE_PIZZA':
            const selectItem = state.items.filter(item => !(item.id === action.payload))
            const totalPriceItem = selectItem.totalPriceItems
            const totalCountItem = selectItem.count

            const newItems = state.items.filter(item => !(item.id === action.payload))
            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount - totalCountItem,
                totalPrice: state.totalPrice - totalPriceItem,
            };

        case 'MINUS_CART_ITEM': {
            const selectItem = state.items.find(item => {console.log(action.payload); return(item.id === action.payload)})
            if (selectItem.count <= 1) {
                return state
            }

            const newItems = state.items.map(item => (item.id === action.payload)
                ? {...item, count: item.count - 1,}
                : {...item})

            const newState = {
                ...state,
                items: [...newItems],
                totalPrice: state.totalPrice - selectItem.price,
                totalCount: state.totalCount - 1
            };
            return newState
        }

        case 'PLUS_CART_ITEM': {
            const selectItem = state.items.find(item => item.id === action.payload)
            if (selectItem.items.count <= 1) {
                return state
            }

            const newItems = state.items.map(item => (item.id === action.payload)
                ? {...item, count: item.count + 1,}
                : {...item})

            const newState = {
                ...state,
                items: [...newItems],
                totalPrice: state.totalPrice + selectItem.price,
                totalCount: state.totalCount + 1
            };
            return newState
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