import {
  Platform,
} from 'react-native'

/**
 * Common constants into the app
 */
export const ENVIRONMENTS = {
  NONPROD: 'NONPROD',
  PROD: 'PROD'
}
export const ENV = __DEV__ ? 'NONPROD' : 'PROD'
export const APP_NAME = Platform.OS === 'ios' ? 'MyApp-iOS' : 'MyApp-Android'

export const API_URL = `https://api${ENV === ENVIRONMENTS.NONPROD ? 'test' : ''}.mydomain.com`
export const API_TIMEOUT = 10

export default {
  ENVIRONMENTS,
  ENV,
  APP_NAME,
  API_URL,
  API_TIMEOUT
}