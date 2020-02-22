import React from 'react'
import { Animated, Image }  from 'react-native'

export default function ImageComponent({ animation, pos, offset, image, height, width }) {

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
      <Image
        source={image}
        style={{
          height: height,
          width: width
        }}
      />
    </Animated.View>
  )

}
