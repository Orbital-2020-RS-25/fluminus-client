import * as React from 'react';
import { WebView } from 'react-native-webview';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import FolderScreen from './FolderScreen'
export class FilesWebView extends React.Component {
    constructor(props) {
        //props.url
        super(props);
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View  style={{height:'100%',width:'100%'}}>
                    <WebView
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png' }}
                        scalesPageToFit={true}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        originWhitelist={['*']}
                        mixedContentMode='always'
                    />
                </View>
       </View>
        );
    }
}

const FileNavigator = createStackNavigator(
    {
      FolderPage: FolderScreen, 
      FileWebView: FilesWebView
    }
)

export default FileNavigator;