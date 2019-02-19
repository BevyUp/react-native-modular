/**
 * Navigation Service
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions, StackActions } from 'react-navigation'
import {
  get,
  isObject,
  findIndex
} from 'lodash'

/**
 * Local variables
 */
let _navigator
let _previousState = null
let _routes = []

type paramsType = { [key: string]: any }
type routeType = { key?: string, params?: paramsType, routeName?: string}

/**
 * Set the status of a route to return later
 * @param {object} state - The state of a previous route
 */
export const setPreviousState = state => {
  _previousState = state
}

/**
 * Get the info of a previous route
 */
export const getPreviousState = () => {
  const previousState = _previousState
  _previousState = null
  return previousState
}

/**
 * Save the navigator of the App
 * @param {object} navigatorRef - The navigator of the app
 */
export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef
}

/**
 * Navigate from any component or service
 * @param {(string|object)} routeName - The name of the route or all the info of the new route
 * @param {object} params - The params of the new route
 * @param {object} key - The key of the new route
 */
export const navigate = (routeName: string | routeType, params?: paramsType, key?: string) => {
  if (isObject(routeName)) {
    params = routeName.params
    key = routeName.key
    routeName = routeName.routeName
  }
  let options = { routeName, params }
  if (key) {
    options = { ...options, key }
  }
  const route = getActiveRoute()
  if (route && route.key) {
    _routes.push(route)
  }
  _navigator.dispatch(
    NavigationActions.navigate(options)
  )
}

/**
 * Navigate to the previous screen, use navigate method instead to navigate to a previous screen using the key of the route.
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
 * @param {object} newRoute - The new route
 * @param {object} backRoute - An optional previous route for back navigation
 * @flow
 */
export const navigateRoot = (newRoute: routeType, backRoute?: routeType) => {
  let index = 0
  let actions = []
  _routes = []
  if (backRoute) {
    index = 1
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
  if (!navigationState || 
      !navigationState.routes || 
      navigationState.index < 0) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routeName === routeName) {
    // Clear the local history of the routes navigating to a previous route
    const routeIndex = findIndex(_routes, { key: route.key })
    if (routeIndex >= 0) {
      _routes = _routes.slice(0, routeIndex)
    }
    const lastRoute = _routes[_routes.length - 1]
    const previousRoute = navigationState.routes[navigationState.index-1]
    if (previousRoute && lastRoute && previousRoute.key !== lastRoute.key) {
      return replaceLastRoute(navigationState)
    }
    return null
  }
  // dive into nested navigators
  if (route.routes) {
    route.index = route.routes.length - 1
    return replacePreviousRouteByRouteName(route, routeName)
  }
  navigationState.index--
  return replacePreviousRouteByRouteName(navigationState, routeName)
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

/**
 * Replace the last route from the state of the navigation
 * @param {object} state - The state of the navigation
 */
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

/**
 * Extend the behavior of the navigation
 * @param {object} StackNavigator - The stack navigator to change the configuration of the router
 */
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

      // workaround to fix issue navigating to components from nested navigators
      replacePreviousRouteByRouteName(state, action.routeName)
    }

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