const initState = {
    /*display*/
    title: 'title',
    author: 'author',
    unit: '',
    logo: 'default-files/default-logo.png',
    background: 'default-files/default-background.jpg',
    heading: []
}

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_MENU_PARAMETERS':
            {
                return {...state, ...action.payload }
            }
        default:
            return state
    }
}

export default menuReducer