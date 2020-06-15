import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import Homescreen from "../screens/Homescreen";
import ModulesSelectionScreen from "../screens/ModulesSelectionScreen";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import Login from "../screens/Login";
import TBD from "../screens/TBD";
import Logout from "../screens/Logout";
//import DrawerMenu from "./DrawerMenu.js"

import Colors from "../constants/Colors";
import { SCHEDULEITEMS } from "../data/dummy-data";
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
  Files: TBD,
  Media: TBD,
  Grade: TBD,
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

const MainNavigator = createDrawerNavigator({
  Schedule: HomepageNavigation,
  ModulesSelection: ModulesSelectionNavigation,
  'Log Out': Logout
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: Login, 
    MainScreen: MainNavigator
  }, 
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

export default createAppContainer(LoginNavigator);
