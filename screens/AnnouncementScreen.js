import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { ANNOUNCEMENTITEM } from "../data/dummy-data";
import { FlatList } from "react-native-gesture-handler";
import AnnouncementGridTile from "../components/AnnouncementGridTile";
import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/Colors";

const AnnouncementScreen = (props) => {
  const renderAnnouncement = (itemData) => {
    return <AnnouncementGridTile color={Colors.accentColour} />;
  };

  return (
    <View style={styles.announcementBox}>
      <Text>{props.navigation.getParam("moduleId")}</Text>
      <FlatList data={ANNOUNCEMENTITEM} renderItem={renderAnnouncement} />
    </View>
  );
};

AnnouncementScreen.navigationOptions = (navigationData) => {
  const moduleId = navigationData.navigation.getParam("moduleId");

  return {
    headerTitle: moduleId,
    headerLeft: () => (
      <View>
        <Text>gg</Text>
      </View>
      // <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //   <Item
      //     title="Menu"
      //     iconName="ios-menu"
      //     onPress={() => {
      //       navigationData.navigation.toggleDrawer();
      //     }}
      //   />
      // </HeaderButtons>
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

const styles = StyleSheet.create({
  announcementBox: {
    flex: 1,
  },
});

export default AnnouncementScreen;
