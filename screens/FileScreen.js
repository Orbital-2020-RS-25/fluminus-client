import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { FILEITEM } from "../data/dummy-data";
import FileGridTile from "../components/FileGridTile";

import Colors from "../constants/Colors";

const FileScreen = (props) => {
  const renderFiles = (itemData) => {
    return <FileGridTile color={Colors.accentColour} />;
  };

  return (
    <View style={styles.fileBox}>
      <FlatList data={FILEITEM} renderItem={renderFiles} />
    </View>
  );
};

FileScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Files",
  };
};

const styles = StyleSheet.create({
  fileBox: {
    flex: 1,
  },
});

export default FileScreen;
