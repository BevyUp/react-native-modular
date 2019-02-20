import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View, FlatList, SafeAreaView } from 'react-native'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  Text,
  Right,
  Card,
  CardItem,
  Left,
  Icon,
} from 'native-base'
import { Navigation, Bundle, FooterComponent, MODULES } from '../../'

import Style from './style'
import Assets from 'assets'

const propTypes = {}

const defaultProps = {}

class HomeComponent extends Component {

  state = {
    bundlesLoaded: {}
  }

  activeBundle(bundleName) {
    Bundle.register(bundleName)
    console.log('registered')
    Bundle.setActive(bundleName)
    console.log('activated')
    Bundle.reload()
    console.log('reloaded')
  }

  async loadBundle({ url, bundleName }) {
    try {
      await Bundle.download(url, bundleName)
      console.log('downloaded')
      this.activeBundle(bundleName)
      
    } catch (error) {
      alert(error.message)
    }
  }

  async componentWillMount() {
    const bundlesLoaded = await Bundle.getAll()
    this.setState({ bundlesLoaded })
  }

  render() {
    const { bundlesLoaded } = this.state
    return (
      <Container>
        <Header>
          <Left />
          <Body style={{ flex: 3 }}>
            <Title>My Modular App!</Title>
          </Body>
          <Right>
            <Button icon transparent>
              <Image resizeMode="contain" style={{ width: 30, height: 30 }} source={Assets.images.box} />
            </Button>
          </Right>
        </Header>
        <Content>
          {
            MODULES.map((module) => (
              <Card key={module}>
                <CardItem header>
                  <Text>{module}</Text>
                </CardItem>
                <CardItem footer>
                  <Left>
                    { !bundlesLoaded[module] && (
                      <Button iconLeft>
                        <Icon name='download' />
                        <Text>Download</Text>
                      </Button>
                    )}
                  </Left>
                </CardItem>
            </Card>
            ))
          }
        </Content>
        <FooterComponent></FooterComponent>
      </Container>
    )
  }
}

HomeComponent.propTypes = propTypes
HomeComponent.defaultProps = defaultProps

export default HomeComponent
