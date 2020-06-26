import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { Card } from "react-native-elements";

import { announcement_url } from "../constants/URLs";
import Loader from "../components/Loader";

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
        return result;
      })
      .then((msg) => msg.reverse())
      .then((result) => this.setState({ msgs: result, isloading: false }));
  }

  componentDidMount() {
    AsyncStorage.getItem("token")
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
    }
  }
}

AnnouncementScreen.navigationOptions = (navigationData) => {
  const moduleId = navigationData.navigation.getParam("moduleId");

  return {
    headerTitle: moduleId,
  };
};

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

export default AnnouncementScreen;
