import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Moment from 'moment';
import { SCHEDULEITEMS } from "../data/dummy-data";
import ScheduleItemTile from "../components/ScheduleItemTile";
import HeaderButton from "../components/HeaderButton";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from "@react-native-community/async-storage";

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

const example = () => Calendar({
  day: 25, 
  month: 6, 
  year: 2020, 
  //timestamp
  dateString: '2020-06-25'
})
const dailyData = () => {
  return {'2020-06-24': [
    {name: "example", start:"2020-06-25 10:00", end: "2020-06-25 12:00"}], 
    '2020-06-25': [{name: 'example2', start:"2020-06-25 13:00", end: "2020-06-25 14:00"}]};
}

const renderItem = (item, firstItemInDay) => {
  console.log('rendering', item)
  return (
    <TouchableOpacity style={{color: 'blue'}}>
      <Text style={{color: 'black'}}>{Moment(item.start).format("hh:mm a")}</Text>
      <Text style={{color: 'black'}}>{Moment(item.end).format("hh:mm a")}</Text>
      <Text style={{color: 'grey'}}>{item.name}</Text>
    </TouchableOpacity>
  );
} 
/*
<Text style={{color: '#555'}}>{item.code}</Text>
*/
const Homescreen = (props) => {
  async function getTimetable() {
    return await JSON.parse(AsyncStorage.getItem('timetable'));
  }
  return (
    <Agenda
      items={dailyData()} 
      renderItem={(item, firstItemInDay) => {return (renderItem(item, firstItemInDay));}}
      renderEmptyData = {() => {return (<View />);}}

      />
  )
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
