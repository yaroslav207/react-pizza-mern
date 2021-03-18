export const login = (data) => ({
    type: 'LOGIN',
    payload: data
})

export const logout = () => ({
    type: 'LOGOUT',
})

export const visibleLoginForm = (visible) => ({
    type: 'VISIBLE_LOGIN_FORM',
    payload: visible
})
export const onAdminMode = () => ({
    type: 'ON_ADMIN_MODE'
})

export const offAdminMode = () => ({
    type: 'OFF_ADMIN_MODE'
})