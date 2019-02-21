import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Button,
  Text,
  Icon,
} from 'native-base'

/**
 * Load Core Services
 */
import { Navigation, FooterComponent } from 'core-module'

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
          <Left>
            <Button onPress={() => Navigation.goBack()} icon transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>Component 1</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Button style={{margin: 20}} full primary onPress={() => Navigation.navigate('Component2')}>
            <Text allowFontScaling={false} uppercase={true}>Component 2</Text>
          </Button>
          <Button style={{margin: 20, marginTop: 0}} full dark onPress={() => Navigation.navigateRoot({ routeName: 'CoreModule' })}>
            <Text allowFontScaling={false} uppercase={true}>Reset history</Text>
          </Button>
        </Content>
        <FooterComponent></FooterComponent>
      </Container>
    )
  }
}

Component1.propTypes = propTypes
Component1.defaultProps = defaultProps

export default Component1