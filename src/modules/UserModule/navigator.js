import { createStackNavigator } from 'react-navigation'
import {
  Component1,
  Component2,
} from './components'
const routeConfig = {
  Component1: {
    screen: Component1
  },
  Component2: {
    screen: Component2
  }
}
const navigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Component1',
}
export default createStackNavigator(routeConfig, navigatorConfig)