// import React, { useState } from 'react';
// import {
//   View, Text, StyleSheet, Image, TextInput,
//   ScrollView, FlatList, TouchableOpacity,
//   SafeAreaView, Dimensions, Modal
// } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Ionicons } from '@expo/vector-icons';

// // Import dữ liệu từ data.js (Đảm bảo có đủ ID từ 1-14)
// import products from "./data"; 

// const { width } = Dimensions.get('window');
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // ================= COMPONENT DÙNG CHUNG =================
// const ProductCard = ({ item, onPress }) => (
//   <TouchableOpacity style={styles.card} onPress={onPress}>
//     <Image source={item.image} style={styles.cardImg} resizeMode="contain" />
//     <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
//     <Text style={styles.cardUnit}>{item.unit || item.description}</Text>
//     <View style={styles.cardFooter}>
//       <Text style={styles.cardPrice}>${item.price}</Text>
//       <TouchableOpacity style={styles.addBtn}>
//         <Ionicons name="add" size={22} color="white" />
//       </TouchableOpacity>
//     </View>
//   </TouchableOpacity>
// );

// const FilterItem = ({ label, isSelected, onPress }) => (
//   <TouchableOpacity style={styles.filterRow} onPress={onPress} activeOpacity={0.7}>
//     <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
//       {isSelected && <Text style={styles.checkMark}>✓</Text>}
//     </View>
//     <Text style={[styles.filterLabel, isSelected && styles.textGreen]}>{label}</Text>
//   </TouchableOpacity>
// );

// // ================= SCREENS =================

// // 1. HOME SCREEN
// const HomeScreen = ({ navigation }) => (
//   <SafeAreaView style={styles.container}>
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <View style={styles.headerHome}>
//         <Image source={require("./assets/Group.png")} style={styles.logo} />
//         <Image source={require("./assets/Group 6809.png")} style={styles.logo1} />
//       </View>
//       <View style={styles.searchBox}>
//         <Ionicons name="search" size={18} color="#181B19" />
//         <TextInput placeholder="Search Store" style={styles.searchInput} editable={false} />
//       </View>
//       <Image source={require("./assets/banner.png")} style={styles.bannerImg} />
      
//       <Section title="Exclusive Offer" data={products.slice(0, 4)} navigation={navigation} />
//       <Section title="Best Selling" data={products.slice(4, 8)} navigation={navigation} />
//     </ScrollView>
//   </SafeAreaView>
// );

// const Section = ({ title, data, navigation }) => (
//   <View style={{ marginBottom: 10 }}>
//     <View style={styles.sectionHeader}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       <Text style={styles.seeAll}>See all</Text>
//     </View>
//     <FlatList
//       horizontal
//       data={data}
//       showsHorizontalScrollIndicator={false}
//       keyExtractor={(item) => "home-" + item.id}
//       renderItem={({ item }) => (
//         <ProductCard item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
//       )}
//     />
//   </View>
// );

// // 2. EXPLORE SCREEN (TÍCH HỢP SEARCH HOẠT ĐỘNG)
// const ExploreScreen = ({ navigation }) => {
//   const [search, setSearch] = useState("");
//   const [filteredList, setFilteredList] = useState(products);

//   const handleSearch = (text) => {
//     setSearch(text);
//     const filtered = products.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
//     setFilteredList(filtered);
//   };

//   const CATEGORIES = [
//     { id: '1', image: require("./assets/beef bone 1.png"), bg: '#EEF8F2', border: '#53B175' },
//     { id: '2', image: require("./assets/beef bone.png"), bg: '#FFF6EE', border: '#F8A44C' },
//     { id: '3', image: require("./assets/beef bone 2.png"), bg: '#FDE1E1', border: '#F7A593' },
//     { id: '4', image: require("./assets/beef bone 3.png"), bg: '#F4EBF7', border: '#D3B0E0' },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.pageTitle}>Find Products</Text>
//       <View style={styles.searchBox}>
//         <Ionicons name="search" size={18} color="#181B19" />
//         <TextInput 
//           placeholder="Search Store" 
//           style={styles.searchInput} 
//           value={search}
//           onChangeText={handleSearch}
//         />
//       </View>
      
//       {search === "" ? (
//         <FlatList
//           data={CATEGORIES}
//           numColumns={2}
//           keyExtractor={(item) => "cat-" + item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity 
//               style={[styles.catCard1, { backgroundColor: item.bg, borderColor: item.border }]}
//               onPress={() => navigation.navigate('Beverages')}
//             >
//               <Image source={item.image} style={styles.catImg1} resizeMode="contain" />
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <FlatList
//           data={filteredList}
//           numColumns={2}
//           keyExtractor={(item) => "search-" + item.id}
//           renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// // 3. BEVERAGES SCREEN (TÍCH HỢP MODAL FILTER)
// const BeveragesScreen = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedCat, setSelectedCat] = useState("Eggs");

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerBeverage}>
//         <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={28} /></TouchableOpacity>
//         <Text style={styles.headerTitle}>Beverages</Text>
//         <TouchableOpacity onPress={() => setModalVisible(true)}><Ionicons name="options-outline" size={24} /></TouchableOpacity>
//       </View>

//       <FlatList
//         data={products.filter(p => p.id >= 11 && p.id <= 14)}
//         numColumns={2}
//         keyExtractor={(item) => "bev-" + item.id}
//         renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />}
//       />

