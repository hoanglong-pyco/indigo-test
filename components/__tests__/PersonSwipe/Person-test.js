import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import { Person } from "../../PersonSwipe";
const user = {
  gender: "female",
  name: { title: "ms", first: "anna", last: "wheeler" },
  location: {
    street: "7403 long rapids rd",
    city: "cedar rapids",
    state: "south dakota",
    zip: "99516"
  },
  email: "anna.wheeler18@example.com",
  username: "goldenfish705",
  password: "toriamos",
  salt: "0k4z47Gb",
  md5: "e848d0ad805643a39458453a4f128826",
  sha1: "1351838306c05a89c6ad61ad91691691bac922fb",
  sha256: "d18d420793e57f14da3ebeccf4053b3305e96c8c48f1cb2cc0ca359bc5abcf08",
  registered: "1123380414",
  dob: "178768751",
  phone: "(716)-516-4621",
  cell: "(887)-227-1124",
  SSN: "566-33-3230",
  picture: "http://api.randomuser.me/portraits/women/78.jpg"
};

it(`renders person`, () => {
  const person = renderer.create(<Person {...user} />).toJSON();
  expect(person).toMatchSnapshot();
});
