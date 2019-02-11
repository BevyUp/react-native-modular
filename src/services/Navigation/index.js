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
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
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
  if (backRouteName) {
    index = 1
    actions.push(NavigationActions.navigate({ routeName: backRouteName }))
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
 * A recursive function to get the name of the active route
 * @param {object} navigationState - The state of the navigation with their routes
 */
export const getActiveRouteName = navigationState => {
  navigationState = navigationState || get(_navigator, 'state.nav')
  if (!navigationState || !navigationState.routes) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
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

// add other navigation functions that you need and export them
export default {
  navigate,
  navigateRoot,
  setTopLevelNavigator,
  getActiveRouteName,
  setPreviousState,
  getPreviousState,
}