//       <Modal visible={modalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} /></TouchableOpacity>
//               <Text style={styles.modalTitle}>Filters</Text>
//               <View style={{ width: 28 }} />
//             </View>
//             <Text style={styles.sectionTitleModal}>Categories</Text>
//             <FilterItem label="Eggs" isSelected={selectedCat === "Eggs"} onPress={() => setSelectedCat("Eggs")} />
//             <FilterItem label="Noodles & Pasta" isSelected={selectedCat === "Noodles"} onPress={() => setSelectedCat("Noodles")} />
//             <TouchableOpacity style={styles.applyBtn} onPress={() => setModalVisible(false)}>
//                <Text style={styles.mainBtnText}>Apply Filter</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // 4. CART SCREEN (KHÔNG BỊ THỤT NÚT)
// const CartScreen = () => (
//   <SafeAreaView style={styles.container}>
//     <Text style={styles.pageTitle}>My Cart</Text>
//     <View style={{ flex: 1 }}>
//         <FlatList
//           data={products.filter(p => p.id >= 7 && p.id <= 10)}
//           keyExtractor={(item) => "cart-" + item.id}
//           renderItem={({ item }) => (
//             <View style={styles.horizontalItem}>
//               <Image source={item.image} style={styles.horizontalImg} />
//               <View style={{ flex: 1, marginLeft: 15 }}>
//                 <View style={styles.headerRow}><Text style={styles.cardName}>{item.name}</Text><Text style={{color:'#B3B3B3'}}>✕</Text></View>
//                 <Text style={styles.cardUnit}>{item.description}</Text>
//                 <View style={styles.qtyRowItem}>
//                     <Text style={styles.qtyAction}>—</Text><Text style={{marginHorizontal:10}}>1</Text><Text style={[styles.qtyAction, {color:'#53B175'}]}>+</Text>
//                     <Text style={[styles.cardPrice, {marginLeft:'auto'}]}>${item.price}</Text>
//                 </View>
//               </View>
//             </View>
//           )}
//         />
//     </View>
//     <TouchableOpacity style={styles.checkoutBtn}>
//       <Text style={styles.mainBtnText}>Go to Checkout</Text>
//       <View style={styles.priceBadge}><Text style={styles.priceBadgeText}>$25.96</Text></View>
//     </TouchableOpacity>
//   </SafeAreaView>
// );

// // 5. FAVOURITE SCREEN
// const FavouriteScreen = () => (
//   <SafeAreaView style={styles.container}>
//     <Text style={styles.pageTitle}>Favourite</Text>
//     <View style={{ flex: 1 }}>
//         <FlatList
//           data={products.filter(p => p.id >= 11 && p.id <= 14)}
//           keyExtractor={(item) => "fav-" + item.id}
//           renderItem={({ item }) => (
//             <View style={styles.horizontalItem}>
//               <Image source={item.image} style={styles.horizontalImg} />
//               <View style={{flex:1, marginLeft:15}}>
//                   <Text style={styles.cardName}>{item.name}</Text>
//                   <Text style={styles.cardUnit}>{item.description}</Text>
//               </View>
//               <Text style={styles.cardPrice}>${item.price}</Text>
//               <Ionicons name="chevron-forward" size={18} style={{marginLeft:10}} />
//             </View>
//           )}
//         />
//     </View>
//     <TouchableOpacity style={styles.checkoutBtn}><Text style={styles.mainBtnText}>Add All To Cart</Text></TouchableOpacity>
//   </SafeAreaView>
// );

