// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import ShoppingList from "./screens/ShoppingList";
import Group from "./screens/Group";
import GroupDetail from "./screens/GroupDetail";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="GroupDetail" component={GroupDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
