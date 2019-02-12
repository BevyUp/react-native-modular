import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions, StackActions } from 'react-navigation'
import {
  get
} from 'lodash'

/**
 * Local variables
 */
let _navigator
let _previousState = null
let _routes = []

/**
 * Set the status of a route to return to that screen (Useful for redirecting by inactivity)
 * @param {object} state - The state of a previous route
 */
export const setPreviousState = state => {
  _previousState = state
}

/**
 * Get the routeName and params of a previous screen
 */
export const getPreviousState = () => {
  const previousState = _previousState
  _previousState = null
  return previousState
}

/**
 * Save the navigator of the App
 * @param {object} navigatorRef - The navigator of the main component
 */
export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef
}

/**
 * Navigate from any component or service
 * @param {string} routeName - The name of the route to navigate
 * @param {object} params - The params of the new route
 */
export const navigate = (routeName, params) => {
  const route = getActiveRoute()
  if (route && route.key) {
    _routes.push(route)
  }
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

/**
 * Navigate to the previous screen
 */
export const goBack = () => {
  const lastRoute = _routes.pop()
  if (lastRoute) {
    _navigator.dispatch(
      NavigationActions.navigate({
        key: lastRoute.key,
        routeName: lastRoute.routeName,
        params: lastRoute.params
      })
    )
  }
  else {
    _navigator.dispatch(
      NavigationActions.back()
    )
  }
}

/**
 * Reset the history of the navigation with a new route
 * @param {*} routeName - The name of the new route
 * @param {*} params - Params of the navigation
 * @param {*} backRouteName - The name of a previous route for back navigation
 */
export const navigateRoot = (routeName, params, backRouteName) => {
  let newRoute = { routeName }
  if (params) {
    newRoute.params = params
  }
  let index = 0
  let actions = []
  _routes = []
  if (backRouteName) {
    index = 1
    const backRoute = {
      routeName: backRouteName,
      key: backRouteName
    }
    actions.push(NavigationActions.navigate(backRoute))
    _routes = [backRoute]
  }
  actions.push(NavigationActions.navigate(newRoute))
  const resetAction = StackActions.reset({
    index,
    key: null,
    actions
  })
  _navigator.dispatch(resetAction)
}

/**
 * A recursive function to get the active route
 * @param {object} navigationState - The state of the navigation with their routes
 */
export const getActiveRoute = navigationState => {
  navigationState = navigationState || get(_navigator, 'state.nav')
  if (!navigationState || !navigationState.routes) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route)
  }
  return route
}

/**
 * A recursive function to get the name of the active route
 * @param {object} navigationState - The state of the navigation with their routes
 */
export const getActiveRouteName = navigationState => {
  const route = getActiveRoute(navigationState)
  return route && route.routeName
}

/**
 * A Higher Order Component (HOC) to pass the params of the navigation as properties
 */
export const mapNavigationStateParamsToProps = ScreenComponent => {
  return class extends Component {
    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
          params: PropTypes.any.isRequired,
        }).isRequired,
      }).isRequired,
    }
    static navigationOptions = ScreenComponent.navigationOptions // better use hoist-non-react-statics
    render() {
      const { navigation } = this.props
      const { state: { params } } = navigation
      return <ScreenComponent {...this.props} {...params} />
    }
  }
}

export const renderNavigator = Navigator => {
  return class extends Component {
    static router = Navigator.router;
  
    render() {
      return (
        <Navigator navigation={this.props.navigation} />
      );
    }
  }
}

// add other navigation functions that you need and export them
export default {
  goBack,
  navigate,
  navigateRoot,
  setTopLevelNavigator,
  getActiveRouteName,
  setPreviousState,
  getPreviousState,
  renderNavigator,
}