import {
  Alert,
  Platform,
  MaskedViewIOS
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

export const denodeify = f => (...args) => new Promise((resolve, reject) => {
  f(...args, (err, val) => {
    if (err) {
      reject(err)
    } else {
      resolve(val)
    }
  })
})

export const showCustomError = (title, message, buttons, options) => {
  title = title || 'Oops, something went wrong :('
  message = message || 'We have reported this to our team, please try again!'
  buttons = buttons || [
    { text: 'OK' },
  ]
  options = options || { cancelable: false }
  Alert.alert(title, message, buttons, options)
}

export const getDeepLink = (path = "") => {
  const scheme = 'my-scheme'
  const prefix = Platform.OS == 'android' ? `${scheme}://my-host/` : `${scheme}://`
  return prefix + path
}

export const GradientText = props => (
  <MaskedViewIOS maskElement={<Text {...props} />}>
    <LinearGradient 
      colors={props.colors} 
      start={props.start} 
      end={props.end}>
      <Text {...props} style={[props.style, { opacity: 0 }]} />
    </LinearGradient>
  </MaskedViewIOS>
)

export default {
  delay,
  denodeify,
  showCustomError,
  getDeepLink,
  GradientText
}