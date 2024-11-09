import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../theme/index";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="menu" size={24} color={theme.colors.black} />
      </TouchableOpacity>
      <Text style={styles.appTitle}>ShoppingPal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.bgLight,
    ...theme.shadows.card,
  },
  iconContainer: {
    marginRight: theme.spacing.medium,
  },
  appTitle: {
    color: theme.colors.black,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppHeader;
