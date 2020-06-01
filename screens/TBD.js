import React from "react";
import { View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const TBD = (props)=> {
    return (
        <View>
            <Text>
                To Be Decided
            </Text>
        </View>
    )
}

TBD.navigationOptions = (navigationData) => {
    return {
      headerTitle: "TBD",
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

export default TBD;