// // 6. PRODUCT DETAIL
// const ProductDetailScreen = ({ route, navigation }) => {
//   const { product } = route.params;
//   const [quantity, setQuantity] = useState(1);
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.HeaderBack}><TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={26} /></TouchableOpacity><Ionicons name="share-outline" size={24} /></View>
//       <ScrollView>
//         <View style={styles.detailImgContainer}><Image source={product.image} style={styles.detailBigImg} resizeMode="contain" /></View>
//         <View style={styles.detailContent}>
//           <Text style={styles.detailName}>{product.name}</Text>
//           <Text style={styles.cardUnit}>{product.unit || product.description}</Text>
//           <View style={styles.qtyRowItemDetail}>
//             <View style={{flexDirection:'row', alignItems:'center'}}>
//               <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}><Ionicons name="remove" size={28} color="#B3B3B3" /></TouchableOpacity>
//               <View style={styles.qtyBox}><Text style={styles.qtyText}>{quantity}</Text></View>
//               <TouchableOpacity onPress={() => setQuantity(quantity + 1)}><Ionicons name="add" size={28} color="#53B175" /></TouchableOpacity>
//             </View>
//             <Text style={styles.detailPrice}>${(product.price * quantity).toFixed(2)}</Text>
//           </View>
//           <TouchableOpacity style={[styles.applyBtn, {marginTop:30}]}><Text style={styles.mainBtnText}>Add To Basket</Text></TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // ================= NAVIGATION SETUP =================
// const Tabs = () => (
//   <Tab.Navigator screenOptions={({ route }) => ({
//     headerShown: false,
//     tabBarActiveTintColor: '#53B175',
//     tabBarInactiveTintColor: '#181725',
//     tabBarStyle: { height: 70, paddingBottom: 10 },
//     tabBarIcon: ({ color, size }) => {
//       let iconName;
//       if (route.name === 'Shop') iconName = 'storefront-outline';
//       else if (route.name === 'Explore') iconName = 'search-outline';
//       else if (route.name === 'Cart') iconName = 'cart-outline';
//       else if (route.name === 'Favourite') iconName = 'heart-outline';
//       else if (route.name === 'Account') iconName = 'person-outline';
//       return <Ionicons name={iconName} size={size} color={color} />;
//     },
//   })}>
//     <Tab.Screen name="Shop" component={HomeScreen} />
//     <Tab.Screen name="Explore" component={ExploreScreen} />
//     <Tab.Screen name="Cart" component={CartScreen} />
//     <Tab.Screen name="Favourite" component={FavouriteScreen} />
//     <Tab.Screen name="Account" component={View} />
//   </Tab.Navigator>
// );

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Main" component={Tabs} />
//         <Stack.Screen name="Beverages" component={BeveragesScreen} />
//         <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // ================= STYLES =================
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   headerHome: { alignItems: 'center', paddingVertical: 15 },
//   logo: { width: 30, height: 35 },
//   logo1: { width: 100, height: 25, resizeMode: 'contain' },
//   searchBox: { flexDirection: 'row', backgroundColor: '#F2F3F2', borderRadius: 12, padding: 12, marginVertical: 10, alignSelf: 'center', width: '90%', alignItems: 'center' },
//   searchInput: { marginLeft: 10, flex: 1, fontWeight: '600' },
//   bannerImg: { height: 115, width: '90%', alignSelf: 'center', borderRadius: 15, marginBottom: 15 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center', marginVertical: 10 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold' },
//   seeAll: { color: '#53B175', fontWeight: 'bold' },
//   card: { width: width * 0.44, borderWidth: 1, borderColor: '#F2F3F2', borderRadius: 15, padding: 15, margin: 8 },
//   cardImg: { width: '100%', height: 80 },
//   cardName: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
//   cardUnit: { color: '#7C7C7C', fontSize: 12 },
//   cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
//   cardPrice: { fontWeight: 'bold', fontSize: 18 },
//   addBtn: { backgroundColor: '#53B175', borderRadius: 12, padding: 8 },
//   pageTitle: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
//   catCard1: { flex: 1, height: 170, margin: 8, borderRadius: 18, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
//   catImg1: { width: '70%', height: '70%' },
//   headerBeverage: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
//   headerTitle: { fontSize: 20, fontWeight: 'bold' },
//   horizontalItem: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2', alignItems: 'center' },
//   horizontalImg: { width: 65, height: 65, resizeMode: 'contain' },
//   headerRow: {flexDirection:'row', justifyContent:'space-between'},
//   qtyRowItem: {flexDirection:'row', alignItems:'center', marginTop:15},
//   qtyAction: {borderWidth:1, borderColor:'#E2E2E2', width:35, height:35, borderRadius:12, textAlign:'center', lineHeight:33, fontSize:20},
//   checkoutBtn: { backgroundColor: '#53B175', marginHorizontal: 25, marginBottom: 90, paddingVertical: 20, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position:'relative'},
//   applyBtn: { backgroundColor: '#53B175', marginHorizontal: 20, paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
//   mainBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
//   priceBadge: { backgroundColor: '#489E67', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, position:'absolute', right:20 },
//   priceBadgeText: { color: '#fff', fontSize: 12 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContent: { backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: '80%' },
//   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   modalTitle: { fontSize: 20, fontWeight: 'bold' },
//   sectionTitleModal: { fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
//   filterRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
//   checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', marginRight: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
//   checkboxActive: { backgroundColor: '#53B175', borderColor: '#53B175' },
//   checkMark: { color: '#fff', fontWeight: 'bold' },
//   textGreen: { color: '#53B175' },
//   HeaderBack: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
//   detailImgContainer: { backgroundColor: '#F2F3F2', height: 280, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
//   detailBigImg: { width: '70%', height: '70%' },
//   detailContent: { padding: 25 },
//   detailName: { fontSize: 24, fontWeight: 'bold' },
//   detailPrice: { fontSize: 24, fontWeight: 'bold' },
//   qtyRowItemDetail: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
//   qtyBox: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 8, marginHorizontal: 15 },
//   qtyText: { fontSize: 18, fontWeight: 'bold' },
// });






// import React, { useState } from "react";
// import {
//   View, Text, TextInput, FlatList, Image,
//   TouchableOpacity, StyleSheet, SafeAreaView,
//   Dimensions, Modal
// } from "react-native";

// import products from "./data";

// const { width } = Dimensions.get("window");

// export default function App() {
//   // --- 1. STATES ---
//   const [search, setSearch] = useState("Egg");
//   const [list, setList] = useState(products.filter(p => p.name.toLowerCase().includes("egg")));
//   const [modalVisible, setModalVisible] = useState(false);
//   const [screen, setScreen] = useState("Explore");
  
//   // States cho Filter
//   const [category, setCategory] = useState("Eggs");
//   const [brand, setBrand] = useState("Cocola");

//   // --- 2. LOGIC FUNCTIONS ---
//   const handleSearch = (text) => {
//     setSearch(text);
//     const filtered = products.filter(p =>
//       p.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setList(filtered);
//   };

