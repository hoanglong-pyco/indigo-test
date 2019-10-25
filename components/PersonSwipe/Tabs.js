import React, { memo, useState, useEffect } from "react";

import styled from "styled-components/native";

import { View, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export function Tabs({ items, defaultSelect = 0 }) {
  const [selected, setSelected] = useState(defaultSelect);
  const [_, SelectedPannel] = items[selected];
  return (
    <Wrapper>
      <TabContent>
        <SelectedPannel />
      </TabContent>
      <Tabbar>
        {items.map(([icon], index) => (
          <TabIcon
            key={icon}
            active={index === selected}
            icon={icon}
            onPress={() => setSelected(index)}
          />
        ))}
      </Tabbar>
    </Wrapper>
  );
}
const Wrapper = styled.View`
  height: 110;
  align-items: center;
`;
const Tabbar = styled.View`
  height: 40;
  flex-direction: row;
`;
const TabContent = styled.View`
  height: 90;
`;

const TabIcon = ({ active, icon, onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
      <Ionicons name={icon} size={32} color={active ? "#87ba4f" : "#d9d9d9"} />
    </TouchableOpacity>
  );
};
