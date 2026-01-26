import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,SafeAreaView,} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
const [phone, setPhone] = useState("");
const [error, setError] = useState("");

const validatePhone = (value) => {
    // chỉ cho nhập số
    const numericValue = value.replace(/[^0-9]/g, '');
    setPhone(numericValue);

    if (numericValue.length === 0) {
      setError('Vui lòng nhập số điện thoại');
    } else if (numericValue.length < 10) {
      setError('Số điện thoại phải đủ 10 chữ số');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (phone.length === 10) {
      Alert.alert('Thành công', 'Số điện thoại hợp lệ');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>

      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      <TextInput style={styles.input}
        placeholder = "Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={validatePhone}
        maxLength={10}
        />
        {error !=='' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
        style={[
          styles.button,
          phone.length ===10 ? styles.buttonActive: styles.buttonDisabled,
        ]}
        disabled={phone.length !==10}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 30,
    marginLeft: 10,
  },
  label: {
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 20,
    marginLeft: 10,
  }, 
  desc: {
    marginBottom: 20,
    marginLeft: 10,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 40,
    marginLeft: 10,
  },
  error:{
    color:'red',
    marginTop:6,
  },

  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonDisabled: {
    backgroundColor: "#f2f2f2"
  },
  buttonActive:{
    backgroundColor:'#4CC6C2'
  }
});