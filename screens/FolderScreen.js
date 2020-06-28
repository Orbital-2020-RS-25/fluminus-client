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
      isLoading: true,
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

        name={itemData.item.name}
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
      .then((folders) => this.setState({ folder: folders.children, isLoading: false }));
  }

  componentDidMount() {
    this.getFolders();
  }

  render() {
    if (this.state.isLoading) {
      return <View><Text>loading</Text></View>;
    } else {
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
}

FolderScreen.navigationOptions = (navigationData) => {};

export default FolderScreen;
