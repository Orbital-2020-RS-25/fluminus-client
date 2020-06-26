import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const FriendGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS == "android" && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.friendBox}>
      <TouchableCmp style={{ flex: 1 }}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          <Text style={styles.name}>friend</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  friendBox: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: (Platform.OS ===
      "android" && Platform.Version > 21 ? "hidden" : "visible"),
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 20,
    textAlign: "right",
  },
});

export default FriendGridTile;
