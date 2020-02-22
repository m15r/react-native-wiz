import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { WizContext } from './ContextAPI'

class WizView extends Component {

  static contextType = WizContext

  constructor(props) {

    super(props)
    this.state = { opacity: 1 }
    this.item = null // Ref
    this.prevousItemId = null
    this.enabled = props.enabled
    this.delayTimeout = {}

  }

  componentDidMount() {
    if (this.enabled) {
      const { wiz, id, queue, autoPlay } = this.props
      this.context.register({ wiz, id, queue, autoPlay })
      if (autoPlay) this.context.show(wiz)
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.prevousItemId !== this.context.activeItemId) {
      this.prevousItemId = this.context.activeItemId
      if (this.props.id === this.context.activeItemId) {
        this.show()
      }
    }

    if (prevProps.enabled !== this.props.enabled) {
      this.enabled = this.props.enabled
    }

    if (
      prevProps.completed !== this.props.completed ||
      prevProps.complete !== this.props.complete
    ) {
      if (
        this.props.completed ||
        this.props.complete
      ) this.complete()
    }

  }

  show = () => {
    if (this.props.delay) {
      clearTimeout(this.delayTimeout)
      this.delayTimeout = setTimeout(this.measureAndSetItem, this.props.delay)
    } else this.measureAndSetItem
  }

  measureAndSetItem = () => {
    if (this.enabled && this.item) {
      this.item.measure((x, y, width, height, pageX, pageY) => {
        const {
          children, text, textOffset, textStyle, image, imageOffset, imageHeight,
          imageWidth, customComponent, customComponentOffset
        } = this.props
        this.context.setItemComponent({
          id: this.props.id,
          pos: { x: pageX, y: pageY },
          children, text, textOffset, textStyle, image, imageOffset, imageHeight,
          imageWidth, customComponent, customComponentOffset
        })
      })
    }
    this.props.onActive()
  }

  complete = () => {
    this.props.onComplete()
    this.context.next()
  }

  render() {
    const {
      opacity
    } = this.state
    return (
      <View
        ref={ref => this.item = ref}
        style={[ this.props.style, { opacity } ]}>
          {this.props.children}
      </View>
    )
  }

}

WizView.propTypes = {
  wiz: PropTypes.string,
  id: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  autoPlay: PropTypes.bool,
  queue: PropTypes.number,
  completed: PropTypes.bool,
  complete: PropTypes.bool,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  image: PropTypes.oneOfType([ PropTypes.object, PropTypes.func, PropTypes.number ]),
  imageOffset: PropTypes.object,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  customComponent: PropTypes.node,
  customComponentOffset: PropTypes.object,
  delay: PropTypes.number,
  onActive: PropTypes.func,
  onComplete: PropTypes.func,
  // Inherited props
  style: PropTypes.object
}

WizView.defaultProps = {
  wiz: 'default',
  enabled: true,
  autoPlay: false,
  queue: 0,
  completed: false,
  complete: false,
  text: null,
  textOffset: { x: 0, y: -60 },
  textStyle: {},
  image: null,
  imageOffset: { x: 0, y: -60 },
  imageHeight: 100,
  imageWidth: 100,
  customComponent: null,
  customComponentOffset: { x: 0, y: -60 },
  delay: 0,
  onActive: () => {},
  onComplete: () => {}
}

export default WizView
