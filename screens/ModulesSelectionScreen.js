import React, {Component} from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ModuleGridTile from "../components/ModuleGridTile";
import { SCHEDULEITEMS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../components/Loader";

const ModulesSelectionScreenOld = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <ModuleGridTile
        code={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Announcement",
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

const mods = AsyncStorage.getItem('mods');
const test_items = ['cs1010', 'cs1231', 'ma1101r'];
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
  constructor(props){
    super(props);
    this.state = {
      mod_list : test_items, 
      isLoading : true
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('mods')
                .then(results => JSON.parse(results))
                .then(mods => {
                  this.setState({
                    mod_list : mods, 
                    isLoading : false
                  })
                })
                .catch(e => console.error(e));
  }

  render() {
    if (this.state.isLoading) {
      return <Loader loading={this.state.isLoading} />
    } else {
      return (
        <Card containerStyle={{padding : 0}} >
        {
          this.state.mod_list.map((x, i) => {
            return (
              <ListItem
                key={i}
                title={x}
              />
            );
          })
        }
        </Card>
      )
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="md-person-add"
          onPress={() => {
            navigationData.navigation.navigate("TBD");
          }}
        />
        <Item
          title="More"
          iconName="md-more"
          onPress={() => {
            navigationData.navigation.navigate("TBD");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default ModulesSelectionScreen;
