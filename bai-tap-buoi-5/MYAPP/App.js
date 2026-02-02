import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

export default function App() {
  const [bgColor, setBgColor] = useState('pink');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'pink' }]}
          onPress={() => setBgColor('pink')}
        >
          <Text style={styles.textBlack}>PINK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={() => setBgColor('blue')}
        >
          <Text style={styles.textWhite}>BLUE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'brown' }]}
          onPress={() => setBgColor('brown')}
        >
          <Text style={styles.textWhite}>BROWN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'yellow' }]}
          onPress={() => setBgColor('yellow')}
        >
          <Text style={styles.textBlack}>YELLOW</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => setBgColor('red')}
        >
          <Text style={styles.textWhite}>RED</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={() => setBgColor('black')}
        >
          <Text style={styles.textWhite}>BLACK</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  button: {
    paddingVertical: 15,
    marginVertical: 8,
    borderRadius: 6,
    alignItems: 'center'
  },
  textWhite: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  textBlack: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});
