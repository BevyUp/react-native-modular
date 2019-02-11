import React, { Component } from 'react'
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

class Component2 extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>User Component</Title>
          </Body>
        </Header>
        <Content>
        </Content>
      </Container>
    )
  }
}

Component2.propTypes = propTypes
Component2.defaultProps = defaultProps

export default Component2