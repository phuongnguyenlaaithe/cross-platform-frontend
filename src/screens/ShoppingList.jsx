import React from "react";
import styles from "./Styles";
import theme from "../theme/index";
import Icon from "react-native-vector-icons/MaterialIcons";

import { AppHeader, Accordion } from "../components";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const data = [
  { category: "Fruits", items: [{ name: "Apples", quantity: "3 pcs" }] },
  { category: "Vegetables", items: [{ name: "Carrots", quantity: "1 kg" }] },
];

const ShoppingList = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <View
          style={[styles.headerItem, { marginBottom: theme.spacing.large }]}
        >
          <TextInput style={styles.input} placeholder="Search" />
          <TouchableOpacity style={styles.buttonPrimaryMedium}>
            <Text style={styles.buttonPrimaryMediumText}>Add List</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Accordion title="Grocery List">heheheh</Accordion>
          {/* <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Grocery List</Text>
            <TouchableOpacity>
              <Icon
                name="delete"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.category}
            renderItem={renderCategory}
            contentContainerStyle={styles.categoryList}
          /> */}
        </View>
      </View>
    </View>
  );
};

const renderCategory = ({ item }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryTitle}>{item.category}</Text>
    {item.items.map((subItem, index) => (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemIcon}>
          <Icon name="check-box" size={20} color={theme.colors.primary} />
        </View>
        <Text style={styles.itemName}>{subItem.name}</Text>
        <Text style={styles.itemQuantity}>{subItem.quantity}</Text>
      </View>
    ))}
    <TouchableOpacity style={styles.addItemButton}>
      <Icon name="add" size={16} color={theme.colors.primary} />
      <Text style={styles.addItemText}>Add Item</Text>
    </TouchableOpacity>
  </View>
);

const thisStyles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemIcon: {
    marginRight: 8,
  },
  itemName: {
    flex: 1,
    color: theme.colors.textPrimary,
  },
  itemQuantity: {
    color: theme.colors.textSecondary,
  },
  addItemButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addItemText: {
    color: theme.colors.primary,
    marginLeft: 4,
  },
});

export default ShoppingList;
