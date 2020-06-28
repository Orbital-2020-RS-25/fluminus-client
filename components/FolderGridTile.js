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
          <Ionicons name="md-folder" size={25} />
          <Text> </Text>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  fileBox: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    margin: 15,
    height: 50,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version > 21 ? "hidden" : "visible",
  },
  container: {
    flexDirection: "row",
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
