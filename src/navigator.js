import { createStackNavigator } from 'react-navigation'
import {
  HomeComponent,
  CoreComponent1,
} from './components'
const routeConfig = {
  HomeComponent: {
    screen: HomeComponent
  },
  CoreComponent1: {
    screen: CoreComponent1
  }
}
const navigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'HomeComponent',
}
export default createStackNavigator(routeConfig, navigatorConfig)