const initState = {
  /*display*/
  unit: '',
  title: '',
  logo: '',
  background: '',
  heading: []
}

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_MENU_PARAMETER': {
      const [key, value] = action.payload // ['volume', 55]
      return { ...state, [key]: value }
    }
    default:
      return state
  }
}

export default menuReducer
