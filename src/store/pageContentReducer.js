const initState = {
  title: {}, //{ en: {}, es: {}, ch: {} }
  phrases: [],
  text: []
}

const pageContentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PAGE_PARAMETER': {
      const [key, value] = action.payload // ['mediaLink', "hobbit/hobbit1_1.mp3"]
      return { ...state, [key]: value }
    }
    default:
      return state
  }
}

export default pageContentReducer
