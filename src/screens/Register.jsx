import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../redux/apiRequests/authRequest';
import theme from "../theme/index";

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage(''); 
    const user = { email, password };

    try {
      await registerUser(user, dispatch, () => {
        setPopupVisible(true); 
      });
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍴 MealPlan</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        textColor={theme.colors.textPrimary}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textColor={theme.colors.textPrimary}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textColor={theme.colors.textPrimary}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.registerButton}
        labelStyle={styles.registerButtonText}
      >
        Register
      </Button>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>

      {/* Modal Pop-up */}
      <Modal
        transparent={true}
        visible={isPopupVisible}
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Verify Your Email</Text>
            <Text style={styles.modalMessage}>
              A verification link has been sent to your email. Please check your email to verify your account.
            </Text>
            <Button
              mode="contained"
              onPress={closePopup}
              style={styles.modalButton}
              labelStyle={styles.modalButtonText}
            >
              Go to Login
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.white,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f0f0ff',
  },
  registerButton: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
  registerButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  link: {
    color: theme.colors.primary,
    marginTop: 8,
    fontWeight: 'bold',
  },
  loginText: {
    color: theme.colors.textPrimary,
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  modalButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
