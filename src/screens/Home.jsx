import React from "react";
import styles from "./Styles";
import { View, StyleSheet } from "react-native";
import { AppHeader, CommonButton } from "../components";

const Home = ({ navigation }) => {
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
    marginBottom: 16,
  },
});

const buttonList = [
  {
    title: "Create Shopping List",
    navigateTo: "ShoppingList",
    icon: "add-shopping-cart",
  },
  {
    title: "Schedule Meal",
    navigateTo: "ScheduleMeal",
    icon: "schedule",
  },
  {
    title: "Track Fridge Item",
    navigateTo: "TrackFridgeItem",
    icon: "kitchen",
  },
  {
    title: "Favourite Recipe",
    navigateTo: "FavouriteRecipe",
    icon: "favorite",
  },
  {
    title: "Generate Reports",
    navigateTo: "GenerateReports",
    icon: "assessment",
  },
  {
    title: "Create Food List",
    navigateTo: "CreateFoodList",
    icon: "list",
  },
  {
    title: "Create Group",
    navigateTo: "CreateGroup",
    icon: "group",
  },
];

export default Home;
