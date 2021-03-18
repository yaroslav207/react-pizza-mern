const initialState = {
    token: '',
    isAuth: false,
    userId: '',
    visibleLoginForm: false,
    isAdmin: false,
    adminMode: false
}

const auth = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                visibleLoginForm: false,
                token: action.payload.token,
                isAuth: true,
                userId: action.payload.userId,
                isAdmin: action.payload.isAdmin

            }
        case 'LOGOUT':
            return {
                visibleLoginForm: false,
                token: '',
                isAuth: false,
                userId: '',
                isAdmin: false,
                adminMode: false
            }
        case 'VISIBLE_LOGIN_FORM':
            return {
                ...state,
                visibleLoginForm: action.payload
            }
        case 'ON_ADMIN_MODE':
            return {
                ...state,
                adminMode: true
            }
        case 'OFF_ADMIN_MODE':
            return {
                ...state,
                adminMode: false
            }
        default:
            return state;
    }
}

export default auth