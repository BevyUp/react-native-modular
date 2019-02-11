import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  Text,
  Left,
  Right,
} from 'native-base'
import Style from './style'
import Assets from 'assets'

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  }).isRequired,
}

const defaultProps = {
}

class HomeComponent extends Component {
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>My Modular App!</Title>
          </Body>
          <Right>
            <Button icon transparent>
              <Image source={Assets.images.scan} />
            </Button>
          </Right>
        </Header>
        <Content style={Style.content}>
          <Text>My first modular app! :)</Text>
          <Button style={Style.homeButton} dark onPress={() => navigation.navigate('UserModule')}>
            <Text allowFontScaling={false} uppercase={false}>Navigate to UserModule</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

HomeComponent.propTypes = propTypes
HomeComponent.defaultProps = defaultProps

export default HomeComponent