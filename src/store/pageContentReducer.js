const initState = {
  unit: {},
  unitTranslations: {} //{ ru: {}, es: {}, ch: {} }
}

const pageContentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_UNIT_CONTENT': {
      return { ...state, unit: action.payload }
    }
    case 'SET_UNIT_TRANSLATION': {
      const newTranslation = { ...state.unitTranslations, [action.payload.lang]: action.payload }
      return { ...state, unitTranslations: newTranslation }
    }
    default:
      return state
  }
}

export default pageContentReducer
