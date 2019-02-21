import { ENV, ENVIRONMENTS } from 'core-module'

/**
 * Common constants in this Module
 */
export const USER_API_URL = `https://user_api${ENV === ENVIRONMENTS.NONPROD ? 'test' : ''}.mydomain.com`
export const USER_API_TIMEOUT = 10

export default {
  USER_API_URL,
  USER_API_TIMEOUT
}