import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FileGridTile = (props) => {
  return (
    <View
      style={{ ...styles.fileBox, ...{ backgroundColor: props.color } }}
    >
      <Text>This is an announcement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fileBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
});

export default FileGridTile;
