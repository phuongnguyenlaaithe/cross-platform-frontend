import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from "../theme";

const BottomTabView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(route.name);

  useEffect(() => {
    setActiveTab(route.name);
  }, [route.name]);

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  const getIconColor = (screenName) => {
    return activeTab === screenName ? theme.colors.white : theme.colors.textPrimary;
  };

  const getIconBackgroundColor = (screenName) => {
    return activeTab === screenName ? theme.colors.primary : 'transparent';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('Settings')} style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor('Settings') }]}>
        <Icon name="settings-outline" size={30} color={getIconColor('Settings')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Home')} style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor('Home') }]}>
        <Icon name="home-outline" size={30} color={getIconColor('Home')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Profile')} style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor('Profile') }]}>
        <Icon name="person-outline" size={30} color={getIconColor('Profile')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.secondary,
    height: 75, 
  },
  iconContainer: {
    padding: 7,
    borderRadius: theme.borderRadius.full,
  },
});

export default BottomTabView;