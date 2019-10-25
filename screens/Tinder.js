import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as favorite from "../sqlite/Favorite";

import styled from "styled-components/native";

import * as personApi from '../api/person';
import PersonSwipe from "../components/PersonSwipe";

// Schedule preload items
class Schedule extends Array {
  constructor(props) {
    super();
    this.props = Object.assign(
      {
        preload: 1,
        load: () => Promise.resolve(),
        onLoad: Boolean
      },
      props
    );
    this.preload();
  }
  shift() {
    const item = super.shift();
    this.preload();
    return item;
  }

  //calculate and preload items if needed.
  async preload() {
    const { preload, load, onLoad } = this.props;
    if (this.length > preload) return this;
    const item = await load();
    this.push(item);
    onLoad.call(this, item);
    return this.preload();
  }
}

export default function Tinder({}) {
  const [schedule, setSchedule] = useState(null);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const schedule = new Schedule({
      preload: 2, // api will preload 2 person
      onLoad: () => persons.length || setPersons(schedule.slice(0,1)), // Only set one first item on schedule
      load: personApi.random
    });
    setSchedule(schedule);
  }, []);

  return (
    <Wrapper>
      <View>
        {persons[0] ? (
          persons.map((person, index) => (
            <View
              key={person.md5}
              style={{ position: "absolute", left: -140, top: -150 }}
            >
              <PersonSwipe
                person={person}
                onSwipeLeft={person => console.log("Next", person)}
                onSwipeRight={favorite.insert}
                onDrop={() => {
                  // remove first items and reload new item
                  schedule.shift();
                  setPersons(schedule.slice(0,1));
                }}
              />
            </View>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </Wrapper>
  );
}

Tinder.navigationOptions = {
  title: "Tinder"
};

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
