import React from 'react'
import { Animated, Text }  from 'react-native'

export default function ImageComponent({ animation, pos, offset, text, style }) {

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
      <Text style={[{
        color: '#ffffff',
        fontSize: 18,
      }, style ]}>{text}</Text>
    </Animated.View>
  )

}
