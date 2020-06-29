import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader.js'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView, Image, TouchableWithoutFeedback} from 'react-native'

const clearAppData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        clearAppData();
        return this.props.navigation.navigate('Login');
    }

    render() {
        return (
        <View>
            <Loader loading={true} />
        </View>
        );
    }
    
}