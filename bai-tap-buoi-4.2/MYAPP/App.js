import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Square = ({ color, label }) => {
  return (
    <View style={[styles.square, { backgroundColor: color }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Square color="#7FE7F5" label="Square 1" />
      <Square color="#4CC6C2" label="Square 2" />
      <Square color="#FF6B81" label="Square 3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',        // nằm ngang
    justifyContent: 'center',    // căn giữa ngang
    alignItems: 'center',        // căn giữa dọc
    backgroundColor: '#fff',
  },
  square: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 12,
  },
});
