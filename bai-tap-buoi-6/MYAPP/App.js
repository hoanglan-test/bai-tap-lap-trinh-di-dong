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
import React, { useState } from 'react';

export default function App() {
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
    setError(validatePhone(raw)); // hiện lỗi realtime
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
      setError(errorMsg);   // giữ chữ đỏ
      showAlert(errorMsg); // hiện hộp thông báo
      return;
    }

    showAlert('Số điện thoại hợp lệ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Đăng nhập</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={[
            styles.input,
            error && { borderBottomColor: 'red' },
          ]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="number-pad"
          value={phone}
          onChangeText={handleChangeText}
        />

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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