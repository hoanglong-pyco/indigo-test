import React, { memo, useState, useEffect } from "react";
import { ActivityIndicator, View, Animated, Easing } from "react-native";

import { Draggabe } from "./Draggable";
import { Person } from "./Person";

export * from './Person';

export default memo(({
  onSwipeLeft = Boolean,
  onSwipeRight = Boolean,
  onDrop = Boolean,
  person
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    person &&
      Animated.timing(fadeAnim, {
        toValue: 1,
        // easing: Easing.back(),
        duration: 300,
        useNativeDriver: true
      }).start();
  }, [person]);

  if (!person) return <ActivityIndicator />;
  return (
    <Draggabe
      onAnimate={(e, { dx }) => {
        if (dx > 0) {
          onSwipeRight(person);
        } else if (dx < 0) {
          onSwipeLeft(person);
        }
      }}
      onEnd={(e, {dx}) => dx === 0 || onDrop(person)}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Person {...person} />
      </Animated.View>
    </Draggabe>
  );
}, Boolean )
