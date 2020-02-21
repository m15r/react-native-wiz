import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { WizContext } from './ContextAPI'

class Item extends Component {

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
    const { wiz, id, queue, autoPlay } = this.props
    this.context.register({ wiz, id, queue, autoPlay })
    if (autoPlay) this.context.play(wiz)
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.prevousItemId !== this.context.activeItemId) {
      this.prevousItemId = this.context.activeItemId
      if (this.props.id === this.context.activeItemId) {
        this.play()
      }
    }

    if (prevProps.enabled !== this.props.enabled) {
      this.enabled = this.props.enabled
    }

    if (prevProps.completed !== this.props.completed) {
      if (this.props.completed) this.complete()
    }

  }

  play = () => {
    if (this.props.delay) {
      clearTimeout(this.delayTimeout)
      this.delayTimeout = setTimeout(this.onSelect, this.props.delay)
    } else this.onSelect()
  }

  measureAndSetItem = () => {
    if (this.enabled && this.item) {
      this.item.measure((x, y, width, height, pageX, pageY) => {
        this.context.setItemComponent({
          id: this.props.id,
          pos: { x: pageX, y: pageY },
          component: this.props.children,
          image: {
            offset: this.props.imageOffset ? this.props.imageOffset : { x: 0, y: 0 },
            uri: this.props.image,
            size: { width: 1024, height: 384 }
          },
          size: this.props.size
        })
      })
    }
    this.props.onActive()
  }

  complete = () => {
    this.context.next()
  }

  render() {
    const {
      opacity
    } = this.state
    return (
      <View
        ref={ref => this.item = ref}
        style={{ opacity }}>
          {this.props.children}
      </View>
    )
  }

}

Item.propTypes = {
  wiz: PropTypes.string,
  id: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  autoPlay: PropTypes.bool,
  queue: PropTypes.number,
  completed: PropTypes.bool,
  image: PropTypes.string,
  imageOffset: PropTypes.object,
  imageSize: PropTypes.number,
  delay: PropTypes.number,
  onActive: PropTypes.func,
  onWizComplete: PropTypes.func
}

Item.defaultProps = {
  wiz: 'default',
  enabled: true,
  autoPlay: false,
  queue: 0,
  completed: false,
  image: null,
  imageOffset: { x: 0, y: 0 },
  imageSize: 100,
  delay: 0,
  onActive: () => {},
  onWizComplete: () => {}
}

export default Item
