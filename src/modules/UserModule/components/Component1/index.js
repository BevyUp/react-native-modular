import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  Text,
} from 'native-base'

/**
 * Load Core Services
 */
import { Navigation } from 'core-module'

/**
 * Load Local Services
 */
import { Utils } from 'user-module'

const propTypes = {
  prop1: PropTypes.number,
  prop2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
}
const defaultProps = {
  prop1: 0,
  prop2: 100
}


class Component1 extends Component {

  static propTypes = propTypes
  static defaultProps = defaultProps

  componentWillMount() {
    Utils.initialize()
  }

  componentWillUnMount() {
    Utils.dispose()
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Debug Core Navigation Service</Title>
          </Body>
        </Header>
        <Content>
          <Button full dark onPress={() => Navigation.navigateRoot('HomeComponent')}>
            <Text allowFontScaling={false} uppercase={false}>{ 'Navegate to home screen'.toUpperCase() }</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default Component1