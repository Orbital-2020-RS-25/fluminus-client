import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { MEDIAITEM } from "../data/dummy-data";
import MediaGridTile from "../components/MediaGridTile";

import Colors from "../constants/Colors";

const MediaScreen = (props) => {
  const renderMedia = (itemData) => {
    return <MediaGridTile color={Colors.accentColour} />;
  };

  return (
    <View style={styles.fileBox}>
      <FlatList data={MEDIAITEM} renderItem={renderMedia} />
    </View>
  );
};

MediaScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "May",
  };
};

const styles = StyleSheet.create({
  mediaBox: {
    flex: 1,
  },
});

export default MediaScreen;
