import React, { Component } from 'react'
import { Root } from 'native-base'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import {
  Utils,
  Navigation,
  HomeComponent,
} from './'
import {
  Navigator
} from 'user-module'

const AppNavigator = createStackNavigator(
  {
    HomeComponent: { screen: HomeComponent },
    UserModule: { screen: Navigator }
  },
  {
    initialRouteName: 'HomeComponent',
    headerMode: 'none'
  }
)
const AppContainer = createAppContainer(AppNavigator)

class App extends Component {

  onNavigationStateChange(prevState, currentState) {
    const currentScreen = Navigation.getActiveRouteName(currentState)
    const prevScreen = Navigation.getActiveRouteName(prevState)

    if(prevScreen !== currentScreen) {
      //Screen tracking (Analytics tracker)
    }
  }

  render() {
    return (
      <Root>
        <AppContainer 
          uriPrefix={Utils.getDeepLink()}
          onNavigationStateChange={(prev, current) => this.onNavigationStateChange(prev, current)}
          ref={navigatorRef => { Navigation.setTopLevelNavigator(navigatorRef) }}
        />
      </Root>
    )
  }
}

export default App