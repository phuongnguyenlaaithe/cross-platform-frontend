import React from "react";
import styles from "./Styles";
import { View, StyleSheet } from "react-native";
import { AppHeader, CommonButton, BottomTabViewAdmin } from "../components";

const AdminHome = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} />
      <View style={styles.container}>
        <View style={thisStyles.buttonRow}>
          {buttonList.map((button, index) => (
            <View key={index} style={thisStyles.buttonWrapper}>
              <CommonButton
                title={button.title}
                size="Large"
                type="Primary"
                icon={button.icon}
                onPress={() => {
                  navigation.navigate(button.navigateTo);
                }}
              />
            </View>
          ))}
        </View>
      </View>
      <BottomTabViewAdmin />
    </View>
  );
};

const thisStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    width: "48%",
    height: 130,
    marginBottom: 16,
    justifyContent: "center",
  },
});

const buttonList = [
  {
    title: "User List",
    navigateTo: "UserList",
    icon: "people",
  },
  {
    title: "Category List",
    navigateTo: "CategoryList",
    icon: "category",
  },
  {
    title: "Measurement List",
    navigateTo: "MeasurementList",
    icon: "straighten",
  },
];

export default AdminHome;