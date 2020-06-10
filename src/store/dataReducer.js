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
                const {
                    materialTranslations: newMaterialTranslation,
                    unitTranslations: newUnitTranslation
                } = action.payload
                const {
                    materialTranslations: oldMaterialTranslations,
                    unitTranslations: oldUnitTranslations
                } = state

                return {
                    ...state,
                    ...action.payload,
                    materialTranslations: {...oldMaterialTranslations, ...newMaterialTranslation },
                    unitTranslations: {...oldUnitTranslations, ...newUnitTranslation }
                }
            }
        default:
            return state
    }
}