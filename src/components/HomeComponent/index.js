import React, { Component } from "react"
import PropTypes from "prop-types"
import { Image, View, FlatList } from "react-native"
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
  Card,
  CardItem
} from "native-base"
import { Col, Grid } from "react-native-easy-grid"
import { Navigation } from 'core-module'

import Style from "./style"
import Assets from "assets"

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.object
    }).isRequired
  }).isRequired
}

const defaultProps = {}

class HomeComponent extends Component {
  state = {
    numColumns: 2,
    modules: [
      {
        title: "Core Module",
        components: [{ title: "Core Component 1", key: "CoreComponent1", color: '#03DAC5' }]
      },
      {
        title: "User Module",
        components: [
          { title: "Component 1", key: "Component1", color: '#f47100' },
          { title: "Component 2", key: "Component2", color: '#8b00dd' },
          { title: "Component 3", key: "Component3", color: '#FF1744' }
        ]
      }
    ]
  }

  onLayout = (event) => {
    const { width } = event.nativeEvent.layout
    const itemWidth = 160
    let numColumns = Math.floor(width / itemWidth)
    if (numColumns < 1) numColumns = 2
    this.setState({ numColumns })
  }

  render() {
    const { modules, numColumns } = this.state
    return (
      <Container onLayout={(e) => this.onLayout(e)}>
        <Header>
          <Left />
          <Body style={{ flex: 3 }}>
            <Title>My Modular App!</Title>
          </Body>
          <Right>
            <Button icon transparent>
              <Image source={Assets.images.scan} />
            </Button>
          </Right>
        </Header>
        <Content style={Style.content}>
          {modules.map(({ title, components }) => (
            <View key={title}>
              <Text style={Style.titleModule}>{title}</Text>
              <FlatList
                data={components}
                key={title + numColumns}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={{ margin: 0 }}
                renderItem={({ item: { title, color, key }, index }) => (
                  <Card style={{backgroundColor: color, width: 160, maxWidth: '100%',}}>
                    <CardItem header style={Style.cardHeader}>
                      <Text style={Style.titleComponent}>{title}</Text>
                    </CardItem>
                    <CardItem style={Style.cardContent}>
                    </CardItem>
                    <CardItem 
                      footer
                      button 
                      style={Style.cardFooter}
                      onPress={() => Navigation.navigate(key)}
                    >
                      <Button
                        dark
                        style={Style.componentButton}
                        onPress={() => Navigation.navigate(key)}
                      >
                        <Text allowFontScaling={false} uppercase={false}>
                          Navigate
                        </Text>
                      </Button>
                    </CardItem>
                  </Card>
                )}
              />
            </View>
          ))}
        </Content>
      </Container>
    )
  }
}

HomeComponent.propTypes = propTypes
HomeComponent.defaultProps = defaultProps

export default HomeComponent
