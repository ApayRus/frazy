export const setData = payload => {
    return {
        type: 'SET_DATA',
        payload
    }
}
export const clearMaterial = () => {
    return {
        type: 'CLEAR_MATERIAL',

    }
}
export const clearData = () => {
    return {
        type: 'CLEAR_DATA',
    }
}