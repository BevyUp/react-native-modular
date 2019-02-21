import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Image, 
  View, 
  FlatList, 
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  Text,
  Right,
  List,
  ListItem,
  Left,
  Icon,
  Badge,
} from 'native-base'
import { Navigation, Bundle, FooterComponent, MODULES } from 'core-module'

import Style from './style'
import Assets from 'assets'

const propTypes = {}

const defaultProps = {}

class HomeComponent extends Component {

  state = {
    bundlesLoaded: {},
    bundleNameToLoad: null,
    timestamp: new Date()
  }

  activeBundle(bundleName) {
    Bundle.setActive(bundleName)
    Bundle.reload()
  }

  async loadBundle(url, bundleName) {
    try {
      this.setState({ bundleNameToLoad: bundleName })
      await Bundle.download(url, bundleName)
      Bundle.register(bundleName)
      await this.loadBundles()
      this.setState({ bundleNameToLoad: null, timestamp: new Date() })
    } catch (error) {
      alert(error.message)
      this.setState({ bundleNameToLoad: null })
    }
  }

  async loadBundles() {
    const bundlesLoaded = await Bundle.getAll()
    this.setState({ bundlesLoaded })
  }

  async componentWillMount() {
    await this.loadBundles()
  }

  render() {
    const { bundlesLoaded, bundleNameToLoad, timestamp } = this.state
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
          <List>
          {
            MODULES.map(
              ({ bundleName, url, title }) => bundlesLoaded[bundleName] ? (
                <ListItem key={bundleName}>
                  <Body>
                    <Text>{title}</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => this.activeBundle(bundleName)}>
                      <Text>Active</Text>
                    </Button>
                  </Right>
                </ListItem>
              ) : (
                <ListItem key={bundleName}>
                  <Body>
                    <Text>{title}</Text>
                  </Body>
                  <Right>
                    {
                      bundleNameToLoad === bundleName ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                      ) : (
                        <Button icon onPress={() => this.loadBundle(url, bundleName)}>
                          <Icon name='download' />
                        </Button>
                      )
                    }
                  </Right>
                </ListItem>
              )
            )
          }
          </List>
        </Content>
        <FooterComponent key={`footer${timestamp}`}></FooterComponent>
      </Container>
    )
  }
}

HomeComponent.propTypes = propTypes
HomeComponent.defaultProps = defaultProps

export default HomeComponent
