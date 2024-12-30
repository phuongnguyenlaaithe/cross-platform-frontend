import React from "react";
import theme from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AppHeader = ({ navigation, showBackButton = false }) => {
  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
      )}
      <Text style={styles.appTitle}>ShoppingPal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.card,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: theme.spacing.medium,
    paddingTop: 50,
  },
  appTitle: {
    color: theme.colors.black,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 50,
  },
});

export default AppHeader;
