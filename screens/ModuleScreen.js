import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import Loader from "../components/Loader";
import AnnouncementScreen from "./AnnouncementScreen";
import FolderScreen from "./FolderScreen";

class ModuleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1, 
        };
    }

    componentDidMount() {

    }

    showScreen() {
        if (this.state.page === 1) {
            let modId = this.props.navigation.getParam("moduleId");
                return (
                    <AnnouncementScreen
                        modId={modId}
                    />
                );
        } else if (this.state.page === 2) {
            return (
                <FolderScreen />
            );
        }
    }

    render() {

        return (
            <View>
                {this.showScreen()}
            </View>
        )
    }
  
}
/*
ModuleScreen.navigationOptions = (navigationData) => {
  const moduleId = navigationData.navigation.getParam("moduleId");

  return {
    headerTitle: moduleId,
  };
};
*/
export default ModuleScreen;
