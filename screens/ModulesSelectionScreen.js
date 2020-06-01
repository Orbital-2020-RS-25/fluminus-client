import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ModuleGridTile from "../components/ModuleGridTile";
import { SCHEDULEITEMS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";

const ModulesSelectionScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <ModuleGridTile
        code={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Announcement",
            params: {
              moduleId: itemData.item.title,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList data={SCHEDULEITEMS} renderItem={renderGridItem} numColumns="2" />
  );
};

ModulesSelectionScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Modules",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-person-add"
          onPress={() => {
            navigationData.navigation.navigate("TBD");
          }}
        />
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

export default ModulesSelectionScreen;
