import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";

import FolderGridTile from "../components/FolderGridTile";

class FolderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // folderName: "invalid",
      folder: [],
    };
  }

  renderFolders = (itemData) => {
    return (
      <FolderGridTile
        onSelect={() => {
          this.props.navigation.navigate({
            routeName: "FileSelection",
          });
        }}
      />
    );
  };

  getFolders() {
    fetch("https://another-luminus.herokuapp.com/modules/modFileTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth: { jwt: "whatever, or use token from asyncstorage" },
        code: "CS2100",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => result.data)
      .then((data) => JSON.parse(JSON.parse(data)))
      .then((folders) =>
        // console.log(folders)
        this.setState({ folder: folders })
      );
  }

  componentDidMount() {
    this.getFolders();
    console.log("help");
    console.log(this.state.folder);
  }

  render() {
    return (
      <FlatList
        data={this.state.folder}
        renderItem={this.renderFolders}
        numColumns="2"
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

FolderScreen.navigationOptions = (navigationData) => {};

export default FolderScreen;
