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
//import FriendScreen from "../screens/Friends"
//import DrawerMenu from "./DrawerMenu.js"

import Colors from "../constants/Colors";
import FolderScreen from "../screens/FolderScreen";

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
  Announcements: { 
    screen: AnnouncementScreen,
    navigationOptions: { title: 'Announcements'}
  },
  Files: {
    screen: FolderScreen, 
    navigationOptions: { title: 'Files'}
  },
  Media: {
    screen: MediaScreen, 
    navigationOptions: { title: 'Media'}
  },
  Grade: {
    screen: GradeScreen, 
    navigationOptions: { title: 'Grades'}
  },
});

/*const ModuleNavigator = createStackNavigator({
  ModuleInfoNavigation: {
    navigationOptions: { title: 'abc'}
  }
})*/
const FileInfoNavigation = ModuleInfoNavigation;

const ModulesSelectionNavigation = createStackNavigator(
  {
    ModulesSelection: ModulesSelectionScreen,
    Announcements: ModuleInfoNavigation,
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
