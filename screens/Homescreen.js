import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { SCHEDULEITEMS } from "../data/dummy-data";
import ScheduleItemTile from "../components/ScheduleItemTile";
import HeaderButton from "../components/HeaderButton";

const Homescreen = (props) => {
  const renderScheduleItem = (itemData) => {
    return (
      <ScheduleItemTile
        schedule={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "TBD",
            params: {
              moduleId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return <FlatList data={SCHEDULEITEMS} renderItem={renderScheduleItem} />;
};

Homescreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "May",
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

export default Homescreen;
