// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import ShoppingList from "./screens/ShoppingList";
import RegisterScreen from './screens/Register';
import FoodList from "./screens/FoodList";
import FridgeList from "./screens/FridgeList";

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
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="FridgeList" component={FridgeList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
