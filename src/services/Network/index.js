import {
  NetInfo,
} from 'react-native'

/**
 * Workaround to validate the internet connection
 */
export const isConnected = () => {
  return new Promise((resolve) => {
    function handleFirstConnectivityChange(isConnected) {
      if(isConnected){
        resolve(true)
      }else {
        resolve(false)
      }
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      )
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    )
  })
}

export default {
  isConnected,
}