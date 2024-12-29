import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from "../theme";
import { useDispatch } from 'react-redux';
import { adminLogout } from '../redux/apiRequests/authRequest';

const BottomTabViewAdmin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(route.name);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setActiveTab(route.name);
  }, [route.name]);

  const handlePress = (screenName) => {
    if (screenName === 'Profile') {
      setModalVisible(true);
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogout = () => {
    adminLogout(dispatch, navigation.navigate);
    setModalVisible(false);
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
      <TouchableOpacity onPress={() => handlePress('AdminHome')} style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor('AdminHome') }]}>
        <Icon name="home-outline" size={30} color={getIconColor('AdminHome')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Profile')} style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor('Profile') }]}>
        <Icon name="person-outline" size={30} color={getIconColor('Profile')} />
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.large,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.small,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
  },
  modalButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});

export default BottomTabViewAdmin;