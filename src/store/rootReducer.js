import { combineReducers, createStore } from 'redux'
import appStateReducer from './appStateReducer'
import playerSettingsReducer from './playerSettingsReducer'
import playerStateReducer from './playerStateReducer'

const rootReducer = combineReducers({
  appState: appStateReducer,
  playerSettings: playerSettingsReducer,
  playerState: playerStateReducer
})

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