//   const applyFilter = () => {
//     const filtered = products.filter(
//       p => p.category === category && p.brand === brand
//     );
//     setList(filtered);
//     setModalVisible(false);
//   };

//   // --- 3. RENDER COMPONENTS ---

//   // Màn hình Explore: Card lưới 2 cột
//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.imgContainer}>
//         <Image source={item.image} style={styles.img} />
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.desc}>{item.description}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.price}>${item.price}</Text>
//         <TouchableOpacity style={styles.plusBtn}>
//           <Text style={styles.plusText}>+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Màn hình Cart: Hàng ngang có nút tăng giảm
//   const renderCartItem = ({ item }) => (
//     <View style={styles.horizontalItem}>
//       <Image source={item.image} style={styles.horizontalImg} />
//       <View style={styles.horizontalInfo}>
//         <View style={styles.headerRow}>
//            <Text style={styles.name}>{item.name}</Text>
//            <Text style={styles.closeIcon}>✕</Text>
//         </View>
//         <Text style={styles.desc}>{item.description}</Text>
//         <View style={styles.quantityRow}>
//           <View style={styles.qtyBox}>
//              <Text style={styles.qtyAction}>—</Text>
//              <Text style={styles.qtyNum}>1</Text>
//              <Text style={[styles.qtyAction, {color: '#53B175'}]}>+</Text>
//           </View>
//           <Text style={styles.price}>${item.price}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   // Màn hình Favourite: Hàng ngang có mũi tên
//   const renderFavItem = ({ item }) => (
//     <View style={styles.horizontalItem}>
//       <Image source={item.image} style={styles.horizontalImg} />
//       <View style={styles.horizontalInfo}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.desc}>{item.description}</Text>
//       </View>
//       <View style={styles.favRight}>
//          <Text style={styles.price}>${item.price}</Text>
//          <Text style={styles.arrow}>〉</Text>
//       </View>
//     </View>
//   );

//   // Component phụ cho Filter Item
//   const FilterItem = ({ label, isSelected, onPress }) => (
//     <TouchableOpacity style={styles.filterRow} onPress={onPress} activeOpacity={0.7}>
//       <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
//         {isSelected && <Text style={styles.checkMark}>✓</Text>}
//       </View>
//       <Text style={[styles.filterLabel, isSelected && styles.textGreen]}>{label}</Text>
//     </TouchableOpacity>
//   );

//   // --- 4. MAIN SCREEN ROUTER ---
//   const renderScreen = () => {
//     switch (screen) {
//       case "Explore":
//         return (
//           <View style={{flex:1}}>
//             <Text style={styles.screenTitle}>Find Products</Text>
//             <View style={styles.searchBox}>
//               <Text style={styles.searchIcon}>🔍</Text>
//               <TextInput placeholder="Search Store" value={search} onChangeText={handleSearch} style={styles.searchInput} />
//               <TouchableOpacity onPress={() => setModalVisible(true)}>
//                 <Image source={require("./assets/Group 6839.png")} style={styles.filterIconStyle} />
//               </TouchableOpacity>
//             </View>
//             <FlatList data={list} numColumns={2} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={{paddingBottom: 100}} />
//           </View>
//         );
//       case "Cart":
//         return (
//           <View style={{flex:1}}>
//             <Text style={styles.screenTitle}>My Cart</Text>
//             <View style={{flex:1}}>
//                 <FlatList data={products.filter(p => p.id >= 7 && p.id <= 10)} renderItem={renderCartItem} keyExtractor={(item) => "c"+item.id} />
//             </View>
//             <TouchableOpacity style={styles.checkoutBtn}>
//               <Text style={styles.mainBtnText}>Go to Checkout</Text>
//               <View style={styles.priceBadge}><Text style={styles.priceBadgeText}>$25.96</Text></View>
//             </TouchableOpacity>
//           </View>
//         );
//       case "Favourite":
//         return (
//           <View style={{flex:1}}>
//             <Text style={styles.screenTitle}>Favourite</Text>
//             <View style={{flex:1}}>
//                 <FlatList data={products.filter(p => p.id >= 11 && p.id <= 14)} renderItem={renderFavItem} keyExtractor={(item) => "f"+item.id} />
//             </View>
//             <TouchableOpacity style={styles.checkoutBtn}>
//               <Text style={styles.mainBtnText}>Add All To Cart</Text>
//             </TouchableOpacity>
//           </View>
//         );
//       default:
//         return <Text style={styles.screenTitle}>{screen}</Text>;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {renderScreen()}

//       {/* FILTER MODAL */}
//       <Modal visible={modalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeTouch}>
//                 <Text style={styles.closeIconHeader}>✕</Text>
//               </TouchableOpacity>
//               <Text style={styles.modalTitle}>Filters</Text>
//               <View style={{ width: 40 }} /> 
//             </View>

//             <View style={styles.filterBody}>
//               <Text style={styles.sectionTitle}>Categories</Text>
//               <FilterItem label="Eggs" isSelected={category === "Eggs"} onPress={() => setCategory("Eggs")} />
//               <FilterItem label="Noodles & Pasta" isSelected={category === "Noodles & Pasta"} onPress={() => setCategory("Noodles & Pasta")} />
//               <FilterItem label="Chips & Crisps" isSelected={category === "Chips & Crisps"} onPress={() => setCategory("Chips & Crisps")} />
//               <FilterItem label="Fast Food" isSelected={category === "Fast Food"} onPress={() => setCategory("Fast Food")} />

