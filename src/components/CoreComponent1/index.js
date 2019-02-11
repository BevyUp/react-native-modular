import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
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
    return (
      <Container>
        <Header>
          <Body>
            <Title>Core Component</Title>
          </Body>
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