import * as React from 'react';
import { WebView } from 'react-native-webview';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

const FilesWebView = ({ url }) => {
    return (
        <WebView
            source={{ uri: '' }}

        />
    );
}

export default FilesWebView;