import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
  };
};

const styles = StyleSheet.create({
  gradeBox: {
    flex: 1,
  },
});

export default GradeScreen;
