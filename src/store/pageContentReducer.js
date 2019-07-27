const initState = {
  unit: {},
  unitTranslations: {}, //{ ru: {}, es: {}, ch: {} }
  phrasesArray: []
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
    case 'SET_PHRASES_ARRAY': {
      return { ...state, phrasesArray: action.payload }
    }
    case 'SET_MEDIA_LINK': {
      return { ...state, mediaLink: action.payload }
    }
    default:
      return state
  }
}

export default pageContentReducer
