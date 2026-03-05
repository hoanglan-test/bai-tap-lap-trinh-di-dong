import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


// =======================
// LOGIN SCREEN
// =======================
function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);

    const match = limited.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (!match) return limited;

    return [match[1], match[2], match[3], match[4]]
      .filter(Boolean)
      .join(' ');
  };

  const validatePhone = (raw) => {
    if (!raw) return 'Vui lòng nhập số điện thoại';
    if (raw.length !== 10)
      return 'Số điện thoại không đúng định dạng. Vui lòng nhập lại';
    return '';
  };

  const handleChangeText = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    const raw = formatted.replace(/\s/g, '');
    setError(validatePhone(raw));
  };

  const showAlert = (message) => {
    if (Platform.OS === 'web') {
      alert(message);
    } else {
      Alert.alert('Thông báo', message);
    }
  };

  const handleContinue = () => {
    const raw = phone.replace(/\s/g, '');
    const errorMsg = validatePhone(raw);

    if (errorMsg) {
      setError(errorMsg);
      showAlert(errorMsg);
      return;
    }

    // 👉 Nếu hợp lệ → chuyển sang Home
    navigation.navigate('Home', { phone: raw });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={[styles.input, error && { borderBottomColor: 'red' }]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="number-pad"
          value={phone}
          onChangeText={handleChangeText}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


// =======================
// HOME SCREEN
// =======================
function HomeScreen({ route }) {
  const { phone } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trang chủ</Text>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>
🎉 Chào mừng bạn!
        </Text>

        <Text style={{ marginTop: 10, fontSize: 16 }}>
          Số điện thoại của bạn: {phone}
        </Text>
      </View>
    </SafeAreaView>
  );
}


// =======================
// APP ROOT
// =======================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// =======================
// STYLE
// =======================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 22,
    fontWeight: '600',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: { padding: 16 },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 13,
  },
  button: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#328ccc',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});