import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello 👋</Text>
      <Text style={styles.name}>Christie Doe</Text>

      <Text style={styles.title}>Your Insights</Text>

      <View style={styles.grid}>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Scan")}>
        <Image
          source={require("./Group 157.png")}
          style={styles.icon1}
        />
        <Text style={styles.cardTitle}>Scan new</Text>
        <Text style={styles.cardSub}>Scanned 483</Text>
      </TouchableOpacity>

      <View style={styles.card}>
      <View style={styles.icon1}>
      <Image
        source={require("./Frame.png")}
        style={styles.icon}
      />
      </View>

      <Text style={styles.cardTitle}>Counterfeits</Text>
      <Text style={styles.cardSub}>Counterfeited 32</Text>
      </View>

      <View style={styles.card}>
      <View style={styles.icon2}>
      <Image
        source={require("./Group 158.png")}
        style={styles.icon}
      />
      </View>

      <Text style={styles.cardTitle}>Success</Text>
      <Text style={styles.cardSub}>Checkouts 8</Text>
      </View>

      <View style={styles.card}>
      <View style={styles.icon3}>
      <Image
        source={require("./Group 151.png")}
        style={styles.icon}
      />
      </View>

      <Text style={styles.cardTitle}>Directory</Text>
      <Text style={styles.cardSub}>History 26</Text>
      </View>
      

</View>
    </View>
  );
}

function ScanScreen({ navigation }) {
  return (
    <View style={styles.scanContainer}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.arrow}>
      <Image
        source={require("./Arrow 1.png")}
          style={styles.icon}
      />
      </View>
      <Image
        source={require("./Juice.png")}
        style={styles.juice}
      />
 

      <View style={styles.productBox}>

  {/* LEFT */}
  <View style={styles.productLeft}>
    
    <View style={styles.thumbBox}>
      <Image
        source={require("./Juice.png")}
        style={styles.thumb}
      />
    </View>

    <View style={styles.productText}>
      <Text style={styles.brand}>Lauren's</Text>
      <Text style={styles.productName}>Orange Juice</Text>
    </View>

  </View>

  {/* RIGHT */}
  <View style={styles.addButton}>
    <Image
      source={require("./Group 3.png")}
      style={styles.plusIcon}
    />
  </View>

</View>
</View>

    
);
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },

  hello: {
    fontSize: 26,
    fontWeight: "bold"
  },

  name: {
    color: "gray",
    marginBottom: 30
  },
  

  title: {
    fontSize: 20,
    marginBottom: 20
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "47%",
    height: 120,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    justifyContent: "center",
    elevation: 3,
    alignItems: "center",
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 16
  },

  cardSub: {
    color: "gray",
    marginTop: 5
  },

  scanContainer: {
    flex: 1,
    backgroundColor: "#E7D7C9",
    alignItems: "center",
    justifyContent: "center"
  },

  back: {
    position: "absolute",
    top: 50,
    left: 20,
    fontSize: 18
  },

  bottle: {
    width: 200,
    height: 400,
    resizeMode: "contain"
  },

  productBox: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center"
  },

  icon1: {
  width: 40,
  height: 30,
  marginBottom: 10
  },

  icon: {
  width: 30,
  height: 30,
  marginBottom: 10
  },

  juice: {
  width: 300,
  height: 500,
  marginBottom: 10
  },


icon1:{
    width:60,
    height:60,
    backgroundColor:"#e7cebe",  
    borderRadius:20,            
    justifyContent:"center",
    alignItems:"center"
  },

  icon2:{
    width:60,
    height:60,
    backgroundColor:"#bee3e7",  
    borderRadius:20,            
    justifyContent:"center",
    alignItems:"center"
  },
  icon3:{
    width:60,
    height:60,
    backgroundColor:"#bed9e7",  
    borderRadius:20,            
    justifyContent:"center",
    alignItems:"center"
  },
arrow:{
  position: "absolute",
  top: 80,
  left: 30,

  width:60,
  height:60,
  backgroundColor:"#ede9e7",
  borderRadius:18,
  justifyContent:"center",
  alignItems:"center"
},


  productBox:{
  position:"absolute",
  bottom:40,
  width:"85%",
  backgroundColor:"white",
  borderRadius:20,
  padding:15,

  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",

  elevation:5
},

productBox:{
  position:"absolute",
  bottom:40,

  width:320,        
  height:80,

  backgroundColor:"white",
  borderRadius:25,

  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",

  paddingHorizontal:15,

  shadowColor:"#000",
  shadowOpacity:0.1,
  shadowRadius:10,
  elevation:6
},

productLeft:{
  flexDirection:"row",
  alignItems:"center"
},

thumbBox:{
  width:50,
  height:50,
  backgroundColor:"#ede6dc",
  borderRadius:15,
  justifyContent:"center",
  alignItems:"center",
  marginRight:10
},

thumb:{
  width:28,
  height:40,
  resizeMode:"contain"
},

productText:{
  justifyContent:"center"
},

brand:{
  fontSize:12,
  color:"#9E9E9E"
},

productName:{
  fontSize:16,
  fontWeight:"bold"
},

addButton:{
  width:48,
  height:48,
  backgroundColor:"#5B6CF6",
  borderRadius:15,
  justifyContent:"center",
  alignItems:"center"
},

plusIcon:{
  width:22,
  height:22,
  tintColor:"white"
},
});