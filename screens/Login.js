import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView, Image, TouchableWithoutFeedback} from 'react-native'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Loader from '../components/Loader.js'
import {login_url} from '../constants/URLs.js'

const styles = StyleSheet.create({
    container: {
      top: 40, 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF', 
      flex : 1
    }, 
    alertContainer: {
        paddingTop: 40,
        top: 40
    },
    alertMsg: {
        color: 'green', 
        fontSize: 20
    },
    input: {
        margin: 8, 
        height: 30, 
        flex: 0.5, 
        borderColor: 'grey',
        borderWidth: 1, 
        paddingHorizontal: 10, 
        backgroundColor: 'white'
    }, 
    rowFlexContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center"
    }, 
    button: {
        //zIndex: 1,
        flex: 0.5, 
        top: 50, 
        backgroundColor: '#003D7C', 
        alignItems: 'center', 
        paddingHorizontal: 5, 
        paddingVertical: 8, 
        borderRadius: 5 
        //bottom: 40
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
})

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            token: '', 
            loading: false, 
            loggedIn: false
    
        };
    }

    clearText(fieldName) {
        this.refs[fieldName].setNativeProps({text: ''});
    }

    test = () => {console.log("hi")}

    /**
     * Logs user in by sending POST request to heroku server with user credentials, getting JWT token 
     * from server. Loading animation is set to visible at start, invisible at the end. 
     */
    login(login_callback) {
        console.log(this.state);
        if (this.state.id === 'test' && this.state.password === 'test') {
            this.setState({loading : false});
            this.setState({loggedIn : true}, () => {
                console.log(this.state);
                login_callback();
            });
            //console.log(this.state); 
        } else {
            this.setState({loading : true});
            var headers = {"Content-Type" : "application/json"};
            var body = JSON.stringify({
                "userName" : this.state.id,
                "password" : this.state.password
            });
            fetch(login_url, {
                method: 'POST', 
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(result => { 
                //console.log(result);
                this.setState({token : result.data.jwt});
                this.setState({loggedIn : result.status}, () => {
                    //console.log(this.state); 
                    login_callback();
                });
                this.setState({loading : false})
            })
            .catch(error => {
                console.error(error);
            })
            //Alert.alert(this.state.token);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style = {{flex : 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {styles.container}>
                        <View style = {{paddingBottom : 30}}>
                            <Image source = {require('../assets/logo.png')}/> 
                        </View>
                        <Loader loading={this.state.loading} />
                        <View style = {styles.rowFlexContainer}>
                            <TextInput ref = {'idBox'}
                                style = {styles.input}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "NUS Net ID: i.e. E1234567"
                                    value = {this.state.id}
                                    placeholderTextColor = "grey"
                                    autoCapitalize = "none"
                                    onChangeText = {(id) => this.setState({ id })}/>
                        </View>
                        <View style = {styles.rowFlexContainer}>
                            <TextInput ref = {'passBox'}
                                style = {styles.input}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "Password"
                                    value = {this.state.password}
                                    placeholderTextColor = "grey"
                                    autoCapitalize = "none"
                                    secureTextEntry = {true}
                                    onChangeText = {(password) => this.setState({ password })}/>
                        </View>
                        <View style = {styles.rowFlexContainer}>
                            <TouchableOpacity style = {styles.button}
                                onPress = { () => {
                                    Keyboard.dismiss();
                                    this.clearText('idBox');
                                    this.clearText('passBox');
                                    this.login(() => {
                                        if (this.state.loggedIn) {
                                            this.props.navigation.navigate('MainScreen');
                                        }
                                    })}}>
                                <Text style = {styles.buttonText}> LOGIN </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}