import React from 'react';
import {
  View, Text, StyleSheet, Image, TextInput,
  ScrollView, FlatList, TouchableOpacity,
  SafeAreaView, Dimensions
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// ================= DATA =================
const EXCLUSIVE_PRODUCTS = [
  { id: '1', name: 'Organic Bananas', unit: '7pcs, Priceg', price: 4.99 , image: require("./assets/chuoi.png") },
  { id: '2', name: 'Red Apple', unit: '1kg, Priceg', price: 4.99, image: require("./assets/Vector.png") },
];


const BESTSELLING_PRODUCTS = [
  { id: '3', name: 'Bell Pepper Red', unit: '1kg, Priceg', price: 4.99 , image:require("./assets/ot.png")},
  { id: '4', name: 'Ginger', unit: '250g, Priceg', price: 4.99, image: require("./assets/gung.png" )},
];

const CATEGORIES = [
  { id: '1', image: require("./assets/beef bone 1.png"), bg: '#EEF8F2', border: '#53B175' },
  { id: '2', image: require("./assets/beef bone.png"), bg: '#FFF6EE', border: '#F8A44C' },
  { id: '3', image: require("./assets/beef bone 2.png"), bg: '#FDE1E1', border: '#F7A593' },
  { id: '4', image: require("./assets/beef bone 3.png"), bg: '#F4EBF7', border: '#D3B0E0' },
];

const BEVERAGES_PRODUCTS = [
  { id: '101', name: 'Diet Coke', unit: '355ml, Price', price: 1.99, image: require("./assets/anh1.png") },
  { id: '102', name: 'Sprite Can', unit: '325ml, Price', price: 1.50, image: require("./assets/anh2.png") },
  { id: '103', name: 'Apple & Grape Juice', unit: '2L, Price', price: 15.99, image: require("./assets/anh3.png") },
  { id: '104', name: 'Orenge Juice', unit: '2L, Price', price: 15.99, image: require("./assets/anh4.png") },
  { id: '105', name: 'Coca Cola Can', unit: '325ml, Price', price: 4.99, image: require("./assets/anh5.png") },
  { id: '106', name: 'Pepsi Can', unit: '330ml, Price', price: 4.99, image: require("./assets/anh6.png") },
];


// ================= COMPONENT =================
const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
      source={item.image } 
      style={styles.cardImg}
      resizeMode="contain" 
    />

    <Text style={styles.cardName}>{item.name}</Text>
    <Text style={styles.cardUnit}>{item.unit}</Text>

    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>${item.price}</Text>

      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add" size={22} color="white" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);


// ================= SCREENS =================

// HOME
const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("./assets/Group.png")}
          style={styles.logo}
        />
        <Image
          source={require("./assets/Group 6809.png")}
          style={styles.logo1}
        />
      </View>

      {/* ===== SEARCH ===== */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#181B19" />
        <TextInput
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Image
          source={require("./assets/banner.png")}
          style={styles.banner1}
        />
      </View>
       

      {/* PRODUCT LIST */}
      <Section
        title="Exclusive Offer"
        data={EXCLUSIVE_PRODUCTS}
        navigation={navigation}
      />

      <Section
        title="Best Selling"
        data={BESTSELLING_PRODUCTS}
        navigation={navigation}
      />

    </ScrollView>
  </SafeAreaView>
);


// COMPONENT SECTION (tái sử dụng)
const Section = ({ title, data, navigation }) => (
  <>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.seeAll}>See all</Text>
    </View>

    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          onPress={() => navigation.navigate('ProductDetail',{product:item})}
        />
      )}
    />
  </>
);


// EXPLORE
const ExploreScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    
    <Text style={styles.pageTitle}>Find Products</Text>

    <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#181B19" />
        <TextInput
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

    {/* CATEGORY GRID */}
    <FlatList
  data={CATEGORIES}
  numColumns={2}
  keyExtractor={(item) => item.id}
  contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.catCard1,
        { backgroundColor: item.bg, borderColor: item.border }
      ]}
      onPress={() => { if (item.id === '3') { navigation.navigate('Beverages');}}}
    >
      <Image
        source={item.image}
        style={styles.catImg1}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )}
/>

  </SafeAreaView>
);


// BEVERAGES
const BeveragesScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerBeverage}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Beverages</Text>
      <TouchableOpacity>
        <Ionicons name="options-outline" size={24} />
      </TouchableOpacity>
    </View>

    <FlatList
      data={BEVERAGES_PRODUCTS}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
        />
      )}
    />
  </SafeAreaView>
);


