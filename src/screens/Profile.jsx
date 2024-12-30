import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, addProfile, updateProfile } from '../redux/apiRequests/profileRequest';
import { logoutUser } from '../redux/apiRequests/authRequest';
import theme from "../theme";
import { AppHeader, BottomTabView } from "../components";
import styles from "./Styles";
import SelectionModal from '../components/SelectionModal';
import Iconicons from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.refreshToken);
  const userId = useSelector((state) => state.auth.login.currentUser?.userId);
  const profile = useSelector(state => state.profile.currentProfile);
  const isFetching = useSelector(state => state.profile.isFetching);

  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken, dispatch, userId); 
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setGender(profile.gender);
      setBirthDate(new Date(profile.birthDate));
      setAvatar(profile.photoURL);
    }
  }, [profile]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender.name);
    setModalVisible(false);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('birthDate', birthDate.toISOString());
    if (avatar) {
      formData.append('avatar', {
        uri: avatar,
        type: 'image/png', 
        name: 'avatar.png',
      });
    }
    if (profile) {
      await updateProfile(accessToken, dispatch, userId, formData);
    } else {
      await addProfile(accessToken, dispatch, formData);
    }
  };

  const handleLogout = async ()  => {
    await logoutUser(dispatch, navigation.navigate);
  };

  const genderOptions = [
    { id: 1, name: 'MALE' },
    { id: 2, name: 'FEMALE' },
    { id: 3, name: 'OTHER' },
  ];

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium, textAlign: 'center' }]}>Profile</Text>
        
        <TouchableOpacity style={style.avatarContainer} onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={style.avatar} />
          ) : (
            <Image source={require('../../assets/default_avatar.jpg')} style={style.avatar} />
          )}
        </TouchableOpacity>

        <Text style={style.label}>Name</Text>
        <TextInput
          style={[styles.input, { marginBottom: theme.spacing.medium, height: 50 }]}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={style.label}>Gender</Text>
        <TouchableOpacity
          style={[styles.input, { marginBottom: theme.spacing.medium, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}
          onPress={() => setModalVisible(true)}
        >
          <Text>{gender || "Select Gender"}</Text>
          <Iconicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>

        <Text style={style.label}>Date of Birth</Text>
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />

<TouchableOpacity style={style.saveButton} onPress={handleSave}>
          {isFetching ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text style={style.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
          <Text style={style.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <BottomTabView />

      <SelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={genderOptions}
        onSelect={selectGender}
        title="Select Gender"
      />
    </View>
  );
};

const style = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: theme.borderRadius.full,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.small,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: theme.colors.black,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Profile;