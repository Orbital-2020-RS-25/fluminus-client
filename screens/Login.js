import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import Loader from "../components/Loader.js";
import get_date from '../constants/Weeks';
import { login_url, profile_url } from "../constants/URLs.js";

const styles = StyleSheet.create({
  container: {
    top: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  alertContainer: {
    paddingTop: 40,
    top: 40,
  },
  alertMsg: {
    color: "green",
    fontSize: 20,
  },
  input: {
    margin: 8,
    height: 30,
    flex: 0.5,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  rowFlexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loggedOut: {
    color: "green",
    fontSize: 16,
  },
  button: {
    //zIndex: 1,
    flex: 0.5,
    top: 50,
    backgroundColor: "#003D7C",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    //bottom: 40
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      token: "",
      loading: false,
      loggedIn: false,
    };
  }

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: "" });
  }

  /**
   * Logs user in by sending POST request to heroku server with user credentials, getting JWT token
   * from server. Loading animation is set to visible at start, invisible at the end.
   */
  login(login_callback) {
    //console.log(this.state);
    /*if (this.state.id === 'test' && this.state.password === 'test') {
            this.setState({loading : false});
            this.setState({loggedIn : true}, () => {
                //console.log(this.state);
                login_callback();
            });
            //console.log(this.state); 
        } else {*/
    this.setState({ loading: true });
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({
      userName: this.state.id,
      password: this.state.password,
    });
    fetch(login_url, {
      method: "POST",
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        this.setState({ token: JSON.stringify(result.data) });
        this.setState({ loggedIn: result.status }, () => {
          //console.log(this.state);
          login_callback();
        });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.error(error);
      });
    //Alert.alert(this.state.token);
    //}
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={{ paddingBottom: 30 }}>
              <Image source={require("../assets/logo.png")} />
            </View>
            <Loader loading={this.state.loading} />
            <View style={styles.rowFlexContainer}>
              <TextInput
                ref={"idBox"}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="NUS Net ID: i.e. E1234567"
                value={this.state.id}
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={(id) => this.setState({ id })}
              />
            </View>
            <View style={styles.rowFlexContainer}>
              <TextInput
                ref={"passBox"}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                value={this.state.password}
                placeholderTextColor="grey"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
            <View style={styles.rowFlexContainer}>
              <TouchableOpacity
                style={styles.button}
                //what happens when login button is pressed
                onPress={() => {
                  Keyboard.dismiss();
                  this.clearText("idBox");
                  this.clearText("passBox");
                  this.login(() => { 
                    //callback that is executed after the fetch is done
                    //already has token at this stage
                    if (this.state.loggedIn) {
                      //store to asyncStorage
                      storeData("id", this.state.id);
                      storeData("token", this.state.token);
                      //if (this.state.id !== 'test') {
                      //calls user profile page
                      fetch(profile_url + this.state.id, {
                        method: "GET",
                        //redirect : "follow"
                      })
                        .then((response) => response.json())
                        .then((result) => {
                          let mod_info = result.data.mods;
                          storeData("profile", JSON.stringify(result.data));
                          let mods = Object.keys(mod_info);
                          storeData("mods", JSON.stringify(mods));
                          //creates calendar
                          let classes = [];
                          for (let mod in mod_info) {
                            let lessons = mod_info[mod].class_grps;
                            //console.log(lessons)
                            //lessons is ARRAY of JSON objects of lessons
                            let number_of_classes = lessons.length;
                            //console.log(number_of_classes)
                            //console.log(lessons);
                            for (let i = 0; i < number_of_classes; i++) {
                              //console.log("HIHIHIHIHI")
                              //console.log(lessons[i])
                              let lesson_specific_info = lessons[i].timing[0];
                              let day = lesson_specific_info.day;
                              let start = lesson_specific_info.startTime;
                              let end = lesson_specific_info.endTime;
                              let lessonType = lessons[i].lessonType;
                              let venue = lesson_specific_info.venue;
                              //console.log(lessonType)
                              let week_num = lesson_specific_info.weeks;
                              //console.log(venue)
                              //console.log(week_num);
                              for (let j = 0; j < week_num.length; j++) {
                                console.log(day)
                                let [startTime, endTime] = get_date(week_num[j], day, start, end);
                                let classInfo = {
                                  start: startTime, 
                                  end: endTime, 
                                  code: mod, 
                                  lessonType: lessonType, 
                                  venue: venue
                                };
                                //console.log("HIHIHIHIHI")
                                //console.log(classInfo)
                                classes.push(classInfo);
                              }
                            }
                          }
                          return classes;
                        })
                        .then((classes) => {
                          storeData("timetable", JSON.stringify(classes));
                          console.log(classes.length);
                        })
                        .catch((error) => console.error(error));
                      //}
                      this.props.navigation.navigate("MainScreen");
                    }
                  });
                }}
              >
                <Text style={styles.buttonText}> LOGIN </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
