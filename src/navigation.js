import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import UserShoppingList from "./screens/UserShoppingList";
import RegisterScreen from './screens/Register';
import FoodList from "./screens/FoodList";
import FridgeList from "./screens/FridgeList";
import Group from "./screens/Group";
import GroupDetail from "./screens/GroupDetail";
import ScheduleMeal from "./screens/ScheduleMeal";
import Profile from "./screens/Profile";
import GroupShoppingList from "./screens/GroupShoppingList";
import AdminHome from "./screens/AdminHome";
import CategoryList from "./screens/CategoryList";
import MeasurementList from "./screens/MeasurementList";
import UserList from "./screens/UserList"; 

const Stack = createNativeStackNavigator();

function Navigation() {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const currentAdmin = useSelector((state) => state.adminAuth.adminLogin.currentAdmin);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {currentAdmin ? (
          <>
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="CategoryList" component={CategoryList} />
            <Stack.Screen name="MeasurementList" component={MeasurementList} />
            <Stack.Screen name="UserList" component={UserList} />
          </>
        ) : currentUser ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UserShoppingList" component={UserShoppingList} />
            <Stack.Screen name="FoodList" component={FoodList} />
            <Stack.Screen name="FridgeList" component={FridgeList} />
            <Stack.Screen name="Group" component={Group} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
            <Stack.Screen name="ScheduleMeal" component={ScheduleMeal} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="GroupShoppingList" component={GroupShoppingList} />
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