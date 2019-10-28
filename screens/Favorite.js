import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import * as favorite from "../sqlite/Favorite";
import { Person } from "../components/PersonSwipe";

export default class Favorite extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const rightPress = navigation.getParam("dispatchRemove");
    return {
      title: "Favorite",
      headerRight: rightPress && (
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            onPress={rightPress}
            name="md-trash"
            size={26}
            style={{ marginRight: 20 }}
            color="red"
          />
          <Ionicons
            onPress={navigation.getParam("toggleSelectMode")}
            name="md-close"
            size={26}
            style={{ marginRight: 20 }}
            color="red"
          />
        </View>
      )
    };
  };
  state = {
    isSelectMode: false,
    selected: {},
    itemHeight: 300,
    persons: [],
    padding: 0,
    columns: 0,
    forceIndex: 0
  };

  // calculator flatlist padding and columns
  getListConfig = width => {
    return {
      padding: (width % 300) / 2,
      columns: Math.floor(width / 300)
    };
  };

  // Reload favorited persons items on screen active
  willFocus = () => {
    return favorite.persons().then(persons => {
      this.setState({ persons });
    });
  };

  // remove selected items
  removeItems = () => {
    let { selected } = this.state;
    selected = Object.entries(selected).filter(([_, isSelect]) => isSelect);
    const remove = () => Promise
      .all(selected.map(([username]) => favorite.remove(username)))
      .then(this.willFocus)
      .then(this.toggleSelectMode);
    
    Alert.alert('Remove items', `Are you sure remove "${selected.length}" items!`, [
      {text: "I'm not sure!"},
      {text: "Yes! I'm sure", onPress: remove }
    ])
    
  };

  // toggle select mode
  toggleSelectMode = () =>
    this.setState(({ isSelectMode }) => {
      isSelectMode = !isSelectMode;
      this.props.navigation.setParams({
        dispatchRemove: isSelectMode ? this.removeItems : false,
        toggleSelectMode: this.toggleSelectMode
      });
      return { isSelectMode, selected: {} };
    });
  //toggle selected Item
  toggleSelecItem = username =>
    this.setState(({ selected }) => {
      selected[username] = !selected[username];
      return { selected };
    });

  // Flatlist save index on visibles change, use on reload columns portrait/landcape
  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0]) {
      this.state.forceIndex = viewableItems[0].index;
    }
  };

  // React component lifecycle
  componentWillMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", this.willFocus);
    Alert.alert('Notie', 'Please long press item for switch to edit mode');
  }
  componentWillUnmount() {
    this.props.navigation.removeEventListener("willFocus", this.willFocus);
  }

  render() {
    const {
      itemHeight,
      persons,
      padding,
      columns,
      forceIndex,
      isSelectMode,
      selected
    } = this.state;
    const scrollToIndex = Math.min(
      Math.floor(forceIndex / columns),
      Math.floor(persons.length / columns)
    );
    return (
      <Wrapper
        key={columns}
        style={{
          paddingLeft: padding,
          paddingRight: padding
        }}
        initialScrollIndex={scrollToIndex}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index
        })}
        onLayout={({ nativeEvent }) => {
          const newConfig = this.getListConfig(nativeEvent.layout.width);
          if (newConfig.columns !== columns) {
            this.setState(newConfig);
          }
        }}
        onViewableItemsChanged={this.onViewableItemsChanged}
        data={columns && persons}
        renderItem={({ item }) => {
          const isSelected = isSelectMode && selected[item.username];
          return (
            <TouchableOpacity
              onLongPress={() => {
                this.toggleSelectMode();
                this.toggleSelecItem(item.username);
              }}
              onPress={() => this.toggleSelecItem(item.username)}
            >
              <Item style={{ opacity: isSelected ? 0.5 : 1 }}>
                <Person {...item} />
              </Item>
              {isSelected && (
                <ItemSelected>
                  <Ionicons name="md-checkmark" size={70} color="green" />
                </ItemSelected>
              )}
            </TouchableOpacity>
          );
        }}
        numColumns={columns}
        keyExtractor={({ username }) => username}
      />
    );
  }
}

const Wrapper = styled.FlatList`
  flex-grow: 1;
  padding-top: 10;
  padding-bottom: 10;
`;
const Item = styled.View`
  align-items: center;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
`;

const ItemSelected = styled.View`
  position: absolute;
  top: 60;
  left: 125;
`;
