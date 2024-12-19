import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import ShoppingList from "./screens/ShoppingList";
import RegisterScreen from './screens/Register';
import FoodList from "./screens/FoodList";
import FridgeList from "./screens/FridgeList";
import Group from "./screens/Group";
import GroupDetail from "./screens/GroupDetail";

const Stack = createNativeStackNavigator();

function Navigation() {
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {currentUser ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ShoppingList" component={ShoppingList} />
            <Stack.Screen name="FoodList" component={FoodList} />
            <Stack.Screen name="FridgeList" component={FridgeList} />
            <Stack.Screen name="Group" component={Group} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;