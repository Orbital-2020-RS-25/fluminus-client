import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import Homescreen from "../screens/Homescreen";
import ModulesSelectionScreen from "../screens/ModulesSelectionScreen";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import Login from "../screens/Login";
import FileScreen from "../screens/FileScreen";
import GradeScreen from "../screens/GradeScreen";
import MediaScreen from "../screens/MediaScreen";
import FriendScreen from "../screens/FriendScreen";
import TBD from "../screens/TBD";
import Logout from "../screens/Logout";
//import DrawerMenu from "./DrawerMenu.js"

import Colors from "../constants/Colors";

const HomepageNavigation = createStackNavigator(
  {
    Home: Homescreen,
    TBD: TBD,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColour,
    },
  }
);

const ModuleInfoNavigation = createBottomTabNavigator({
  Announcements: AnnouncementScreen,
  Files: FileScreen,
  Media: MediaScreen,
  Grade: GradeScreen,
});

const ModulesSelectionNavigation = createStackNavigator(
  {
    ModulesSelection: ModulesSelectionScreen,
    Announcement: ModuleInfoNavigation,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColour,
    },
  }
);

const FriendsNavigation = createStackNavigator(
  {
    Friends: FriendScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColour : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColour,
    },
  }
);
const MainNavigator = createDrawerNavigator({
  Schedule: HomepageNavigation,
  ModulesSelection: ModulesSelectionNavigation,
  Friends: FriendsNavigation,
  "Log Out": Logout,
});

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
