import React from "react";
import theme from "../theme/index";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppHeader from "../components/AppHeader";

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

const ShoppingList = () => {
  return (
    <View>
      <AppHeader />
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <TouchableOpacity style={styles.addListButton}>
            <Text style={styles.addListButtonText}>Add List</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
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
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.bgLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.large,
    marginRight: 8,
    ...theme.shadows.button,
  },
  addListButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.button,
  },
  addListButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.card,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
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
