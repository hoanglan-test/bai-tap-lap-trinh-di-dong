import React, { useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, FlatList, 
  ScrollView, StyleSheet, Dimensions, TextInput 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';

// Import data
import coffeeData from './data.json';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- MÀN HÌNH ONBOARDING ---
const OnboardingScreen = ({ navigation }) => (
  <View style={styles.containerBlack}>
    <Image 
      source={require("./assets/Image Onboarding.png")} 
      style={styles.onboardingImage} 
    />
    <View style={styles.onboardingContent}>
      <Text style={styles.titleOnboarding}>Fall in Love with Coffee in Blissful Delight!</Text>
      <Text style={styles.subtitleOnboarding}>Welcome to our cozy coffee corner, where every cup is a delightful for you.</Text>
      <TouchableOpacity 
        style={styles.btnPrimary} 
        onPress={() => navigation.replace('MainApp')}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- MÀN HÌNH HOME ---
const HomeScreen = ({ navigation }) => {
  const categories = ['All Coffee', 'Machiato', 'Latte', 'Americano'];
  const [activeCat, setActiveCat] = useState('All Coffee');

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detail', { product: item })}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FBBE21" />
          <Text style={styles.ratingTextCard}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.type}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>$ {item.price}</Text>
          <TouchableOpacity style={styles.btnAdd}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.darkHeader}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <Text style={styles.locationText}>Bilzen, Tanjungbalai ▾</Text>
          </View>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="white" />
              <TextInput 
                placeholder="Search coffee" 
                placeholderTextColor="#989898" 
                style={styles.searchInput} 
              />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <Feather name="sliders" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.promoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.promoBg}
          />
          <View style={styles.promoOverlay}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>Promo</Text>
            </View>
            <Text style={styles.promoTitle}>Buy one get{"\n"}one FREE</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCat(cat)}
              style={[styles.catItem, activeCat === cat && styles.catItemActive]}
            >
              <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.gridContainer}>
          <FlatList
            data={coffeeData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

// --- MÀN HÌNH DETAIL ---
const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <ScrollView style={styles.containerWhite}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
        <Ionicons name="heart-outline" size={24} color="black" />
      </View>

      <Image source={{ uri: product.image }} style={styles.detailImage} />
      
      <View style={styles.detailInfo}>
        {/* Tên và Icon tiện ích */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.detailName}>{product.name}</Text>
            <Text style={styles.detailType}>Ice/Hot</Text>
          </View>
          
          <View style={styles.iconRow}>
            {/* Mỗi icon nằm trong một box xám nhẹ giống Figma */}
            <View style={styles.iconBox}><Ionicons name="bicycle" size={22} color="#C67C4E" /></View>
            <View style={styles.iconBox}><Ionicons name="cafe" size={22} color="#C67C4E" /></View>
            <View style={styles.iconBox}><Ionicons name="leaf" size={22} color="#C67C4E" /></View>
          </View>
        </View>

        {/* Dòng Rating: Ngôi sao to hơn và số review màu xám */}
        <View style={styles.ratingRowDetail}>
          <Ionicons name="star" size={24} color="#FBBE21" />
          <Text style={styles.ratingValue}>{product.rating} </Text>
          <Text style={styles.reviewCount}>({product.reviews})</Text>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descText}>
          {product.description} <Text style={styles.readMore}>Read More</Text>
        </Text>
        
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Size</Text>
        <View style={styles.sizeRow}>
          {['S', 'M', 'L'].map(size => (
            <TouchableOpacity 
              key={size} 
              onPress={() => setSelectedSize(size)}
              style={[styles.sizeBox, selectedSize === size && styles.sizeBoxActive]}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer chứa giá và nút bấm */}
      <View style={styles.footerBuy}>
        <View>
          <Text style={styles.footerLabel}>Price</Text>
          <Text style={styles.footerPrice}>$ {product.price}</Text>
        </View>
        <TouchableOpacity style={styles.btnBuy}>
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const MainApp = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#C67C4E' }}>
    <Tab.Screen 
      name="Home" component={HomeScreen} 
      options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }}
    />
    <Tab.Screen 
      name="Favorite" component={HomeScreen} 
      options={{ tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> }}
    />
    <Tab.Screen 
      name="Cart" component={HomeScreen} 
      options={{ tabBarIcon: ({ color }) => <Ionicons name="bag" size={24} color={color} /> }}
    />
    <Tab.Screen 
      name="Profile" component={HomeScreen} 
      options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }}
    />
  </Tab.Navigator>
);

