import React, { createContext, useState, useContext } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* =========================
   1. TẠO CONTEXT
========================= */

const AuthContext = createContext();

/* =========================
   2. LOGIN SCREEN
========================= */

function LoginScreen() {

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <Text style={styles.forgot}>Forgot password?</Text>

      <Button
        title="Login"
        color="orange"
        onPress={() => login(email, password)}
      />

      <Text style={styles.or}>Or sign in with</Text>

       <View style={styles.socialRow}>

        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={require("./google.png")}
            style={styles.socialIcon}
          />
          <Text>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookBtn}>
          <Image
            source={require("./facebook.png")}
            style={styles.socialIcon}
          />
          <Text style={{color:"white"}}>Facebook</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.signup}>
        Not yet a member? <Text style={{color:"orange"}}>Sign Up</Text>
      </Text>

    </View>
  );
}

/* =========================
   3. HOME SCREEN
========================= */

function HomeScreen({ navigation }) {

  return (
    <View style={styles.homecontainer}>

      <Text style={styles.sectionTitle}>Top Categories</Text>
      <View style={styles.row}>

        <View style={styles.item}>
          <Image
            source={require("./pizza.png")}
            style={styles.image}
          />
          <Text>Pizza</Text>
        </View>

        <View style={styles.item}>
          <Image
            source={require("./hamburger.png")}
            style={styles.image}
          />
          <Text>Burgers</Text>
        </View>

        <View style={styles.item}>
          <Image
            source={require("./Steak.png")}
            style={styles.image}
          />
          <Text>Steak</Text>
        </View>

      </View>

      <Text style={styles.sectionTitle}>Popular Items</Text>
      <View style={styles.foodRow}>
        <View style={styles.foodCard}>

          <Image
            source={require("./Food1.jpg")}
            style={styles.foodImage}
          />

          <View style={styles.foodInfo}>
            <Text style={styles.foodTitle}>Food 1</Text>
            <Text style={styles.foodCountry}>By Viet Nam</Text>
            <Text style={styles.foodPrice}>1$</Text>
          </View>

        </View>
        <View style={styles.foodCard}>

          <Image
            source={require("./salad.jpg")}
            style={styles.foodImage}
          />

          <View style={styles.foodInfo}>
            <Text style={styles.foodTitle}>Food 2</Text>
            <Text style={styles.foodCountry}>By Viet Nam</Text>
            <Text style={styles.foodPrice}>3$</Text>
          </View>

        </View>
      </View>
      <Text style={styles.sectionTitle}>Popular Items</Text>
        <View style={styles.popularRow}>
          <Image
            source={require("./my.jpg")}
            style={styles.popularImage}
          />
          <Image
            source={require("./nem.jpg")}
            style={styles.popularImage}
          />
        </View>
      <Button
        title="Go to Account"
        color="orange"
        onPress={() => navigation.navigate("Account")}
      />

    </View>
  );
}

/* =========================
   4. ACCOUNT SCREEN
========================= */

function AccountScreen() {

  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{user?.name}</Text>

      <Text style={styles.job}>Mobile developer</Text>
      
      <Text style={styles.desc}>
        I have above 5 years of experience in native
        mobile apps development, now i am learning
        React Native
        
      </Text>

      <Button
        title="Sign Out"
        color="orange"
        onPress={logout}
      />

    </View>
  );
}

/* =========================
   5. NAVIGATION
========================= */

const Stack = createNativeStackNavigator();

function AppNavigator() {

  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>

      <Stack.Navigator>

        {user == null ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{headerShown:false}}
          />
        ) : (
          <>
            <Stack.Screen name="Explorer" component={HomeScreen}/>
            <Stack.Screen name="Account" component={AccountScreen}/>
          </>
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

/* =========================
   6. APP + CONTEXT PROVIDER
========================= */

export default function App() {

  const [user, setUser] = useState(null);

  const login = (email, password) => {

    if (email === "hungnguyen@gmail.com" && password === "123456") {
      setUser({
        name: "Hung Nguyen",
        email: email
      });
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }

  };

  const logout = () => {
    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      <AppNavigator/>

    </AuthContext.Provider>

  );
}

/* =========================
   7. STYLE
========================= */

const styles = StyleSheet.create({

  container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  padding:20
},
homecontainer:{
flex: 1,
padding: 20
},

sectionTitle:{
  fontSize:20,
  fontWeight:"bold",
  marginBottom:10,
},

  title:{
    fontSize:24,
    marginBottom:20
  },

  input:{
    width:"100%",
    borderWidth:1,
    padding:10,
    marginBottom:10
  },

  job:{
    color: "blue"
  },

  desc:{
    marginTop: 10,
    marginBottom: 10,
    textAlign:"center"
  },

  row:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:20
},

item:{
  alignItems:"center"
},

image:{
  width:100,
  height:70,
  borderRadius:10,
  marginBottom:5
},

foodCard:{
  flexDirection:"row",
  backgroundColor:"#f2f2f2",
  padding:10,
  borderRadius:15,
  alignItems:"center",
  marginBottom:15
},

foodImage:{
  width:80,
  height:80,
  borderRadius:10,
  marginRight:10
},

foodInfo:{
  flex:1
},

foodTitle:{
  fontSize:16,
  fontWeight:"bold"
},

foodCountry:{
  color:"gray",
  marginTop:2
},

foodPrice:{
  marginTop:5,
  fontWeight:"bold"
},
foodRow:{
  flexDirection:"row",
  justifyContent:"space-between"
},

popularRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:20
},

popularImage:{
  width:"48%",
  height:120,
  borderRadius:15
},

forgot:{
  alignSelf:"flex-end",
  color:"orange",
  marginBottom:15,
  fontWeight:"bold"
},

or:{
   textAlign:"center",
  marginTop:15,
  marginBottom:15,
  fontWeight:"bold"
},

socialRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:20,
  width:"100%"   
},

googleBtn:{
  flexDirection:"row",
  alignItems:"center",
  borderWidth:1,
  padding:12,
  borderRadius:10,
  width:"48%",
  justifyContent:"center"
},

facebookBtn:{
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#4267B2",
  padding:12,
  borderRadius:10,
  width:"48%",
  justifyContent:"center"
},

socialIcon:{
  width:20,
  height:20,
  marginRight:5
},





});