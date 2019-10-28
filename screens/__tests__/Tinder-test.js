import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import Tinder from "../Tinder";

const responseData = {
  results: [
    {
      user: {
        gender: "female",
        name: { title: "ms", first: "marilyn", last: "welch" },
        location: {
          street: "7510 e little york rd",
          city: "brigham city",
          state: "oregon",
          zip: "46975"
        },
        email: "marilyn.welch75@example.com",
        username: "greendog816",
        password: "lookin",
        salt: "hXycKiXy",
        md5: "7ca60bdada260ca958a33230c43bf358",
        sha1: "a0fe616659f16fcae9c663aa7aa56e3e833824da",
        sha256:
          "6b8e15325810d927461ada6034a5136451515c2e3f50309d5e7512319f405ede",
        registered: "948870895",
        dob: "406521725",
        phone: "(143)-190-7590",
        cell: "(291)-287-7518",
        SSN: "405-54-5739",
        picture: "http://api.randomuser.me/portraits/women/80.jpg"
      },
      seed: "a743dcfc7d6311f1",
      version: "0.4"
    }
  ]
};

it(`renders Tinder`, () => {
  global.fetch = jest.fn(() => () => Promise.resolve({ json: () => Promise.resolve(responseData) }));
  const person = renderer.create(<Tinder />).toJSON();
  expect(person).toMatchSnapshot();
});
