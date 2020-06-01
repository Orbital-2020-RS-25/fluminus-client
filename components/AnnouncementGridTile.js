import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AnnouncementGridTile = (props) => {
  return (
    <View
      style={{ ...styles.AnnouncementBox, ...{ backgroundColor: props.color } }}
    >
      <Text>This is an announcement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  AnnouncementBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 150,
    borderRadius: 20,
  },
});

export default AnnouncementGridTile;
