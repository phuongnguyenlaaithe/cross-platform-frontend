import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../redux/apiRequests/authRequest';

const LoginScreen = () => {
  const [email, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = { email, password };
    loginUser(user, dispatch, navigation.navigate);
  };

  return (
      <View style={styles.container}>
        {/* App Title */}
        <Title style={styles.title}>
          <Text style={styles.icon}>🍴</Text> MealPlan
        </Title>

        {/* Username Input */}
        <TextInput
          label="Username"
          value={email}
          onChangeText={(text) => setUsername(text)}
          mode="outlined"
          style={styles.input}
          textColor='#333333'
          outlineColor='#a992e8'
          activeOutlineColor='#a992e8'
        />

        {/* Password Input */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          textColor='#333333'
          outlineColor='#a992e8'
          activeOutlineColor='#a992e8'
        />

        {/* Login Button */}
        <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
          Login
        </Button>

        {/* Forgot Password Link */}
        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        {/* Register Link */}
        <Text style={styles.registerText}>
          New to MealPlan? <Text style={styles.registerLink}>Register</Text>
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: '#333333',
    },
    icon: {
      fontSize: 28,
      color: '#A992E8',
    },
    input: {
      marginBottom: 20,
      backgroundColor: '#E5E8FF',
      borderRadius: 10,
    },
    loginButton: {
      backgroundColor: '#D6B3FF',
      borderRadius: 10,
      paddingVertical: 8,
    },
    forgotPassword: {
      color: '#A992E8',
      textAlign: 'center',
      marginVertical: 10,
    },
    registerText: {
      color: '#333333',
      textAlign: 'center',
      marginTop: 20,
    },
    registerLink: {
      color: '#A992E8',
      fontWeight: 'bold',
    },
  })

export default LoginScreen;