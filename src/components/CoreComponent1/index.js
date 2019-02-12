import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
  Icon
} from 'native-base'

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

class CoreComponent1 extends Component {
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} icon transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>Core Component</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
        </Content>
      </Container>
    )
  }
}

CoreComponent1.propTypes = propTypes
CoreComponent1.defaultProps = defaultProps

export default CoreComponent1