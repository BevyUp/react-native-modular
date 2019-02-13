import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions, StackActions } from 'react-navigation'
import {
  get,
  cloneDeepWith
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
 * Replace a wrong previous route to fix issues navigating from nested navigators
 * @param {object} navigationState - The state of the navigation with their routes
 * @param {string} routeName - The name of the route
 */
export const replacePreviousRouteByRouteName = (navigationState, routeName) => {
  navigationState = navigationState || get(_navigator, 'state.nav')
  if (!navigationState || !navigationState.routes) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routeName === routeName) {
    const previousRoute = navigationState.routes[navigationState.index-1]
    const lastRoute = _routes[_routes.length - 1]
    if (previousRoute && lastRoute && previousRoute.key !== lastRoute.key) {
      return replaceLastRoute(navigationState)
    }
  }
  // dive into nested navigators
  if (route.routes) {
    route.index = 0
    return replacePreviousRouteByRouteName(route, routeName)
  }
  const nextIndex = navigationState.index + 1
  const nextRoute = navigationState.routes[nextIndex]
  if (nextRoute) {
    navigationState.index = nextIndex
    return replacePreviousRouteByRouteName(navigationState, routeName)
  }
  return null
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

const replaceLastRoute = (state) => {
  if (state.routes.length > 1 && state.index > 0) {
    const oldIndex = state.index - 1
    // remove one that we are replacing
    state.routes.splice(oldIndex, 1)
    // index now one less
    state.index = oldIndex
    return state
  }
  return null
}

const configureRouter = (StackNavigator) => {
  // generally defer to the "real" one
  const parentGetStateForAction = StackNavigator.router.getStateForAction
  StackNavigator.router.getStateForAction = (action, inputState) => {
    const state = parentGetStateForAction(action, inputState)

    // fix it up if applicable
    if (state && action.type === NavigationActions.NAVIGATE) {
      if (action.params && action.params.replaceRoute) {
        delete action.params.replaceRoute
        replaceLastRoute(state)
      }
    }

    // workaround to fix issue navigating to components from nested navigators
    replacePreviousRouteByRouteName(state, action.routeName)

    return state
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
  configureRouter,
}