import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import Tinder from "../screens/Tinder";
import Favorite from "../screens/Favorite";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

export default createBottomTabNavigator(
  [
    { title: "Tinder", icon: "md-aperture", screen: Tinder },
    { title: "Favorite", icon: "md-star", screen: Favorite }
  ].map(({ title, icon, screen }) => {
    const stack = createStackNavigator({ screen }, config);
    stack.navigationOptions = {
      tabBarLabel: title,
      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={icon} />
    };
    return stack;
  })
);
