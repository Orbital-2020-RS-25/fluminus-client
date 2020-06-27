import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { FOLDERITEM } from "../data/dummy-data";
import FolderGridTile from "../components/FolderGridTile";

const FolderScreen = (props) => {
  const renderFolders = (itemData) => {
    return (
      <FolderGridTile
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