//               <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
//               <FilterItem label="Individual Collection" isSelected={brand === "Individual Collection"} onPress={() => setBrand("Individual Collection")} />
//               <FilterItem label="Cocola" isSelected={brand === "Cocola"} onPress={() => setBrand("Cocola")} />
//               <FilterItem label="Ifad" isSelected={brand === "Ifad"} onPress={() => setBrand("Ifad")} />
//               <FilterItem label="Kazi Farmas" isSelected={brand === "Kazi Farmas"} onPress={() => setBrand("Kazi Farmas")} />
//             </View>

//             <TouchableOpacity style={styles.mainBtn} onPress={applyFilter}>
//               <Text style={styles.mainBtnText}>Apply Filter</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* BOTTOM TAB */}
//       <View style={styles.tab}>
//         {["Shop", "Explore", "Cart", "Favourite", "Account"].map(t => (
//           <TouchableOpacity key={t} onPress={() => setScreen(t)} style={styles.tabItem}>
//             <Text style={{color: screen===t ? "#53B175":"#181725", fontSize: 20}}>{t === "Shop" ? "🏪" : t === "Explore" ? "🔍" : t === "Cart" ? "🛒" : t === "Favourite" ? "❤️" : "👤"}</Text>
//             <Text style={[styles.tabText, {color: screen===t ? "#53B175":"#181725"}]}>{t}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// }

// // --- 5. STYLESHEET ---
// const styles = StyleSheet.create({
//   container:{flex:1, backgroundColor: '#fff'},
//   screenTitle: {textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 15},
  
//   // Explore Styles
//   searchBox:{flexDirection:"row", alignItems: 'center', backgroundColor:"#F2F3F2", marginHorizontal:20, paddingHorizontal:15, borderRadius:15, height: 50, marginBottom: 15},
//   searchInput: {flex: 1, fontWeight: '600'},
//   filterIconStyle: {width: 20, height: 20, resizeMode: 'contain', marginLeft: 10},
//   card:{width:(width-60)/2, margin:10, padding:15, borderWidth:1, borderColor: '#E2E2E2', borderRadius:18},
//   imgContainer: {height: 80, justifyContent: 'center', alignItems: 'center'},
//   img:{width:"100%", height: "100%", resizeMode:"contain"},
//   infoContainer: {marginVertical: 10, height: 55},
//   name:{fontWeight:"bold", fontSize: 16, color: '#181725'},
//   desc:{color:"#7C7C7C", fontSize:12},
//   row:{flexDirection:"row", justifyContent:"space-between", alignItems: 'center'},
//   price:{fontWeight:"bold", fontSize: 18},
//   plusBtn:{backgroundColor:"#53B175", width: 40, height: 40, borderRadius:14, justifyContent: 'center', alignItems: 'center'},
//   plusText: {color: '#fff', fontSize: 22},

//   // Horizontal Items (Cart/Fav)
//   horizontalItem: {flexDirection: "row", padding: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', alignItems: 'center'},
//   horizontalImg: {width: 70, height: 70, resizeMode: 'contain'},
//   horizontalInfo: {flex: 1, marginLeft: 20},
//   headerRow: {flexDirection: 'row', justifyContent: 'space-between'},
//   closeIcon: {color: '#B3B3B3', fontSize: 18},
//   quantityRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15},
//   qtyBox: {flexDirection: 'row', alignItems: 'center'},
//   qtyAction: {borderWidth: 1, borderColor: '#E2E2E2', width: 35, height: 35, borderRadius: 12, textAlign: 'center', lineHeight: 33, fontSize: 20, color: '#B3B3B3'},
//   qtyNum: {marginHorizontal: 15, fontWeight: 'bold'},
//   favRight: {flexDirection: 'row', alignItems: 'center'},
//   arrow: {marginLeft: 10, fontSize: 18, color: '#181725'},

//   // Buttons
//   mainBtn: {backgroundColor: '#53B175', margin: 25, padding: 20, borderRadius: 18, alignItems: 'center', marginTop: 20},
//   checkoutBtn: {backgroundColor: '#53B175', marginHorizontal: 25, marginBottom: 110, paddingVertical: 20, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative'},
//   mainBtnText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
//   priceBadge: {backgroundColor: '#489E67', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, position: 'absolute', right: 20},
//   priceBadgeText: {color: '#fff', fontSize: 12, fontWeight: '600'},

//   // Tab
//   tab:{flexDirection:"row", justifyContent:"space-around", paddingVertical:10, borderTopWidth:1, borderTopColor: '#F2F3F2', backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%'},
//   tabItem: {alignItems: 'center'},
//   tabText: {fontSize: 10, marginTop: 4, fontWeight: '600'},

