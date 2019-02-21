import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base'
import { Navigation, Bundle, MODULES } from 'core-module'
import Assets from 'assets'
import Style from './style'

const propTypes = {}

const defaultProps = {}

class FooterComponent extends Component {

  state = {
    bundlesLoaded: {},
    bundleActivated: null
  }

  async loadBundles() {
    const bundlesLoaded = await Bundle.getAll()
    const bundleActivated = await Bundle.getActive()
    this.setState({ bundlesLoaded, bundleActivated })
  }

  async componentWillMount() {
    await this.loadBundles()
  }

  activeBundle(bundleName) {
    this.setState({ bundleActivated: bundleName })
    Bundle.setActive(bundleName)
    Bundle.reload()
  }

  async navigateToCore() {
    const bundleActivated = await Bundle.getActive()
    if (bundleActivated) {
      Bundle.setActive()
      Bundle.reload()
    }
    else {
      Navigation.navigateRoot({ routeName: 'CoreModule' })
    }
  }

  render() {
    const { bundlesLoaded, bundleActivated } = this.state
    return (
      <Footer>
        <FooterTab>
          <Button active={!bundleActivated} onPress={this.navigateToCore}>
            <Text>Core Module</Text>
          </Button>
        {MODULES.map(({ title, bundleName }) => (
          <Button onPress={() => this.activeBundle(bundleName)} key={title} active={bundleActivated === bundleName} disabled={!bundlesLoaded[bundleName]}>
            <Text>{title}</Text>
          </Button>
        ))}
        </FooterTab>
      </Footer>
    )
  }
}

FooterComponent.propTypes = propTypes
FooterComponent.defaultProps = defaultProps

export default FooterComponent