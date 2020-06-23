import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MediaGridTile = (props) => {
  return (
    <View
      style={{ ...styles.FileBox, ...{ backgroundColor: props.color } }}
    >
      <Text>This is an announcement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  FileBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    borderRadius: 20,
  },
});

export default MediaGridTile;
