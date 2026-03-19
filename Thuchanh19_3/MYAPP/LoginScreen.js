
import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "./AuthContext";

export default function LoginScreen({ navigation }) {
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {
    const success = isRegister ? register(email, password) : login(email, password);
    if (!success) alert("Email hoặc mật khẩu không hợp lệ");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? "Register" : "Login"}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isRegister ? "Register" : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={{marginTop:10}}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, justifyContent:"center", alignItems:"center", padding:20},
  title:{fontSize:24, fontWeight:"bold", marginBottom:20},
  input:{width:"100%", padding:10, borderWidth:1, borderColor:"#ccc", borderRadius:10, marginBottom:10},
  button:{backgroundColor:"#5B4CF0", padding:15, borderRadius:20, width:"100%", alignItems:"center"},
  buttonText:{color:"white", fontWeight:"bold"}
});