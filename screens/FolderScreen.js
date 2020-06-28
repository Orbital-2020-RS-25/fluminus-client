import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";

import FolderGridTile from "../components/FolderGridTile";

class FolderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      folderName: "invalid",
      folder: [],
    };
  }

  renderFolders = (itemData) => {
    console.log("HIHIHI");
    console.log(itemData.item.name);
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
      .then((folders) => {
      // console.log(folders)
        this.setState({ folderName: folders.name, folder: folders, loading: false });
        //console.log(this.state.folder);
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getFolders();
    console.log("help");
    console.log(this.state.folder);
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      return (
        <FlatList
          data={this.state.folder.children}
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