import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import Homescreen from "../screens/Homescreen";
import ModulesSelectionScreen from "../screens/ModulesSelectionScreen";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import Login from "../screens/Login";
import FolderScreen from "../screens/FolderScreen";
import FileScreen from "../screens/FileScreen";
import MediaScreen from "../screens/MediaScreen";
import FriendScreen from "../screens/FriendScreen";
import Logout from "../screens/Logout";

import AnnouncementInfoScreen from "../screens/AnnouncementInfoScreen";
import TBD from "../screens/TBD";

import Colors from "../constants/Colors";
import FolderScreen from "../screens/FolderScreen";

const HomepageNavigation = createStackNavigator(
  {
    Home: Homescreen,
    "Announcement Info": AnnouncementInfoScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.accentColour : Colors.primaryColour,
    },
  }
);

const ModuleNavigator = createBottomTabNavigator(
  {
    Announcements: {
      screen: AnnouncementScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-notifications"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Files: {
      screen: FolderScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="md-document" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Media: {
      screen: MediaScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="md-play" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      activeTintColor:
        Platform.OS === "android" ? Colors.accentColour : Colors.primaryColour,
    },
  }
);

/*const ModuleNavigator = createStackNavigator({
  ModuleInfoNavigation: {
    navigationOptions: { title: 'abc'}
  }
})*/
const FileInfoNavigation = ModuleInfoNavigation;

const ModulesSelectionNavigation = createStackNavigator(
  {
    ModulesSelection: ModulesSelectionScreen,
    "Module info": ModuleNavigator,
    FileSelection: FileScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.accentColour : Colors.primaryColour,
    },
  }
);

const FriendsNavigation = createStackNavigator(
  {
    Friends: FriendScreen,
    TBD: TBD,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.accentColour : Colors.primaryColour,
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Schedule: HomepageNavigation,
    Modules: ModulesSelectionNavigation,
    "Log Out": Logout,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColour,
    },
  }
);

/*const ModuleNavigator = createStackNavigator(
  ModuleInfoNavigation, {
    initialRouteName: 'Announcements', 
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      let name;
      if (routeName === 'Announcements') {
        name = 'Announcements';
        return 
      } else if (routeName === 'Files') {
        name = 'Files';
      } else if (routeName === 'Media') {
        name = 'Media';
      } else if (routeName === 'Grade') {
        name = 'Grades';
      }
      title: name
    }
  }
)*/

const LoginNavigator = createStackNavigator(
  {
    Login: Login,
    MainScreen: MainNavigator,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(LoginNavigator);
