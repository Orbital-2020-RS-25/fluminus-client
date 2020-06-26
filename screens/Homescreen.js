import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Moment from 'moment';
import { SCHEDULEITEMS } from "../data/dummy-data";
import ScheduleItemTile from "../components/ScheduleItemTile";
import HeaderButton from "../components/HeaderButton";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";
import { Component } from "react";
import Loader from "../components/Loader"

const HomescreenOld= (props) => {
  const renderScheduleItem = (itemData) => {
    return (
      <ScheduleItemTile
        schedule={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "TBD",
            params: {
              moduleId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return <FlatList data={SCHEDULEITEMS} renderItem={renderScheduleItem} />;
};


const renderItem = (item, firstItemInDay) => {  
  return (
    <View style={{color: 'blue'}}>
    <TouchableOpacity 
      style={{flexDirection: "column", justifyContent: "center"}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'black', fontWeight: 'bold', marginRight: 5}}>{item.name.code}</Text>
        <Text style={{color: 'grey'}}>{item.name.name}</Text>
      </View>
      <Text style={{color: 'black', fontWeight: "bold"}}>
        {Moment(item.start).format("hh:mm")} - {Moment(item.end).format("hh:mm")}
      </Text>
      <Text style={{color: 'grey'}}>{item.name.venue}</Text>
    </TouchableOpacity>
    </View>
  );
  /*
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )*/
} 
/*
<Text style={{color: '#555'}}>{item.code}</Text>
*/

const getTimetable = async () => { 
  let timings = {};
  await AsyncStorage.getItem('timetable')
                    .then((results) => timings = JSON.parse(results))
                    .error(e => console.error(e));
  return timings;
}
class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {timetable: {}, loading: true};
  }
  timetable = this.props.navigation.getParam("timetable");
  //console.log(timetable);
  
  componentDidMount() {
    AsyncStorage.getItem("timetable")
                .then((result) => {
                  this.setState({
                    timetable: JSON.parse(result), 
                    loading: false});
                })
                .catch(e => console.error(e));
  }

  /*testItem = {
  "2020-04-15": [
      {
        end: "2020-04-15T18:00:00",
        name: "CS2100",
        info: {
            "code": "CS2100",
            "lessonType": "Tutorial",
            "name": "Computer Organisation",
            "venue": "COM1-0114"
        },
        start: "2020-04-15T17:00:00"
      }
    ]
  }*/

  render() {
    //console.log(this.timetable);
    if (this.state.loading) {
      return (
        <Loader loading={this.state.loading} />
      );
    } else {
      return (
        <Agenda
          items={this.state.timetable} 
          renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay)}
          renderEmptyData = {() => {return (<View />);}}
          selected={'2020-04-07'}
          minDate={'2020-01-01'}
          maxDate={'2020-05-10'}
          pastScrollRange={6}
          futureScrollRange={6}
          />
      );
    }
  }
}

Homescreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "May",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default Homescreen;
