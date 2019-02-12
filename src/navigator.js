import { createStackNavigator, NavigationAction } from 'react-navigation'
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

const stackNavigator = createStackNavigator(routeConfig, navigatorConfig)

export default stackNavigator
