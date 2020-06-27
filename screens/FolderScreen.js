import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { FOLDERITEM } from "../data/dummy-data";
import FolderGridItem from "../components/FolderGridTile";

const FolderScreen = (props) => {
  const renderFolders = (itemData) => {
    return (
      <FolderGridItem
        onSelect={() => {
          props.navigation.navigate({ routeName: "FileSelection" });
        }}
      />
    );
  };

  return (
    <FlatList data={FOLDERITEM} renderItem={renderFolders} numColumns="2" />
  );
};

FolderScreen.navigationOptions = (navigationData) => {};

const styles = StyleSheet.create({});

export default FolderScreen;
