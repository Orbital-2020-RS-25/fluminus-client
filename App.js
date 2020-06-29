import React from "react";
import { enableScreens } from "react-native-screens";

import AppNavigator from "./navigation/AppNavigator";

enableScreens();
console.disableYellowBox = true;
export default function App() {
  return <AppNavigator />;
}
