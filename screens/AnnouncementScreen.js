import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { FlatList, ScrollView } from "react-native-gesture-handler";
import AnnouncementGridTile from "../components/AnnouncementGridTile";
import HeaderButton from "../components/HeaderButton";
import { announcement_url } from "../constants/URLs";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-community/async-storage";
import { Card, CardItem } from "react-native-elements";
import Loader from "../components/Loader";

const styles = StyleSheet.create({
  announcementBox: {
    flex: 1,
  },
  datetime: {
    color: "#696969",
    marginBottom: 3,
  },
  text: {
    lineHeight: 22,
  },
});

class AnnouncementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: ["No announcement"],
      isloading: true,
    };
  }

  get_announcement(auth) {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    //console.log(this.props.navigation.getParam('moduleId'));
    const body = JSON.stringify({
      auth: auth,
      code: this.props.navigation.getParam("moduleId"),
    });
    fetch(announcement_url, {
      method: "POST",
      headers: header,
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => result.data)
      .then((msgs) => {
        try {
          return JSON.parse(msgs);
        } catch (e) {
          return msgs;
        }
      })
      .then((result) => {
        if (result == null) {
          throw "Invalid";
        }
        //console.log(result);
        //console.log("hihihi");
        return result;
      })
      .then((msg) => msg.reverse())
      .then((result) => this.setState({ msgs: result, isloading: false }));
    //.then(x => console.log(this.state.msgs[2].title))
    //.catch(err => console.error(err))
  }

  componentDidMount() {
    AsyncStorage.getItem("token")
      .then((token) => {
        //console.log(token);
        return token;
      })
      .then((auth) => JSON.parse(auth))
      .then((result) => this.get_announcement(result))
      .catch((err) => console.error(err));
  }

  render() {
    if (this.state.isloading) {
      return <Loader loading={true} />;
    } else {
      return (
        <ScrollView>
          {this.state.msgs.map((msg, i) => {
            return message_cards(msg, i);
          })}
        </ScrollView>
      );
      /*return (
        <FlatList
          data={this.state.msgs}
          renderItem={this.message_cards}
          keyExtractor={(item, index) => index.toString()} />
      )*/
    }
  }
}

const message_cards = (item, i) => {
  return (
    <Card title={item.title} key={i}>
      <View header key={i}>
        <Text style={styles.datetime}>{item.datetime}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    </Card>
  );
};

AnnouncementScreen.navigationOptions = (navigationData) => {
  const moduleId = navigationData.navigation.getParam("moduleId");

  return {
    headerTitle: moduleId,
    headerLeft: () => (
      <View>
      </View>
      // <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //   <Item
      //     title="Menu"
      //     iconName="ios-menu"
      //     onPress={() => {
      //       navigationData.navigation.toggleDrawer();
      //     }}
      //   />
      // </HeaderButtons>
    ),
  };
};

export default AnnouncementScreen;
