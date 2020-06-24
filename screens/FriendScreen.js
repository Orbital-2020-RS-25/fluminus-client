import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { FRIENDITEM } from "../data/dummy-data";
import FriendGridTile from "../components/FriendGridTile";
import HeaderButton from "../components/HeaderButton";

const FriendScreen = (props) => {
  const renderFriendItem = (itemData) => {
    return <FriendGridTile color={itemData.item.color} />;
  };

  return (
    <FlatList data={FRIENDITEM} renderItem={renderFriendItem} numColumns="2" />
  );
};

FriendScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Friends",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default FriendScreen;
