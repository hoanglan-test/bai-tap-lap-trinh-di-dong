import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function App() {
const [phone, setPhone] = useState("");

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
        onChangeText={setPhone}
        />

        <TouchableOpacity
        style={[
          styles.button,
          phone.length < 9 && styles.buttonDisabled
        ]}
        disabled={phone.length < 9}
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
});