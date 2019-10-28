import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import { Card } from "../../PersonSwipe/Card";

it(`renders person`, () => {
  const person = renderer.create(<Card>Test card</Card>).toJSON();
  expect(person).toMatchSnapshot();
});
