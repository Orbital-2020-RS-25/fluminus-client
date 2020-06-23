import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { FILEITEM } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";

const FriendScreen = (props) => {
  const renderFriendItem = (itemData) => {
    return <FriendGridTile color={itemData.item.color} />;
  };

  return (
    // <FlatList data={FILEITEM} renderItem={renderFriendItem} numColumns="2" />
    <View><Text>hello</Text></View>
  );
};

FriendScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Friends",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="More"
          iconName="md-more"
          onPress={() => {
            navigationData.navigation.navigate("TBD");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default FriendScreen;