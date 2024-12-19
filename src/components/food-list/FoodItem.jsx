import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from '../../screens/Styles';
import theme from '../../theme/index';

const FoodItem = ({ item, categories, measurements, handleDeleteFood }) => {
  const category = categories.find(cat => cat.id === item.categoryId);
  const measurement = measurements.find(unit => unit.id === item.unitId);

  return (
    <View style={[styles.card, { flexDirection: "row", alignItems: "center", padding: theme.spacing.small, marginBottom: theme.spacing.medium }]}>
      {item.imageURL && (
        <Image source={{ uri: item.imageURL }} style={{ width: 80, height: 80, marginRight: theme.spacing.medium, borderRadius: 100 }} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: 20 }]}>{item.name}</Text>
        <Text style={styles.textSecondary}>category: {category?.name || "Unknown"}</Text>
        <Text style={styles.textSecondary}>measurement: {measurement?.name || "Unknown"}</Text>
      </View>
      <TouchableOpacity style={{ marginHorizontal: theme.spacing.tiny }} onPress={() => handleDeleteFood(item.id)}>
        <Icon name="delete" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default FoodItem;