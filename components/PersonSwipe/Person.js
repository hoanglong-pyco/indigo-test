import React, { memo } from "react";
import { View } from "react-native";

import styled from "styled-components/native";

import { Card } from "./Card";
import { Tabs } from "./Tabs";

export const Person = memo(
  ({ picture, location: { street, city }, phone, name, email, gender }) => {
    return (
      <Card>
        <CoverWrap>
          <CoverImage
            source={{ uri: "https://picsum.photos/id/119/240/240" }}
          />
        </CoverWrap>
        <Tabs
          defaultSelect={2}
          items={[
            [
              "ios-person",
              simplePanel({
                label: [
                  `${name.title}: ${name.first} ${name.last}`,
                  `Mail: ${email}`,
                  `Gender: ${gender.toUpperCase()}`
                ].join("\n")
              })
            ],
            ["ios-list-box", simplePanel({ label: "Commingsoon" })],
            [
              "ios-map",
              simplePanel({
                label: "My address is",
                value: [street, city].join(", ")
              })
            ],
            ["ios-call", simplePanel({ label: "My phone is", value: phone })],
            ["ios-lock", simplePanel({ label: "Commingsoon" })]
          ]}
        />
      </Card>
    );
  }
);

const CoverWrap = styled.View`
  width: 130;
  height: 130;
  background-color: #fff;
  border-color: #ddd;
  border-width: 1;
  border-radius: 65;
  margin-top: 15;
  margin-bottom: 15;
  align-items: center;
  justify-content: center;
`;
const CoverImage = styled.Image`
  width: 120;
  height: 120;
  background-color: #fafafa;
  border-radius: 60;
`;

const simplePanel = ({ label, value }) => () => {
  return (
    <View>
      <SimplePanelLabel>{label}</SimplePanelLabel>
      <SimplePanelValue>{value}</SimplePanelValue>
    </View>
  );
};

const SimplePanelLabel = styled.Text`
  font-size: 14;
  color: #9b9b9b;
  text-align: center;
`;
const SimplePanelValue = styled.Text`
  font-size: 17;
  color: #2b2e31;
  text-align: center;
  padding-left: 10;
  padding-right: 10;
`;
