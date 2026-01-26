import React from 'react';
import { View, Button, Alert, Text } from 'react-native';

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2'
    }}>

      <Button
        title="Tap me"
        onPress={() => Alert.alert('hello')}
      />
    </View>
  );
}
