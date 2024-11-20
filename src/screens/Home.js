import React from "react";
import styles from "./Styles";
import AppHeader from "../components/AppHeader";
import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View>
      <AppHeader />
      <View style={styles.container}>
        <Button
          title="Create Shopping List"
          onPress={() => {
            navigation.navigate("ShoppingList");
          }}
        />
      </View>
    </View>
  );
};

export default Home;