// --- APP NAVIGATION ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLES (ĐÃ TỐI ƯU) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  btnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  containerBlack: { flex: 1, backgroundColor: 'black' },
  onboardingImage: { width: '100%', height: '65%', resizeMode: 'cover' },
  onboardingContent: { paddingHorizontal: 30, paddingBottom: 40, alignItems: 'center', marginTop: -80 },
  titleOnboarding: { color: 'white', fontSize: 34, fontWeight: 'bold', textAlign: 'center', lineHeight: 45 },
  subtitleOnboarding: { color: '#A9A9A9', textAlign: 'center', marginTop: 15, marginBottom: 30, fontSize: 14 },
  btnPrimary: { backgroundColor: '#C67C4E', padding: 18, borderRadius: 16, width: '100%', alignItems: 'center' },
  darkHeader: { backgroundColor: '#131313', height: 260, paddingHorizontal: 25, paddingTop: 50 },
  locationLabel: { color: '#B7B7B7', fontSize: 12 },
  locationText: { color: 'white', fontWeight: 'bold', fontSize: 14, marginTop: 4 },
  searchRow: { flexDirection: 'row', marginTop: 25, alignItems: 'center' },
  searchBar: { flex: 1, backgroundColor: '#313131', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 15, height: 52 },
  searchInput: { color: 'white', flex: 1, marginLeft: 10 },
  filterBtn: { backgroundColor: '#C67C4E', width: 52, height: 52, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  promoContainer: { marginHorizontal: 25, height: 140, borderRadius: 20, marginTop: -70, overflow: 'hidden', backgroundColor: '#A3785E' },
  promoBg: { width: '100%', height: '100%', opacity: 0.9 },
  promoOverlay: { position: 'absolute', padding: 20 },
  promoTag: { backgroundColor: '#ED5151', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  promoTagText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  promoTitle: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 8 },
  catScroll: { marginVertical: 20, paddingLeft: 25 },
  catItem: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, marginRight: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#EDEDED' },
  catItemActive: { backgroundColor: '#C67C4E', borderColor: '#C67C4E' },
  catText: { color: '#2F2D2C', fontSize: 14 },
  catTextActive: { color: 'white', fontWeight: 'bold' },
  gridContainer: { paddingHorizontal: 15 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 8, margin: 8, width: (width - 60) / 2, elevation: 2 },
  cardImage: { width: '100%', height: 120, borderRadius: 12 },
  ratingBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderTopRightRadius: 12, borderBottomLeftRadius: 12 },
  ratingTextCard: { color: 'white', fontSize: 10, marginLeft: 3, fontWeight: 'bold' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#2F2D2C' },
  cardSubtitle: { color: '#9B9B9B', fontSize: 12, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#2F4B4E' },
  btnAdd: { backgroundColor: '#C67C4E', padding: 8, borderRadius: 10 },
  containerWhite: { flex: 1, backgroundColor: 'white' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#2F2D2C' },
  detailImage: { width: width - 50, height: 230, borderRadius: 16, marginHorizontal: 25 },
  detailInfo: { padding: 25 },
  detailName: { fontSize: 24, fontWeight: 'bold', color: '#2F2D2C' },
  detailType: { color: '#9B9B9B', fontSize: 12, marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  ratingText: { marginLeft: 5, fontWeight: 'bold', color: '#2F2D2C' },
  divider: { height: 1, backgroundColor: '#EAEAEA', marginVertical: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2F2D2C', marginBottom: 10 },
  descText: { color: '#9B9B9B', lineHeight: 22, fontSize: 14 },
  readMore: { color: '#C67C4E', fontWeight: 'bold' },
  sizeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  sizeBox: { width: (width - 80) / 3, padding: 12, borderWidth: 1, borderColor: '#EDEDED', borderRadius: 12, alignItems: 'center' },
  sizeBoxActive: { borderColor: '#C67C4E', backgroundColor: '#FFF5EE' },
  sizeText: { color: '#2F2D2C', fontSize: 14 },
  sizeTextActive: { color: '#C67C4E', fontWeight: 'bold' },
  footerBuy: { flexDirection: 'row', justifyContent: 'space-between', padding: 25, borderTopWidth: 1, borderTopColor: '#F1F1F1', alignItems: 'center' },
  footerLabel: { color: '#9B9B9B', fontSize: 12 },
  footerPrice: { fontSize: 20, fontWeight: 'bold', color: '#C67C4E' },
  btnBuy: { backgroundColor: '#C67C4E', paddingHorizontal: 45, paddingVertical: 18, borderRadius: 16 },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  detailName: { 
    fontSize: 28, // Chữ to hơn
    fontWeight: 'bold', 
    color: '#2F2D2C' 
  },
  iconRow: { 
    flexDirection: 'row', 
    gap: 12 
  },
  iconBox: { 
    backgroundColor: '#F9F9F9', // Màu nền xám nhạt cho icon
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingRowDetail: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15 
  },
  ratingValue: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#2F2D2C', 
    marginLeft: 8 
  },
  reviewCount: { 
    fontSize: 14, 
    color: '#9B9B9B' 
  },
  btnBuy: { 
    backgroundColor: '#C67C4E', 
    paddingHorizontal: 60, 
    paddingVertical: 18, 
    borderRadius: 20, // Bo góc tròn hơn giống Figma
  },
  footerBuy: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 25, 
    borderTopWidth: 1, 
    borderColor: '#F1F1F1' 
  },
});