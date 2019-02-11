/**
 * Common services
 */
import { 
  AppState,
} from 'react-native'

/**
 * Common packages
 */
import {
  get,
} from 'lodash'

let _appState = AppState.currentState
const _handleAppStateChange = (nextAppState) => {
  if(_appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log('do something in foreground!')
  }
  _appState = nextAppState
}

export const initialize = () => {
  // Register Listeners, etc
  AppState.addEventListener('change', _handleAppStateChange)
}

export const dispose = () => {
  // Unregister Listeners, etc
  AppState.addEventListener('change', _handleAppStateChange)
}

export default {
  initialize,
  dispose,
}