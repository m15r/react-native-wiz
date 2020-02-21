import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  TouchableWithoutFeedback,
  View
} from 'react-native'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Presentation extends Component {

  constructor(props) {

    super(props)

    this.state = {
      item: null,
      visible: false
    }

    this.bgAnimation = new Animated.Value(0)
    this.imageAnimation = new Animated.Value(0)

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
    this.imageAnimation.setValue(0)
    this.setState({
      item: item,
      visible: true
    }, () => {
      Animated.timing(this.bgAnimation, {
        toValue: 1,
        duration: 150
      }).start()
      Animated.timing(this.imageAnimation, {
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
      const height = item.id ? item.size/(item.image.size.width/item.image.size.height) : 0
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
                <Animated.View style={{
                  height: height,
                  left: item.pos.x+item.image.offset.x,
                  opacity: this.imageAnimation,
                  position: 'absolute',
                  transform: [{
                    scale: this.imageAnimation.interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ 0.9, 1 ]
                    })
                  }],
                  top: item.pos.y+item.image.offset.y,
                  width: item.size
                }}>
                  <Image
                    source={item.image.uri}
                    style={{
                      height: height,
                      width: item.size
                    }}
                  />
                </Animated.View>
                <View style={{
                  left: item.pos.x,
                  top: item.pos.y,
                  position: 'absolute'
                }}>
                  {item.component}
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
