import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Image, 
  Dimensions,
  Easing
} from 'react-native'
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
  variables,
} from 'native-base'
import {
  TranslateY,
} from 'react-native-motion'
import { Navigation } from 'core-module'
import Assets from 'assets'
import Style from './style'

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

  state = {
    height: Dimensions.get('window').height
  }

  onLayout({ nativeEvent }) {
    const { height } = nativeEvent.layout
    this.setState({ height })
  }

  render() {
    const { height } = this.state
    return (
      <Container onLayout={(e) => this.onLayout(e)}>
        <Header>
          <Left>
            <Button onPress={() => Navigation.goBack()} icon transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>Core Component</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content contentContainerStyle={Style.content}>
          <TranslateY style={{ alignItems: 'center' }} easing={Easing.elastic()} delay={50} duration={500} initialValue={height} value={0} startOnDidMount={true}>
            <Image style={Style.boxImage} source={Assets.images.cardboardBox} />
          </TranslateY>
        </Content>
      </Container>
    )
  }
}

CoreComponent1.propTypes = propTypes
CoreComponent1.defaultProps = defaultProps

export default CoreComponent1