//   // Modal (Filter)
//   modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'},
//   modalContent: {backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 25, paddingTop: 15, paddingBottom: 25, height: '90%'},
//   modalHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingVertical: 10},
//   closeTouch: {padding: 5},
//   closeIconHeader: {fontSize: 22, color: '#181725'},
//   modalTitle: {fontSize: 20, fontWeight: 'bold', color: '#181725'},
//   filterBody: {flex: 1},
//   sectionTitle: {fontSize: 24, fontWeight: '600', color: '#181725', marginBottom: 15},
//   filterRow: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
//   checkbox: {width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', marginRight: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'},
//   checkboxActive: {backgroundColor: '#53B175', borderColor: '#53B175'},
//   checkMark: {color: '#fff', fontWeight: 'bold'},
//   filterLabel: {fontSize: 16, color: '#181725'},
//   textGreen: {color: '#53B175'}
// });

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TextInput,
  ScrollView, FlatList, TouchableOpacity,
  SafeAreaView, Dimensions, Modal
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// DỮ LIỆU TỪ DATA.JS
import products from "./data"; 

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ================= DATA BÀI TRƯỚC (GIỮ NGUYÊN) =================
const EXCLUSIVE_PRODUCTS = [
  { id: '1', name: 'Organic Bananas', unit: '7pcs, Priceg', price: 4.99, image: require("./assets/chuoi.png") },
  { id: '2', name: 'Red Apple', unit: '1kg, Priceg', price: 4.99, image: require("./assets/Vector.png") },
];

const BESTSELLING_PRODUCTS = [
  { id: '3', name: 'Bell Pepper Red', unit: '1kg, Priceg', price: 4.99, image: require("./assets/ot.png") },
  { id: '4', name: 'Ginger', unit: '250g, Priceg', price: 4.99, image: require("./assets/gung.png") },
];

const BEVERAGES_PRODUCTS = [
  { id: '101', name: 'Diet Coke', unit: '355ml, Price', price: 1.99, image: require("./assets/anh1.png") },
  { id: '102', name: 'Sprite Can', unit: '325ml, Price', price: 1.50, image: require("./assets/anh2.png") },
  { id: '103', name: 'Apple & Grape Juice', unit: '2L, Price', price: 15.99, image: require("./assets/anh3.png") },
  { id: '104', name: 'Orenge Juice', unit: '2L, Price', price: 15.99, image: require("./assets/anh4.png") },
  { id: '105', name: 'Coca Cola Can', unit: '325ml, Price', price: 4.99, image: require("./assets/anh5.png") },
  { id: '106', name: 'Pepsi Can', unit: '330ml, Price', price: 4.99, image: require("./assets/anh6.png") },
];

const CATEGORIES_DATA = [
  { id: '1', name: 'Frash Fruits & Vegetable', image: require("./assets/beef bone 1.png"), bg: '#EEF8F2', border: '#53B175' },
  { id: '2', name: 'Cooking Oil & Ghee', image: require("./assets/beef bone.png"), bg: '#FFF6EE', border: '#F8A44C' },
  { id: '3', name: 'Beverage', image: require("./assets/beef bone 2.png"), bg: '#FDE1E1', border: '#F7A593' },
  { id: '4', name: 'Bakery & Snacks', image: require("./assets/beef bone 3.png"), bg: '#F4EBF7', border: '#D3B0E0' },
  { id: '5', name: 'Dairy & Eggs', image: require("./assets/beef bone 1.png"), bg: '#FFF9E5', border: '#FDE598' },
  { id: '6', name: 'Beverages', image: require("./assets/beef bone 2.png"), bg: '#EDF7FC', border: '#B7DFF5' },
];

// ================= COMPONENTS DÙNG CHUNG =================
const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imgContainer}><Image source={item.image} style={styles.cardImg} resizeMode="contain" /></View>
    <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.cardUnit}>{item.unit || item.description}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addBtn}><Ionicons name="add" size={22} color="white" /></TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const FilterItem = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={styles.filterRow} onPress={onPress}>
    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
      {isSelected && <Text style={styles.checkMark}>✓</Text>}
    </View>
    <Text style={[styles.filterLabel, isSelected && styles.textGreen]}>{label}</Text>
  </TouchableOpacity>
);

// ================= SCREENS =================

// 1. MÀN HÌNH SHOP (HOME)
const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.headerHome}><Image source={require("./assets/Group.png")} style={styles.logo} /><Image source={require("./assets/Group 6809.png")} style={styles.logo1} /></View>
      <View style={styles.searchBox}><Ionicons name="search" size={20} color="#181725" /><TextInput placeholder="Search Store" style={styles.searchInput} editable={false} /></View>
      <Image source={require("./assets/banner.png")} style={styles.bannerImg} />
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Exclusive Offer</Text><Text style={styles.seeAll}>See all</Text></View>
      <FlatList horizontal data={EXCLUSIVE_PRODUCTS} showsHorizontalScrollIndicator={false} renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />} />
      <View style={[styles.sectionHeader, {marginTop: 20}]}><Text style={styles.sectionTitle}>Best Selling</Text><Text style={styles.seeAll}>See all</Text></View>
      <FlatList horizontal data={BESTSELLING_PRODUCTS} showsHorizontalScrollIndicator={false} renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />} />
    </ScrollView>
  </SafeAreaView>
);

