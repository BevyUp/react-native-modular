/**
 * Common services
 */
import {
  AsyncStorage,
} from 'react-native'

/**
 * Common packages
 */
import axios from 'axios'

export const getUserInfo = async () => {
  const token = await AsyncStorage.getItem('user_token')
  const response = await axios.get('myUrl', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return response.data
}

export default {
  getUserInfo,
}