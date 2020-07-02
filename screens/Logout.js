import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader.js'
import { View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

const clearAppData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

const logoutAndClearStack = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        clearAppData();
        this.setState({loading: false});
        this.props.navigation.dispatch(logoutAndClearStack);
    }

    render() {
        return (
        <View>
            <Loader loading={this.state.loading} />
        </View>
        );
    }
    
}