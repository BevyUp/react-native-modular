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

class Component2 extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => Navigation.goBack()} icon transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>User Component</Title>
          </Body>
          <Right></Right>
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