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

export const MODULES = [
  {
    title: 'User Module',
    bundleName: 'UserModule',
    url: 'https://dogfoodbu.blob.core.windows.net/bundles/user.bundle'
  },
  {
    title: 'Animation Module',
    bundleName: 'AnimationModule',
    url: 'https://dogfoodbu.blob.core.windows.net/bundles/animation.bundle'
  },
]

export default {
  ENVIRONMENTS,
  ENV,
  APP_NAME,
  API_URL,
  API_TIMEOUT,
  MODULES,
}