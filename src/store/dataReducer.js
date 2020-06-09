const initState = {
    material: {},
    materialTranslations: {}, // { ru:{}, es:{}, ... }
    unit: {},
    unitTranslations: {}
}

export default function dataReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_DATA':
            {
                return {...state, ...action.payload }
            }
        default:
            return state
    }
}