// PRODUCT DETAIL
const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = React.useState(1);

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER BACK */}
      <View style={styles.HeaderBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} />
        </TouchableOpacity>
        <Ionicons name="share-outline" size={24} />
      </View>

      <ScrollView>

        {/* IMAGE */}
        <View style={styles.detailImgContainer}>
          <Image
            source={product.image}
            style={styles.detailBigImg}
            resizeMode="contain"
          />
        </View>

        {/* CONTENT */}
        <View style={styles.detailContent}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.detailName}>{product.name}</Text>
            <Ionicons name="heart-outline" size={28} color="#7C7C7C" />
          </View>

          <Text style={styles.cardUnit}>{product.unit}, Price</Text>

          {/* QUANTITY + PRICE */}
          <View style={styles.qtyRow}>
            <View style={styles.qtyControl}>
              <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Ionicons name="remove" size={28} color="#B3B3B3" />
              </TouchableOpacity>

              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{quantity}</Text>
              </View>

              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="add" size={28} color="#53B175" />
              </TouchableOpacity>
            </View>

            <Text style={styles.detailPrice}>
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitleSmall}>Product Detail</Text>
          <Text style={styles.descText}>
            {product.name} are nutritious and good for health.
          </Text>

          <TouchableOpacity style={styles.mainBtn}>
            <Text style={styles.mainBtnText}>Add To Basket</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


// HEADER BACK (tái sử dụng)
const HeaderBack = ({ navigation, title }) => (
  <View style={styles.HeaderBack}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={26} />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>{title}</Text>

    <View style={{ width: 26 }} />
  </View>
);


// ================= NAVIGATION =================
const Tabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Shop" component={HomeScreen} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Cart" component={View} />
    <Tab.Screen name="Favourite" component={View} />
    <Tab.Screen name="Account" component={View} />

  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen name="Beverages" component={BeveragesScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// ================= STYLES =================
const styles = StyleSheet.create({

container: { flex: 1, backgroundColor: '#fff' },
  
header: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
},

logo: {
  width: 30,
  height: 35,
  marginBottom: 8,  
},

logo1: {
  width: 120,  
  height: 30,
  resizeMode: 'contain',
},

homeHeader: { padding: 15 },
locationText: { fontSize: 16, fontWeight: 'bold' },

searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F2',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
    width: '90%',
},

banner1: {
    height: 120,
    margin: 15,
    width: '90%',
    alignSelf: 'center',
},

sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15
},

sectionTitle: { fontSize: 20, fontWeight: 'bold' },
seeAll: { color: '#53B175' },

card: {
    width: width * 0.42,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 10,
    margin: 10
  },

  cardImg: { width: '100%', height: 100, alignSelf: 'center' },
  cardName: { fontWeight: 'bold', marginTop: 5 },
  cardUnit: { color: '#888' },
  cardPrice:{fontWeight: 'bold'},

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  addBtn: {
    backgroundColor: '#53B175',
    borderRadius: 10,
    padding: 5
  },

  pageTitle: { textAlign: 'center', fontSize: 22, marginTop: 10 },

  searchBar: {
    backgroundColor: '#F2F3F2',
    margin: 15,
    padding: 10,
    borderRadius: 10
  },

  catCard: {
    flex: 1,
    height: 120,
    margin: 8,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  catName: { fontWeight: 'bold', textAlign: 'center' },

  HeaderBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center'
  },

  headerTitle: { fontSize: 18, fontWeight: 'bold' },

  detailContent: { padding: 20 },

  detailName: { fontSize: 22, fontWeight: 'bold' },
  detailPrice: { fontSize: 20, marginVertical: 10 },

  descText: { color: '#777' },

  mainBtn: {
    backgroundColor: '#53B175',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center'
  },

  mainBtnText: { color: 'white', fontWeight: 'bold' },
  detailImgContainer: {
  backgroundColor: '#F2F3F2',
  height: 250,
  justifyContent: 'center',
  alignItems: 'center',
},

detailBigImg: {
  width: 200,
  height: 200,
},

qtyRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 20,
},

qtyControl: {
  flexDirection: 'row',
  alignItems: 'center',
},

qtyBox: {
  borderWidth: 1,
  borderColor: '#E2E2E2',
  borderRadius: 10,
  paddingHorizontal: 15,
  paddingVertical: 8,
  marginHorizontal: 10,
},

qtyText: {
  fontSize: 18,
},

divider: {
  height: 1,
  backgroundColor: '#E2E2E2',
  marginVertical: 20,
},

sectionTitleSmall: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 5,
},

catCard1: {
  flex: 1,
  height: 180,
  margin: 8,
  borderRadius: 18,
  borderWidth: 1.5,
  justifyContent: 'center',
  alignItems: 'center',
},

catImg1: {
  width: '70%',
  height: '70%',
},
headerBeverage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725'
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#181725'
  },
});