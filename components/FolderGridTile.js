import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  FlatList, 
  BackHandler,
  Linking
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

/**
 * Recusively generates the directory represented by the json gotten from the pyfluminus. 
 * 
 */

export default class FolderSystem extends Component {
    constructor(props) {
        //props should contain the folder JSON
        super(props);
        this.state = {
            //items is a stack(list) of array
            previous: props.items, 
            rootName: props.rootName,
            items: props.items, 
            root: props.root
        }
        //console.log(this.state.rootName)
    }

    /*
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
    */


    folderGridTile = (name, type, content, item) => {
        let TouchableCmp = TouchableOpacity;
        if (Platform.OS == "android" && Platform.Version > 21) {
        TouchableCmp = TouchableNativeFeedback;
        }
        //console.log(name);
        return (
        <View style={styles.fileBox}>
            <TouchableCmp style={{ flex: 1 }} 
                onPress={() => {
                    if (type === 'folder') {
                        let temp = this.state.items;
                        this.state.items.push(content);
                        //console.log(this.state.items);
                        this.setState({
                            root: this.state.items.length === 1 ? true : false, 
                        })
                    } else {
                        //console.log(name);
                        //console.log(content);
                        //console.log(item);
                        <View style={{flex: 1}}>
                            <FilesWebView url={content} />
                        </View>

                        /*
                        if (content.slice(0, 4) === 'file:') {
                            Linking.openURL(content);
                        } else {
                            Linking.openURL(content);
                            /*
                            let uri = download(content, name);
                            uri.then(file_uri => {
                                //let temp = item;
                                item.link = file_uri;
                                content = file_uri;
                                this.setState(this.state);
                                Linking.openURL(file_uri);
                            });*/
                        
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
           this.folderGridTile(itemData.item.name, itemData.item.type, 
            itemData.item.type === 'folder' ? itemData.item.children : itemData.item.link, 
            itemData.item)
        );
    };

    previous() {
        let num = this.state.items.length - 1;
        if (this.state.previous !== "") {
            return (
                <TouchableOpacity 
                    style={{ flex: 1, height: 30 }}
                    onPress={() => {
                        let temp = this.state.items;
                        temp.pop();
                        this.setState({
                            items: temp
                        })
                    }}>
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        let num = this.state.items.length - 1;
        //console.log(this.state.root);

        return (
            <View style={{alignItems: 'center'}}>
                {!this.state.root && 
                    <TouchableOpacity 
                        style={{ height: 20, marginTop: 10}}
                        onPress={() => {
                            this.state.items.pop();
                            this.setState({
                                root: this.state.items.length === 1 ? true : false
                            });
                        }}>
                        <View style={{ flexDirection: 'row', margin: 2}}>
                            <MaterialCommunityIcons
                            name={'arrow-up-drop-circle-outline'}
                            size={18} />
                            <Text>
                                Back
                            </Text>
                        </View>
                    </TouchableOpacity>}
                <View style={{flexDirection: "row", alignItems: "flex-start"}}>
                <FlatList
                data={this.state.items[num]}
                renderItem={this.renderFolders}
                keyExtractor={(item, index) => index.toString()}
                />
                </View>
            </View>
        );
    }
}
/*
const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    this.setState({
        downloadProgress: progress,
    });
};

const downloadResumable = (url, name) => FileSystem.createDownloadResumable(
    'http://techslides.com/demos/sample-videos/small.mp4',
    FileSystem.documentDirectory + 'downloads/' + 'small.mp4',
    {},
    callback
);

async function download(url, name) { 
    try {
        const { uri } = await downloadResumable(url, name).downloadAsync();
        console.log('Finished downloading to ', uri);
        return uri;
    } catch (e) {
        console.error(e);
        return url;
    }
}

/*
let options = { encoding: FileSystem.EncodingTypes.Base64 };
const getFile = (uri) => 
    FileSystem.readAsStringAsync(uri, options).then(data => {
            const base64 = 'data:image/jpg;base64' + data;
            resolve(base64); // are you sure you want to resolve the data and not the base64 string? 
        }).catch(err => {
            console.log("​getFile -> err", err);
            reject(err) ;
        });
*/
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