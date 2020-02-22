import React from 'react'
import { Animated }  from 'react-native'

export default function CustomComponent({ animation, pos, offset, component }) {

  return (
    <Animated.View style={{
      left: pos.x+offset.x,
      opacity: animation,
      position: 'absolute',
      transform: [{
        scale: animation.interpolate({
          inputRange: [ 0, 1 ],
          outputRange: [ 0.9, 1 ]
        })
      }],
      top: pos.y+offset.y
    }}>
      {component}
    </Animated.View>
  )

}
