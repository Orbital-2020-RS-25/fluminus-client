import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ModuleGridTile from "../components/ModuleGridTile";
import { SCHEDULEITEMS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";
import { Card } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../components/Loader";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const ModulesSelectionScreenOld = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <ModuleGridTile
        code={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Announcements",
            params: {
              moduleId: itemData.item.title,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList data={SCHEDULEITEMS} renderItem={renderGridItem} numColumns="2" />
  );
};

const mods = AsyncStorage.getItem("mods");
const test_items = ["cs1010", "cs1231", "ma1101r"];
/*
const ModulesSelectionScreen = (props) => {
  return (
  <Card containerStyle={{padding : 0}} >
  {
    test_items.map((x, i) => {
      return (
        <ListItem
          key={i}
          title={x}
          />
      )
    })
  }
  </Card>
  )
}*/

class ModulesSelectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mod_list: test_items,
      isLoading: true,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("mods")
      .then((results) => JSON.parse(results))
      .then((mods) => {
        this.setState({
          mod_list: mods,
          isLoading: false,
        });
      })
      .catch((e) => console.error(e));
  }
  list_item = ({ item }) => {
    return (
      <ScrollView>
        <Card style={{ flex: 1, height: "20%" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate({
                routeName: "Announcements",
                params: {
                  moduleId: item,
                },
              });
            }}
          >
            <Text style={styles.mod_label}>{item}</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  };
  render() {
    if (this.state.isLoading) {
      return <Loader loading={this.state.isLoading} />;
    } else {
      return (
        <FlatList
          data={this.state.mod_list}
          renderItem={this.list_item}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
}

ModulesSelectionScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Modules",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  mod_label: {
    color: "black",
    fontSize: 20,
  },
});

export default ModulesSelectionScreen;
