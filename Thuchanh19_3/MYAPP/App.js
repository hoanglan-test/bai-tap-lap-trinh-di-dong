import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { products } from "./data"; 
import { AuthProvider, AuthContext } from "./AuthContext";
import LoginScreen from "./LoginScreen";

const Tab = createBottomTabNavigator();

/* ================= HOME SCREEN ================= */

function HomeScreen() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ScrollView style={{flex:1, backgroundColor:"#f5f5f5"}}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          
          <Image
            source={require("./assets/Ellipse 22.png")}
            style={styles.avatar}
          />

          <View>
            <Text style={{color:"#777"}}>Your Location</Text>
            <Text style={{fontWeight:"bold", fontSize:16}}>Savar, Dhaka</Text>
          </View>

          <Ionicons name="notifications-outline" size={24}/>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="white"/>
          <TextInput
            placeholder="Search your food"
            placeholderTextColor="#ddd"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="options-outline" size={20} color="white"/>
        </View>
      </View>

      {/* CATEGORY */}
      <View style={styles.categoryRow}>
        
        <View style={[styles.categoryItem,{backgroundColor:"#2ecc71"}]}>
          <Ionicons name="pizza-outline" size={26} color="white"/>
          <Text style={{color:"white"}}>PIZZA</Text>
        </View>

        <View style={styles.categoryItem}>
          <Ionicons name="fast-food-outline" size={26}/>
          <Text>BURGER</Text>
        </View>

        <View style={styles.categoryItem}>
          <Ionicons name="wine-outline" size={26}/>
          <Text>DRINK</Text>
        </View>

        <View style={styles.categoryItem}>
          <Ionicons name="restaurant-outline" size={26}/>
          <Text>RICE</Text>
        </View>

      </View>

      {/* BANNER */}
      <View style={styles.bannerCard}>

        <Image
          source={require("./assets/Group 33660.png")}
          style={styles.bannerImg}
        />

      </View>

      {/* POPULAR */}
      <View style={styles.popularHeader}>
        <Text style={styles.popularTitle}>Popular Items</Text>
        <Text style={{color:"#888"}}>View All</Text>
      </View>
      <View style={styles.popularRow}>
        {filteredProducts.map((item, index) => (
          <View key={index} style={styles.foodCard}>
            <Image source={item.image} style={styles.foodImg} />
            <Text style={styles.foodText}>{item.name}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
/* ================= CART SCREEN ================= */

function CartScreen() {
  return (
    <ScrollView style={styles.cartContainer}>

      {/* HEADER */}
      <View style={styles.cartHeader}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={styles.cartTitle}>Shopping Cart</Text>
        <Image source={require("./assets/Frame.png")} style={styles.icon} />
      </View>

      {/* MAIN BURGER IMAGE */}
      <View style={styles.mainImageBox}>
        <Image
          source={require("./assets/Rectangle 35.png")}
          style={styles.mainBurger}
        />
        <Image
        source={require("./assets/Group 33663.png")}
        style={styles.discount}
        />
        <Image
          source={require("./assets/Group 33670.png")}
          style={styles.smallBurgerRow}
        />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.foodName}>BURGER</Text>
          <Text style={styles.price}>$28</Text>
        </View>

        <View style={styles.quantityRow}>
          <Text style={styles.rating}>⭐ 4.9 (3k+ Rating)</Text>
          <Image source={require("./assets/Group 33665.png")} style={styles.qtyIcon} />
        </View>

        <View style={styles.addressBox}>
          <Image source={require("./assets/Group 33669.png")} style={styles.address} />
            <View style={styles.purpleBox}>
              <Image source={require("./assets/Frame (1).png")} style={styles.smallIcon}/>
            </View>
        </View>

        <View style={styles.paymentRow}>
          <Image source={require("./assets/Group.png")} style={styles.paymentIcon1} />
          <Image source={require("./assets/Group 33671.png")} style={styles.paymentIcon2}/>
        </View>

        <Image source={require("./assets/Group 33667.png")} style={styles.summary} />

        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================= PROFILE SCREEN ================= */

function ProfileScreen() {
  return (
    <ScrollView style={{flex:1, backgroundColor:"#fff"}}>
    <View style={styles.center}>
      <View style={styles.profileHeader}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      <Image
        source={require("./assets/Group 33672.png")}
        style={styles.profileAvatar}
      />

      <Text style={styles.name}>Rakibul Hasan</Text>
      <Text>rakibbrand@gmail.com</Text>

      <View style={styles.menu}>
        <View style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Feather name="home" size={20} color="black" />
            <Text style={styles.menuText}>Home</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </View>

        <View style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Feather name="credit-card" size={20} color="black" />
            <Text style={styles.menuText}>My Card</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </View>

        <View style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Feather name="moon" size={20} color="black" />
            <Text style={styles.menuText}>Dark Mode</Text>
          </View>
          <MaterialCommunityIcons name="toggle-switch-off" size={35} color="#333" />
        </View>

        <View style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Feather name="map-pin" size={20} color="black" />
            <Text style={styles.menuText}>Track Your Order</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </View>

        <View style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Feather name="settings" size={20} color="black" />
            <Text style={styles.menuText}>Settings</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </View>

        <View style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Feather name="help-circle" size={20} color="black" />
            <Text style={styles.menuText}>Help Center</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666" />
        </View>
      </View>

      <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Log out</Text>
        </TouchableOpacity>

    </View>
    </ScrollView>
  );
}

/* ================= APP ================= */

function AppNavigator() {
  const { user } = useContext(AuthContext);

  if (!user) return <LoginScreen />;
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#5B4CF0",
          tabBarIcon: ({ color, size }) => {
            let icon;

            if (route.name === "Home") icon = "home-outline";
            if (route.name === "Cart") icon = "cart-outline";
            if (route.name === "Profile") icon = "person-outline";

            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,},

  locationTitle: {color: "gray",},

  location: { fontSize: 18, fontWeight: "bold",},

  search: { backgroundColor: "#eee", borderRadius: 20, padding: 12, marginTop: 15,},

  banner: {backgroundColor: "#222",borderRadius: 15,padding: 20,marginTop: 20,},

  bannerTitle: {color: "yellow",fontSize: 22,fontWeight: "bold",},

  bannerSub: {color: "white",},

  section: {fontSize: 18,fontWeight: "bold", marginTop: 20,},

  row: {flexDirection: "row",justifyContent: "space-between",marginTop: 15, },

  card: {width: "45%",backgroundColor: "white",borderRadius: 10, padding: 10,alignItems: "center" },

  foodImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  cartImg: {
    width: 150,
    height: 150,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  price: {
    fontSize: 18,
    marginTop: 10,
  },

  total: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#5B4CF0",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },

avatar:{
  width:45,
  height:45,
  borderRadius:50
},

profileAvatar:{
  width:120,
  height:120,
  borderRadius:60
},

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  menu: {
    marginTop: 30,
    width: "100%",
  },

  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  header:{
  backgroundColor:"#f0eec6",
  padding:20,
  borderBottomLeftRadius:30,
  borderBottomRightRadius:30
},

headerTop:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between"
},



searchBox:{
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#5B4CF0",
  marginTop:20,
  padding:10,
  borderRadius:30
},

searchInput:{
  flex:1,
  marginHorizontal:10,
  color:"white"
},

categoryRow:{
  flexDirection:"row",
  justifyContent:"space-around",
  marginTop:20
},

categoryItem:{
  backgroundColor:"#eee",
  padding:15,
  borderRadius:10,
  alignItems:"center"
},

bannerCard:{
  width:"100%",
  marginTop:20
},

bannerImg:{
  width:"100%",
  height:160,
  resizeMode:"cover",
  borderRadius:15
},


popularHeader:{
  flexDirection:"row",
  justifyContent:"space-between",
  paddingHorizontal:20
},

popularTitle:{
  fontSize:18,
  fontWeight:"bold"
},

popularRow:{
  flexDirection:"row",
  flexWrap: "wrap",
  justifyContent:"space-between",
  paddingHorizontal:20,
  marginTop: 20,
},

foodCard:{
  width: "47%",          
  borderRadius: 10,
  marginBottom: 15,      
  alignItems: "center",
  backgroundColor: "#fff",
  padding: 10,
},

foodImg:{
  width:"100%",
  height:120,
  borderRadius:10
},
foodText:{
  fontWeight:"bold",
  fontSize:16,
  marginTop:5
},

cartContainer:{
flex:1,
backgroundColor:"#F5F5F5"
},

cartHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
padding:20
},

cartTitle:{
fontSize:18,
fontWeight:"bold"
},

icon:{
width:24,
height:24
},

mainImageBox:{
  position:"relative",
  alignItems:"center"
},

mainBurger:{
  width:"90%",
  height:220,
  borderRadius:20
},

discount:{
  position:"absolute",
  top:20,
  left:40,
  width:70,
  height:70,
  resizeMode:"contain"
},

smallBurgerRow:{position:"absolute",bottom:-40,width:"70%",height:90,resizeMode:"contain"},

infoCard:{backgroundColor:"white",marginTop:40,borderTopLeftRadius:30,borderTopRightRadius:30,padding:20},

rowBetween:{flexDirection:"row",justifyContent:"space-between"},

foodName:{fontSize:24,fontWeight:"bold"},

price:{fontSize:22,color:"#5B4CF0",fontWeight:"bold"},

rating:{marginTop:5},

quantityRow:{flexDirection:"row",justifyContent:"space-between",marginTop:5},

qtyIcon:{width:80,height:30,resizeMode:"contain"},

addressBox:{flexDirection:"row",alignItems:"center",marginTop:15,justifyContent:"space-between"},

address:{width:360,height:60,resizeMode:"stretch"},

purpleBox:{backgroundColor:"#8481c1", padding:8,borderRadius:10},

smallIcon:{width:40,  height:40,resizeMode:"contain"},

paymentRow:{flexDirection:"row",   alignItems:"center",gap:5, marginTop:15,},

paymentIcon1:{ width:120,height:60, resizeMode:"contain"},

paymentIcon2:{ width:320, height:60,resizeMode:"contain"},

summary:{width:"100%",height:130,resizeMode:"stretch",marginTop:15},

confirmBtn:{width:"100%",height:55,backgroundColor:"#6C63FF",
  borderRadius:30,justifyContent:"center",alignItems:"center",marginTop:20},

confirmText:{color:"white",fontSize:18,fontWeight:"bold"},

profileAvatar:{width:120,height:120,borderRadius:60,marginTop:10},

profileHeader:{flexDirection:"row",alignItems:"center",padding:20,width:"100%" },

profileTitle:{position:"absolute",left:0,right:0,textAlign:"center",fontSize:18,fontWeight:"bold"},

menu:{ marginTop:30,width:"100%"},

menuRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingVertical:12,borderBottomWidth:1,borderColor:"#eee"},

menuLeft:{flexDirection:"row",alignItems:"center"},

menuText:{marginLeft:15,fontSize:16}

});