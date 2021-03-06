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
import CheckBox from '@react-native-community/checkbox';
import * as SecureStore from 'expo-secure-store';

import Loader from "../components/Loader.js";
import { login_url, profile_url } from "../constants/URLs.js";

import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
});

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
    flex: 0.5,
    top: 30,
    backgroundColor: "#003D7C",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  wrongInfoBanner: {
    borderRadius: 10, 
    backgroundColor: "#f8d7da", //mistyrose
    alignItems: "center", 
    top: 10, 
    bottom: 10, 
  }, 
  wrongInfoText: {
    margin: 5, 
    color: "#752028", 
    fontSize: 14, 
  }
});

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

const WrongInfoBanner = (props) => {
  return (
    <View style={styles.wrongInfoBanner}>
      <Text style={styles.wrongInfoText} accessibilityLabel={'error'}>
        {props.correctCredentials == 1
          ? "ID and Password cannot be empty!"
          : "Incorrect ID/Password."}
      </Text>
    </View>
  );
}


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      token: "",
      timetable: {}, 
      loading: false,
      loggedIn: false,
      correctCredentials: 0, 
      remember: false
    };
  }

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: "" });
  }

  async componentDidMount() {
    await SecureStore.getItemAsync('password')
                     .then(async (result) => {
                        if (result !== null) {
                          this.setItem({password: result})
                          await SecureStore.getItemAsync('user')
                                           .then((result) => {
                                              if (result !== null) {
                                                this.setState({id: result})
                                              }})
                                           .catch(e => console.log(e));
                          this.login(this.login_callback);

                        }
                     })
                     .then((result) => {
                     })
                     .catch(e => console.log(e));
  }

  /**
   * Logs user in by sending POST request to heroku server with user credentials, getting JWT token
   * from server. Loading animation is set to visible at start, invisible at the end.
   */
  login(login_callback) {
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
        if (!result.status) {
          this.setState({ 
            id: "", 
            password: "",
            correctCredentials: 2, 
            loading: false
           });
        } else {
          console.log(result);
          this.setState({ token: JSON.stringify(result.data), 
                          loggedIn: result.status}, 
              () => {
                login_callback(); 
              });
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  login_callback() { 
    //callback that is executed after the fetch is done
    //only ran if credentials are correct
    //already has token at this stage
    console.log("login fetched");
      //store to asyncStorage
    console.log("hihihi")
    storeData("id", this.state.id);
    storeData("token", this.state.token);
    if (this.state.remember) {
      SecureStore.setItemAsync('user', this.state.id);
      SecureStore.setItemAsync('password', this.state.password);
      console.log(this.state.password)
    }
    this.setState({password: ""});
    //calls user profile page
    fetch(profile_url + this.state.id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        let mod_info = result.data.mods;
        storeData("profile", JSON.stringify(result.data));
        let mods = Object.keys(mod_info);
        storeData("mods", JSON.stringify(mods));
        let timetable = result.data.timetable;
        this.setState({timetable: timetable});
        //console.log(timetable)
        //this.state.timetable = timetable;
        /*for (let timing in timetable) {
          for (let i = 0; i < timing.length; i++) {
            timing[i].name = timing[i].name.code
          }
        }*/
        storeData("timetable", JSON.stringify(timetable))
      })
      .catch((error) => console.error(error));
    //}
    //<Homescreen nusId={this.state.id} timetable={this.state.timetable} />
    console.log("hi");
    this.props.navigation.dispatch(resetAction);
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
                testID={"user"}
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
                testID={"pass"}
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
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <CheckBox
                disabled={false}
                value={this.state.remember}
                onValueChange={() => {
                  this.setState({
                    remember: !this.state.remember
                  })
                }} />
              <Text>Remember me</Text>
            </View>
            <View>
              <View>
                {this.state.correctCredentials !== 0 && 
                  <WrongInfoBanner correctCredentials={this.state.correctCredentials}/>}
              </View>
            </View>
            <View style={styles.rowFlexContainer}>
              <TouchableOpacity
                style={styles.button}
                accessibilityLabel={"login"}
                //what happens when login button is pressed
                onPress={() => {
                  this.clearText("idBox");
                  this.clearText("passBox");
                  console.log("button pressed");
                  if (this.state.id === "" || this.state.password === "") {
                    this.setState({correctCredentials: 1})
                  } else {
                    Keyboard.dismiss();
                    this.login(() => { 
                      //callback that is executed after the fetch is done
                      //only ran if credentials are correct
                      //already has token at this stage
                      console.log("login fetched");
                      if (this.state.loggedIn) {
                        //store to asyncStorage
                        storeData("id", this.state.id);
                        storeData("token", this.state.token);
                        //calls user profile page
                        fetch(profile_url + this.state.id, {
                          method: "GET",
                        })
                          .then((response) => response.json())
                          .then((result) => {
                            let mod_info = result.data.mods;
                            storeData("profile", JSON.stringify(result.data));
                            let mods = Object.keys(mod_info);
                            storeData("mods", JSON.stringify(mods));
                            let timetable = result.data.timetable;
                            this.setState({timetable: timetable});
                            //console.log(timetable)
                            //this.state.timetable = timetable;
                            /*for (let timing in timetable) {
                              for (let i = 0; i < timing.length; i++) {
                                timing[i].name = timing[i].name.code
                              }
                            }*/
                            storeData("timetable", JSON.stringify(timetable))
                          })
                          .catch((error) => console.error(error));
                        //}
                        //<Homescreen nusId={this.state.id} timetable={this.state.timetable} />
                        
                        this.props.navigation.dispatch(resetAction);
                      }
                    });
                  }
                }}              >
                <Text style={styles.buttonText}> LOGIN </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

