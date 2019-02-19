import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Left,
  Right,
  Button,
  Icon,
  Text,
} from 'native-base'
import { Navigation } from 'core-module'

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

class Component3 extends Component {
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
            <Title>Component 3</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Button style={{margin: 20}} full primary onPress={() => Navigation.navigate('Component1')}>
            <Text allowFontScaling={false} uppercase={true}>Component 1</Text>
          </Button>
          <Button style={{margin: 20, marginTop: 0}} full dark onPress={() => Navigation.navigateRoot({ routeName: 'CoreModule' })}>
            <Text allowFontScaling={false} uppercase={true}>Reset history</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

Component3.propTypes = propTypes
Component3.defaultProps = defaultProps

export default Component3