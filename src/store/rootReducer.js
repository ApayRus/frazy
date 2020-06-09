import { combineReducers, createStore } from 'redux'
import appStateReducer from './appStateReducer'
import playerSettingsReducer from './playerSettingsReducer'
import playerStateReducer from './playerStateReducer'
import pageContentReducer from './pageContentReducer'
import menuReducer from './menuReducer'
import dataReducer from './dataReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    appState: appStateReducer,
    playerSettings: playerSettingsReducer,
    playerState: playerStateReducer,
    pageContent: pageContentReducer,
    menu: menuReducer,
    data: dataReducer
})

const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store