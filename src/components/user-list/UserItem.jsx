import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from '../../screens/Styles';
import theme from '../../theme/index';

const UserItem = ({ item, handleDeactivateUser, handleActivateUser }) => {
  return (
    <View style={[styles.card, { flexDirection: "row", alignItems: "center", padding: theme.spacing.small, marginBottom: theme.spacing.medium }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: 20 }]}>{item.name}</Text>
        <Text style={styles.textSecondary}>{item.email}</Text>
      </View>
      {item.user.isActivated ? (
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginHorizontal: theme.spacing.tiny }} onPress={() => handleDeactivateUser(item.userId)}>
          <Text style={{ marginRight: theme.spacing.tiny, color: theme.colors.primary }}>Click to deactivate</Text>
          <Icon name="block" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginHorizontal: theme.spacing.tiny }} onPress={() => handleActivateUser(item.userId)}>
          <Text style={{ marginRight: theme.spacing.tiny, color: theme.colors.textSecondary }}>Click to activate</Text>
          <Icon name="check-circle" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserItem;