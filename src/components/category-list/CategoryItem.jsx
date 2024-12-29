import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from '../../screens/Styles';
import theme from '../../theme/index';

const CategoryItem = ({ item, handleDeleteCategory }) => {
  return (
    <View style={[styles.card, { flexDirection: "row", alignItems: "center", padding: theme.spacing.small, marginBottom: theme.spacing.medium, height: 50 }]}>
      <View style={{ flex: 2 }}>
        <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: 20 }]}>{item.name}</Text>
      </View>
      <TouchableOpacity style={{ marginHorizontal: theme.spacing.tiny }} onPress={() => handleDeleteCategory(item.id)}>
        <Icon name="delete" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;