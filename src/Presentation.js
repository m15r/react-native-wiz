import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Modal,
  View
} from 'react-native'
import TextComponent from './components/TextComponent'
import ImageComponent from './components/ImageComponent'
import CustomComponent from './components/CustomComponent'

export default class Presentation extends Component {

  constructor(props) {

    super(props)

    this.state = {
      item: null,
      visible: false
    }

    this.bgAnimation = new Animated.Value(0)
    this.showAnimation = new Animated.Value(0)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeItemId !== this.props.activeItemId) {
      this.setState({ visible: false })
    }
    if (prevProps.item.id !== this.props.item.id) {
      this.setActive(this.props.item)
    }
  }

  setActive = (item) => {
    this.bgAnimation.setValue(0)
    this.showAnimation.setValue(0)
    this.setState({
      item: item,
      visible: true
    }, () => {
      Animated.timing(this.bgAnimation, {
        toValue: 1,
        duration: 150
      }).start()
      Animated.timing(this.showAnimation, {
        toValue: 1,
        delay: 300,
        duration: 500,
        easing: Easing.elastic(3)
      }).start()
    })
  }

  render() {
    const {
      item,
      visible
    } = this.state
    if (item !== null) {
      return (
        <Modal visible={visible} transparent>
          <Animated.View style={{
            backgroundColor: this.bgAnimation.interpolate({
              inputRange: [ 0, 1 ],
              outputRange: [ 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .75)' ]
            }),
            flex: 1
          }}
          >
            { (item.id) && (
              <>
                { item.text !== null && (
                  <TextComponent
                    animation={this.showAnimation}
                    pos={item.pos}
                    offset={item.textOffset}
                    text={item.text}
                    style={item.textStyle} />
                )}
                { item.image !== null && (
                  <ImageComponent
                    animation={this.showAnimation}
                    pos={item.pos}
                    offset={item.imageOffset}
                    image={item.image}
                    height={item.imageHeight}
                    width={item.imageWidth} />
                )}
                { item.customComponent !== null && (
                  <CustomComponent
                    animation={this.showAnimation}
                    pos={item.pos}
                    offset={item.customComponentOffset}
                    component={item.customComponent} />
                )}
                <View style={{
                  left: item.pos.x,
                  top: item.pos.y,
                  position: 'absolute'
                }}>
                  {item.children}
                </View>
              </>
            )}
          </Animated.View>
        </Modal>
      )
    } else {
      return null
    }
  }

}
