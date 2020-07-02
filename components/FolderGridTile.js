import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  FlatList, 
  BackHandler
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default class FolderSystem extends Component {
    constructor(props) {
        //props should contain the folder JSON
        super(props);
        this.state = {
            //items is a stack(list) of array
            items: props.items, 
            root: props.root
        }
    }
    
    backAction = () => {
        if (this.state.root) {

        } else {
            this.state.items.pop();
        }
    }

    componentDidMount() {
        this.backHandler = 
            BackHandler.addEventListener('hardwareBackPress', this.backAction);
 
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    folderGridTile = (name, type, children) => {
        let TouchableCmp = TouchableOpacity;
        if (Platform.OS == "android" && Platform.Version > 21) {
        TouchableCmp = TouchableNativeFeedback;
        }
        return (
        <View style={styles.fileBox}>
            <TouchableCmp style={{ flex: 1 }} 
                onPress={() => {
                    if (type === 'folder') {
                        this.state.items.push(children);
                        //console.log(next);
                        this.setState({
                            root: this.state.items.length === 1 ? true : false
                        })
                    } else {
                        
                    }
                }}>
            <View style={styles.container}>
                <MaterialCommunityIcons 
                    name={type === 'folder' ? "folder" : "file"} 
                    size={20} />
                <Text> </Text>
                <Text style={styles.name} numberOfLines={1}>
                {name}
                </Text>
            </View>
            </TouchableCmp>
        </View>
        );
    };

    renderFolders = (itemData) => {
        return (
            /*
            <FolderGridTile
            onSelect={() => {
                this.props.navigation.navigate({
                routeName: "FileSelection",
                });
            }}
            name={itemData.item.name}
            type={itemData.item.type}
            contents={itemData.item.children}
            />
            */
           this.folderGridTile(itemData.item.name, itemData.item.type, itemData.item.children)
        );
    };

    render() {
        let num = this.state.items.length - 1;
        return (
            <FlatList
              data={this.state.items[num]}
              renderItem={this.renderFolders}
              keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
  fileBox: {
    //borderWidth: 1,
    //borderColor: "black",
    flex: 1,
    margin: 15,
    height: 50,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version > 21 ? "hidden" : "visible",
  },
  container: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: "flex-end",
  },
  name: {
    fontSize: 20,
    textAlign: "left",
  },
});