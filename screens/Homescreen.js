import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Moment from 'moment';
import { SCHEDULEITEMS } from "../data/dummy-data";
import ScheduleItemTile from "../components/ScheduleItemTile";
import HeaderButton from "../components/HeaderButton";
import {Agenda} from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";
import { Component } from "react";
import Loader from "../components/Loader"
import RNSchedule from 'rnschedule';
import { sub } from "react-native-reanimated";

const HomescreenOld= (props) => {
  const renderScheduleItem = (itemData) => {
    return (
      <ScheduleItemTile
        schedule={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Announcement Info",
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


const renderItem = (item) => {  
  //console.log(firstItemInDay);
  //firstItemInDay = false;
  return (
    <View style={{flex:1, flexDirection: "row", justifyContent: "center"}}>
    <View style={{height: 70, backgroundColor: "white", justifyContent: "center", borderRadius:10,
    borderWidth: 0,flex: 0.8}}>
    <TouchableOpacity>
    <View style={{marginLeft: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'black', fontWeight: 'bold', marginRight: 5}}>{item.name.code}</Text>
        <Text style={{color: 'grey'}}>{item.name.name}</Text>
      </View>
      <Text style={{color: 'grey'}}>{item.name.venue}</Text>
      </View>
    </TouchableOpacity>
    </View>
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

class appt {
  constructor(title, subtitle, start, end) {
    this.item = {
      title: title,
      subtitle: subtitle,
      start: new Date(start),
      end: new Date(end),
      color: '#390099'
    }
  }
}
class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {timetable: {}, loading: true};
  }
  //timetable = this.props.navigation.getParam("timetable");
  //console.log(timetable);
  
  componentDidMount() {
    AsyncStorage.getItem("timetable")
                .then((result) => {
                  let timetable = this.makeTimeDataArray(JSON.parse(result));
                  this.setState({
                    timetable: timetable, 
                    loading: false});
                  console.log(this.state.timetable);
                })
                .catch(e => console.error(e));
  }

  makeTimeDataArray(timetable) {
    let dataArray = [];
    for (t in timetable) {
      //console.log(timetable[t]);
      for (i in timetable[t]) {
        //console.log(timetable[t][i]);
        let item = timetable[t][i];
        dataArray.push((new appt(item.name.code, item.name.venue, item.start, item.end)).item);
      }
    }
    //console.log(dataArray[0]);
    return dataArray;
  }
 /*rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }*/

  render() {
    //console.log(this.timetable);
    if (this.state.loading) {
      return (
        <Loader loading={this.state.loading} />
      );
    } else {
      return (
        //<View>
        <RNSchedule
          dataArray={this.state.timetable}
          //onEventPress={(appt) => console.log(appt)}
          />
        //</View>
      )
    }
  }
}
      /*return (
        <Agenda
          items={this.state.timetable} 
          renderItem={renderItem.bind(this)}
          //loadItemsForMonth={this.loadItems.bind(this)}
          //renderDay={(day, item) => (<Text>{day ? day.day: item}</Text>)}
          //renderEmptyData = {() => {return (<View />);}}
          renderEmptyData = {() => {return (
            <View style={{height: 15, flex: 1, paddingTop: 30}}>
              
            </View>
          )}}
          selected={'2020-04-07'}
          minDate={'2020-01-01'}
          maxDate={'2020-05-10'}
          rowHasChanged={this.rowHasChanged.bind(this)}
          pastScrollRange={6}
          futureScrollRange={6}
          />
      );
    }
  }
}*/

Homescreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Schedules",
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
