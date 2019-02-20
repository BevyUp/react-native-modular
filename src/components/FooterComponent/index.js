import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base'
import { Navigation } from 'core-module'
import Assets from 'assets'
import Style from './style'

const propTypes = {}

const defaultProps = {}

class FooterComponent extends Component {

  state = {
    modules: [
      {
        title: 'Core Module',
        active: true
      },
      {
        title: 'User Module',
        active: false,
        disabled: true,
        bundleName: 'UserModule',
        url: 'https://dogfoodbu.blob.core.windows.net/nordstrom/bundles/user.bundle'
      }
    ]
  }

  render() {
    const { modules } = this.state
    return (
      <Footer>
        <FooterTab>
        {modules.map(({ title, active, disabled }) => (
          <Button key={title} active={active} disabled={disabled}>
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