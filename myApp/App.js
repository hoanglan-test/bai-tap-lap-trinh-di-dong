import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.square}>
      <Text style={styles.Text}>Hello,world</Text>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square:{
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  Text:{
    color: 'white',
    fontSize: 20,
  }
});
