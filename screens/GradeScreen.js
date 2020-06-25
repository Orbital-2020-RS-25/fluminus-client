import React from "react";
import { View, Text, StyleSheet } from "react-native";

import HeaderButton from "../components/HeaderButton";

const GradeScreen = (props) => {
  return (
    <View style={styles.gradeBox}>
      <Text>Idk what to put here</Text>
    </View>
  );
};

GradeScreen.navigationOptions = (navigationData) => {
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

const styles = StyleSheet.create({
  gradeBox: {
    flex: 1,
  },
});

export default GradeScreen;
