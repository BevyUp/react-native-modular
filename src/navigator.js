import { createStackNavigator } from 'react-navigation'
import {
  HomeComponent,
} from './components'
const routeConfig = {
  HomeComponent: {
    screen: HomeComponent
  },
}
const navigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'HomeComponent',
}
export default createStackNavigator(routeConfig, navigatorConfig)