// 2. MÀN HÌNH EXPLORE (LIÊN KẾT LOGIC SEARCH/FILTER/BEVERAGES)
const ExploreScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [displayList, setDisplayList] = useState(products);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim().length > 0) {
      setIsSearching(true);
      const filtered = products.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
      setDisplayList(filtered);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Find Products</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#181725" />
        <TextInput placeholder="Search Store" style={styles.searchInput} value={search} onChangeText={handleSearch} />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
             <Ionicons name="options-outline" size={22} color="#181725" style={{marginLeft: 10}} />
          </TouchableOpacity>
        )}
      </View>

      {!isSearching ? (
        <FlatList
          data={CATEGORIES_DATA}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.catCard, { backgroundColor: item.bg, borderColor: item.border }]}
              
              // ✅ FIX CHÍNH Ở ĐÂY
              onPress={() => {
                if (item.id === '3') {
                  navigation.navigate('Beverages', {
                    products: BEVERAGES_PRODUCTS,
                    title: item.name
                  });
                }
              }}
            >
              <Image source={item.image} style={styles.catImg} resizeMode="contain" />
              <Text style={styles.catName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )  : (
        <FlatList
          data={displayList} numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />}
          contentContainerStyle={styles.listPadding}
        />
      )}

      {/* FILTER MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} /></TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <View style={{width:28}}/>
            </View>
            <ScrollView>
              <Text style={styles.sectionTitleModal}>Categories</Text>
              {["Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"].map(c => <FilterItem key={c} label={c} isSelected={c==="Eggs"} />)}
              <Text style={[styles.sectionTitleModal, {marginTop: 30}]}>Brand</Text>
              {["Individual Collection", "Cocola", "Ifad", "Kazi Farmas"].map(b => <FilterItem key={b} label={b} isSelected={b==="Cocola"} />)}
            </ScrollView>
            <TouchableOpacity style={styles.applyBtnFull} onPress={() => setModalVisible(false)}><Text style={styles.mainBtnText}>Apply Filter</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const CartScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.pageTitle}>My Cart</Text>

    <View style={{ flex: 1 }}>
      <FlatList
        data={products.filter(p => p.id >= 7 && p.id <= 10)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.horizontalItem}>

            {/* IMAGE */}
            <Image source={item.image} style={styles.horizontalImg} />

            {/* INFO */}
            <View style={styles.horizontalInfo}>

              {/* NAME + DELETE */}
              <View style={styles.headerRow}>
                <Text style={styles.cardNameBold}>{item.name}</Text>
                <Text style={{ color: '#B3B3B3', fontSize: 18 }}>✕</Text>
              </View>

              {/* DESCRIPTION */}
              <Text style={styles.cardUnit}>{item.description}</Text>

              {/* QUANTITY + PRICE */}
              <View style={styles.qtyRowItem}>

                {/* QTY CONTROL */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.qtyAction}>—</Text>
                  <Text style={styles.qtyNum}>1</Text>
                  <Text style={[styles.qtyAction, { color: '#53B175' }]}>+</Text>
                </View>

                {/* PRICE */}
                <Text style={[styles.cardPrice, { marginLeft: 'auto' }]}>
                  ${item.price}
                </Text>
              </View>

            </View>
          </View>
        )}
      />
    </View>

    {/* CHECKOUT */}
    <TouchableOpacity style={styles.checkoutBtn}>
      <Text style={styles.mainBtnText}>Go to Checkout</Text>

      <View style={styles.priceBadge}>
        <Text style={styles.priceBadgeText}>$25.96</Text>
      </View>
    </TouchableOpacity>
  </SafeAreaView>
);

// 4. MÀN HÌNH FAVOURITE (GIỮ NGUYÊN GIAO DIỆN BÀI 2)
const FavouriteScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.pageTitle}>Favourite</Text>

    <View style={{ flex: 1 }}>
      <FlatList
        data={products.filter(p => p.id >= 11 && p.id <= 14)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.horizontalItem}>

            {/* IMAGE */}
            <Image source={item.image} style={styles.horizontalImg} />

            {/* INFO */}
            <View style={styles.horizontalInfo}>
              <Text style={styles.cardNameBold}>{item.name}</Text>
              <Text style={styles.cardUnit}>{item.description}</Text>
            </View>

            {/* RIGHT SIDE */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.cardPrice}>${item.price}</Text>
              <Text style={{ marginLeft: 12, fontSize: 20 }}>〉</Text>
            </View>

          </View>
        )}
      />
    </View>

    <TouchableOpacity style={styles.checkoutBtn}>
      <Text style={styles.mainBtnText}>Add All To Cart</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

// 5. MÀN HÌNH BEVERAGES
const BeveragesScreen = ({ route, navigation }) => {
  // Lấy dữ liệu từ params đã gửi từ ExploreScreen
  const { productsList, title } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBeverage}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {title || "Beverages"}
        </Text>

        <Ionicons name="options-outline" size={24} />
      </View>

      <FlatList
        // SỬA Ở ĐÂY: Dùng productsList truyền qua, nếu không có thì dùng mảng trống
        data={productsList || BEVERAGES_PRODUCTS} 
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

// 6. MÀN HÌNH PRODUCT DETAIL
const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [qty, setQty] = useState(1);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeaderBack}><TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={26} /></TouchableOpacity><Ionicons name="share-outline" size={24} /></View>
      <ScrollView><View style={styles.detailImgContainer}><Image source={product.image} style={styles.detailBigImg} resizeMode="contain" /></View>
        <View style={styles.detailContent}><Text style={styles.detailName}>{product.name}</Text><Text style={styles.cardUnit}>{product.unit}</Text>
          <View style={styles.qtyRowItemDetail}><View style={{flexDirection:'row', alignItems:'center'}}><TouchableOpacity onPress={() => qty > 1 && setQty(qty-1)}><Ionicons name="remove" size={28} color="#B3B3B3" /></TouchableOpacity><View style={styles.qtyBox}><Text style={styles.qtyText}>{qty}</Text></View><TouchableOpacity onPress={() => setQty(qty+1)}><Ionicons name="add" size={28} color="#53B175" /></TouchableOpacity></View><Text style={styles.detailPrice}>${(product.price * qty).toFixed(2)}</Text></View>
          <TouchableOpacity style={styles.applyBtnFull}><Text style={styles.mainBtnText}>Add To Basket</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ================= NAVIGATION =================
const Tabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: '#53B175',
    tabBarStyle: { height: 70, paddingBottom: 10 },
    tabBarIcon: ({ color, size }) => {
      let icon = route.name === 'Shop' ? 'storefront-outline' : route.name === 'Explore' ? 'search-outline' : route.name === 'Cart' ? 'cart-outline' : route.name === 'Favourite' ? 'heart-outline' : 'person-outline';
      return <Ionicons name={icon} size={size} color={color} />;
    },
  })}>
    <Tab.Screen name="Shop" component={HomeScreen} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Favourite" component={FavouriteScreen} />
    <Tab.Screen name="Account" component={View} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer><Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Tabs} />
      <Stack.Screen name="Beverages" component={BeveragesScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator></NavigationContainer>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  searchBox: { flexDirection: 'row', backgroundColor: '#F2F3F2', borderRadius: 15, padding: 12, marginHorizontal: 20, marginBottom: 20, alignItems: 'center' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  listPadding: { paddingHorizontal: 15, paddingBottom: 100 },
  catCard: { flex: 1, height: 180, margin: 8, borderRadius: 18, borderWidth: 1, padding: 15, alignItems: 'center', justifyContent: 'center' },
  catImg: { width: '80%', height: 70, marginBottom: 10 },
  catName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  card: { width: (width - 60) / 2, borderWidth: 1, borderColor: '#F2F3F2', borderRadius: 15, padding: 15, margin: 10 },
  imgContainer: { height: 80, justifyContent: 'center' },
  cardImg: { width: '100%', height: '100%' },
  cardName: { fontSize: 14, marginTop: 10, fontWeight: 'bold' },
  cardNameBold: { fontSize: 16, fontWeight: 'bold' },
  cardUnit: { color: '#7C7C7C', fontSize: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
  cardPrice: { fontWeight: 'bold', fontSize: 18 },
  addBtn: { backgroundColor: '#53B175', borderRadius: 12, padding: 8 },
  horizontalItem: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2', alignItems:'center' },
  horizontalImg: { width: 70, height: 70, resizeMode: 'contain' },
  headerRow: {flexDirection:'row', justifyContent:'space-between'},
  qtyRowItem: {flexDirection:'row', alignItems:'center', marginTop:15},
  qtyAction: {borderWidth:1, borderColor:'#E2E2E2', width:35, height:35, borderRadius:12, textAlign:'center', lineHeight:33, fontSize:20},
  checkoutBtn: { backgroundColor: '#53B175', marginHorizontal: 25, marginBottom: 100, paddingVertical: 20, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  priceBadge: { backgroundColor: '#489E67', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, position:'absolute', right:20 },
  priceBadgeText: { color: '#fff', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  sectionTitleModal: { fontSize: 24, fontWeight: '600', marginVertical: 15 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', marginRight: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  checkboxActive: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkMark: { color: '#fff', fontWeight: 'bold' },
  filterLabel: { fontSize: 16 },
  textGreen: { color: '#53B175' },
  applyBtnFull: { backgroundColor: '#53B175', paddingVertical: 20, borderRadius: 18, alignItems: 'center', marginTop: 10 },
  mainBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  headerHome: { alignItems: 'center', paddingVertical: 10 },
  logo: { width: 30, height: 35 },
  logo1: { width: 100, height: 25, resizeMode: 'contain' },
  bannerImg: { height: 115, width: '90%', alignSelf: 'center', borderRadius: 15, marginBottom: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  seeAll: { color: '#53B175', fontWeight: 'bold' },
  headerBeverage: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  HeaderBack: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  detailImgContainer: { backgroundColor: '#F2F3F2', height: 250, justifyContent: 'center', alignItems: 'center' },
  detailBigImg: { width: '80%', height: '80%' },
  detailContent: { padding: 25 },
  detailName: { fontSize: 24, fontWeight: 'bold' },
  qtyRowItemDetail: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  qtyBox: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 8, marginHorizontal: 15 },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  horizontalInfo: {
  flex: 1,
  marginLeft: 15,
  justifyContent: 'center'
},

cardNameBold: {
  fontSize: 16,
  fontWeight: '600',
  color: '#181725'
},

headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
},

qtyRowItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 12
},

qtyAction: {
  borderWidth: 1,
  borderColor: '#E2E2E2',
  width: 35,
  height: 35,
  borderRadius: 12,
  textAlign: 'center',
  lineHeight: 33,
  fontSize: 20,
  color: '#B3B3B3'
},

qtyNum: {
  marginHorizontal: 15,
  fontSize: 16,
  fontWeight: '600',
  color: '#181725'
},

horizontalItem: {
  flexDirection: 'row',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#F2F3F2',
  alignItems: 'center'
},

horizontalImg: {
  width: 70,
  height: 70,
  resizeMode: 'contain'
},
});