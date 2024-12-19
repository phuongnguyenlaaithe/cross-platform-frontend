import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../redux/apiRequests/authRequest';
import theme from "../theme/index";

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
          textColor={theme.colors.textPrimary}
          outlineColor={theme.colors.primary}
          activeOutlineColor={theme.colors.primary}
          style={styles.input}
        />

        {/* Password Input */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry
          textColor={theme.colors.textPrimary}
          outlineColor={theme.colors.primary}
          activeOutlineColor={theme.colors.primary}
          style={styles.input}
        />

        {/* Login Button */}
        <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
          Login
        </Button>

        {/* Forgot Password Link */}
        <Text style={styles.forgotPassword }>Forgot Password?</Text>

        {/* Register Link */}
        <Text style={styles.registerText}>
          New to MealPlan? <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>Register</Text>
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
      color: theme.colors.textPrimary,
    },
    icon: {
      fontSize: 28,
      color: theme.colors.primary,
    },
    input: {
      marginBottom: 20,
      backgroundColor: '#f0f0ff',
      borderRadius: 10,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      paddingVertical: 8,
    },
    forgotPassword: {
      color: theme.colors.primary,
      textAlign: 'center',
      marginVertical: 10,
    },
    registerText: {
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginTop: 20,
    },
    registerLink: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  })

export default LoginScreen;