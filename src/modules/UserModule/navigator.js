import { createStackNavigator } from 'react-navigation'
import {
  Component1,
  Component2,
} from './components'

const routeConfig = {
  Component1: {
    screen: Component1,
    params: { moduleName: 'UserModule' }
  },
  Component2: {
    screen: Component2,
    params: { moduleName: 'UserModule' }
  },
}
const navigatorConfig = {
  headerMode: 'none',
}

const stackNavigation = createStackNavigator(routeConfig, navigatorConfig)


export default stackNavigation