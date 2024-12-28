import React, { useEffect } from "react";
import styles from "./Styles";
import { View, StyleSheet } from "react-native";
import { AppHeader, CommonButton } from "../components";
import { useSelector } from "react-redux";
import { usePushNotifications } from '../hooks/usePushNotifications';
import axios from 'axios';
import { BASE_URL } from '../constants';

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const { expoPushToken, notification, isNewToken } = usePushNotifications();

  useEffect(() => {
    const savePushToken = async () => {
      if (expoPushToken && !isNewToken && user.accessToken) {
        try {
          const req = await axios.post(`${BASE_URL}/user/notification-token`, { token: expoPushToken }, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });
        } catch (error) {
          console.error('Error saving push token:', error);
        }
      }
    };
    savePushToken();
  }, [expoPushToken]);
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
    height: 130,
    marginBottom: 16,
    justifyContent: "center",
  },
});

const buttonList = [
  {
    title: "Create Shopping List",
    navigateTo: "UserShoppingList",
    icon: "add-shopping-cart",
  },
  {
    title: "Schedule Meal",
    navigateTo: "ScheduleMeal",
    icon: "schedule",
  },
  {
    title: "Track Fridge Item",
    navigateTo: "FridgeList",
    icon: "kitchen",
  },
  {
    title: "Favourite Recipe",
    navigateTo: "Recipe",
    icon: "favorite",
  },
  {
    title: "Generate Reports",
    navigateTo: "GenerateReports",
    icon: "assessment",
  },
  {
    title: "Create Food List",
    navigateTo: "FoodList",
    icon: "list",
  },
  {
    title: "Group",
    navigateTo: "Group",
    icon: "group",
  },
];

export default Home;
