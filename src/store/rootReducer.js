import { combineReducers, createStore } from 'redux'
import appStateReducer from './appStateReducer'

const rootReducer = combineReducers({ appState: appStateReducer })

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
