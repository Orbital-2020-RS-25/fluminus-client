import React from "react";
import {Component} from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from "react-native";

const hourHeight = 50;
const styles = StyleSheet.create({
    classBlock: {
        backgroundColor: 'lightblue', 
    }, 
    firstLine: {
        flexDirection: 'row'
    }, 
    blockContainer: {
        flexDirection: 'column', 
        padding: 5
    }
});

const renderClasses = ({ item, index, separator }) => {
    return (
        <TouchableOpacity style={styles.classBlock}>
            <View style={styles.blockContainer}>
                <View style={styles.firstLine}>
                    <Text>{item.name.code}</Text>
                    <Text> </Text>
                    <Text>{item.name.lessonType}</Text>
                </View>
                    <Text>{item.name.name}</Text>
                    <Text>{item.start} to {item.end} at {item.name.venue}</Text>
                </View>
        </TouchableOpacity>
    )
}
/**
 * Takes timetable (JSON of JSONs, with date as key) and returns 
 * flatlist of blocks(touchableopacity)
 */
export default class Timetable extends Component {
    constructor(props) {
        super(props);
    }
    /*
    props: lesson info
    */
    render() {
        return (
            <FlatList 
                data={this.props.lessons}
                numColumns={1}
                renderItem={renderClasses.bind(this)}
                keyExtractor={(item, index) => index.toString()} />
        );
    }
}