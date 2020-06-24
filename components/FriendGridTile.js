import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FriendGridTile = (props) => {
  return (
    <View style={{ ...styles.friendBox, ...{ backgroundColor: props.color } }}>
      <Text>This is an announcement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  friendBox: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: "50%",
    borderRadius: 10,
  },
});

export default FriendGridTile;
