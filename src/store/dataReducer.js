const initState = {
    material: {},
    materialTranslations: {}, // { ru:{}, es:{}, ... }
    unit: {},
    unitTranslations: {},
    isLoadedMaterial: false,
    isLoadedMaterialTr: false,
    isLoadedUnit: false,
    isLoadedUnitTr: false
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
        case 'CLEAR_MATERIAL':
            {
                return {...state,
                    material: {},
                    materialTranslations: {},
                    isLoadedMaterial: false,
                    isLoadedMaterialTr: false,
                }
            }
        case 'CLEAR_DATA':
            {
                return initState
            }
        default:
            return state
    }
}