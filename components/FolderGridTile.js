import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FolderGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS == "android" && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.fileBox}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={styles.container}>
          <Text style={styles.name}>This is a folder</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  fileBox: {
    color: "grey",
    flex: 1,
    margin: 15,
    height: 50,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version > 21 ? "hidden" : "visible",
  },
  container: {
    color: "yellow",
    flex: 1,
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default FolderGridTile;
