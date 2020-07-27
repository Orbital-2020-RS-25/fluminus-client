import React, { Component } from "react";
import { View, Text } from "react-native";

import FolderSystem from "../components/FolderGridTile";
import AsyncStorage from "@react-native-community/async-storage";

class FolderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // folderName: "invalid",
      rootName: "", 
      folder: [],
      isLoading: true,
      token: ""
    };
  }

  modName = this.props.navigation.getParam("moduleId");

  async getJWT() {
    await AsyncStorage.getItem('token')
                      .then(x => this.setState({token: x}))
                      .catch(e => console.error(e));
  }
  getFolders() {
    AsyncStorage
      .getItem('token')
      //.then(x => JSON.parse(x))
      .then(token => {
        fetch("https://another-luminus.herokuapp.com/modules/modFileTest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            auth: { token },
            code: "OTH633"
            //code: this.modName,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => result.data)
          .then((data) => JSON.parse(JSON.parse(data)))
          .then((folders) =>
            this.setState({ rootName: folders.name, folder: folders.children, isLoading: false })
          );
      })
      .catch(e => console.error(e));
  }

  componentDidMount() {
    this.getJWT();
    console.log(this.state.token);
    this.getFolders();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>loading</Text>
        </View>
      );
    } else {
      return (
        <FolderSystem
          rootName={this.state.rootName}
          items={[this.state.folder]}
          root={true}
        />
        /*
        <FlatList
          data={this.state.folder}
          renderItem={this.renderFolders}
          numColumns="2"
          keyExtractor={(item, index) => index.toString()}
        />
        */
      );
    }
  }
}

export default FolderScreen;