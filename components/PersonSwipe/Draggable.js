import React, { useState, useEffect } from "react";
import { PanResponder, Animated, Dimensions } from "react-native";

import { Person } from "./Person";

const opacityWithDx = () => {
  const width75percent = Math.round(Dimensions.get("window").width) * 0.75;
  return dx => 1 - Math.min(Math.abs(dx / width75percent), 1)
};

const animateWithProps = (props, duration) => {
  return (toProps = {}, onEnd = Boolean) => {
    Object.entries(toProps).forEach(([name, toValue]) => {
      Animated.timing(props[name], {
        duration,
        toValue,
      }).start();
    });
    setTimeout(onEnd, duration);
  };
};

export function Draggabe({
  children,
  onMove = Boolean,
  onAnimate = Boolean,
  onEnd = Boolean
}) {
  const [css] = useState({
    opacity: new Animated.Value(1),
    position: new Animated.ValueXY(0, 0),
    rotate: new Animated.Value(0)
  });
  const getOpacityDx = opacityWithDx();
  const animate = animateWithProps(css, 300);
  const { opacity, position, rotate } = css;

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove(e, gestureState) {
      const { dx, dy } = gestureState;
      position.setValue({ x: dx, y: dy });
      rotate.setValue(dx / 3000);
      opacity.setValue(getOpacityDx(dx));
      onMove(e, gestureState);
    },
    onPanResponderRelease(e, gestureState) {
      let { vx, vy, dx, dy } = gestureState;
      let toRotate = 0,
        toOpacity = 1,
        duration = 300;

      dx += vx * duration;

      if (getOpacityDx(dx) > 0.5) {
        dx = 0;
        dy = 0;
      } else {
        dy += vy * duration;
        toRotate = dx / 3000;
        toOpacity = 0;
      }
      const endGestureState = Object.assign({}, gestureState, { dx, dy });
      animate(
        {
          opacity: toOpacity,
          position: { x: dx, y: dy },
          rotate: toRotate
        },
        () => onEnd(e, endGestureState)
      );
      onAnimate(e, endGestureState);
    }
  });

  return (
    <Animated.View
      style={{
        opacity: css.opacity,
        transform: [
          { translateX: css.position.x },
          { translateY: css.position.y },
          {
            rotateZ: css.rotate.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"]
            })
          }
        ]
      }}
      Î
      {...pan.panHandlers}
    >
      {children}
    </Animated.View>
  );
}
