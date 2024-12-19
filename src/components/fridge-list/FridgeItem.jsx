import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from '../../screens/Styles';
import theme from '../../theme/index';

const FridgeItem = ({ item, foods, units, handleDeleteFridgeItem }) => {
  const food = foods.find(food => food.id === item.foodId);
  const unit = units.find(unit => unit.id === food.unitId);

  return (
    <View style={[styles.card, { flexDirection: "row", alignItems: "center", padding: theme.spacing.small, marginBottom: theme.spacing.medium }]}>
      {food?.imageURL && (
        <Image source={{ uri: food.imageURL }} style={{ width: 80, height: 80, marginRight: theme.spacing.medium, borderRadius: 100 }} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: 20 }]}>{food?.name || "Unknown Food"}</Text>
        <Text style={styles.textSecondary}>Quantity: {item.quantity} {unit?.name || "Unknown unit"}</Text>
        <Text style={styles.textSecondary}>Note: {item.note}</Text>
        <Text style={styles.textSecondary}>Start Date: {new Date(item.startDate).toLocaleDateString()}</Text>
        <Text style={styles.textSecondary}>Expired Date: {new Date(item.expiredDate).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity style={{ marginHorizontal: theme.spacing.tiny }} onPress={() => handleDeleteFridgeItem(item.id)}>
        <Icon name="delete" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default FridgeItem;