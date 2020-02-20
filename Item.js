import React from 'react'
import { View } from 'react-native'
import { WizardContext } from './ContextAPI'

export default class Item extends React.Component {

  static contextType = WizardContext

  constructor(props) {

    super(props)

    this.state = {
      opacity: 1
    }

    this.marker = null // Ref
    this.prevousItemId = null
    this.enabled = (props.enabled === false) ? false : true

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.prevousItemId !== this.context.activeItemId) {
      this.prevousItemId = this.context.activeItemId
      if (this.props.id === this.context.activeItemId) {
        if (this.props.delay) setTimeout(this.onSelect, this.props.delay)
        else this.onSelect()
      }
    }
  }

  onSelect = () => {
    if (this.enabled && this.marker) {
      this.marker.measure((x, y, width, height, pageX, pageY) => {
        this.context.setItem({
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
    // Pass up
    const { onActive } = this.props
    if (typeof onActive === 'function') onActive()
  }

  render() {
    const { opacity } = this.state
    return (
      <View
        ref={ref => this.marker = ref}
        style={{ opacity }}>
          {this.props.children}
      </View>
    )
  }

}
