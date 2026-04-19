import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
} from "react-native";

import products from "./data";

const { width } = Dimensions.get("window");

export default function App() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState(
    products.filter((p) => p.name.toLowerCase().includes(""))
  );

  
  const [selectedCategory, setSelectedCategory] = useState("Eggs");
  const [selectedBrand, setSelectedBrand] = useState("Cocola");

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setList(filtered);
  };

  const applyFilter = () => {
    const filtered = products.filter(
      (p) => p.category === selectedCategory && p.brand === selectedBrand
    );
    setList(filtered);
    setModalVisible(false);
  };

  
  const FilterItem = ({ label, isSelected, onPress }) => (
    <TouchableOpacity
      style={styles.filterRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
        {isSelected && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={[styles.filterLabel, isSelected && styles.textGreen]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image source={item.image} style={styles.img} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.plusBtn}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* SEARCH SECTION */}
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
          />
          {search !== "" && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Text style={styles.clearIcon}>ⓧ</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("./assets/Group 6839.png")}
            style={styles.customFilterIcon}
          />
        </TouchableOpacity>
      </View>

     
      <FlatList
        data={list}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FILTER MODAL */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
      
          <View style={styles.modalContent}>
            
          
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeTouch}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <View style={{ width: 40 }} /> 
            </View>

            <View style={styles.filterBody}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <FilterItem
                label="Eggs"
                isSelected={selectedCategory === "Eggs"}
                onPress={() => setSelectedCategory("Eggs")}
              />
              <FilterItem
                label="Noodles & Pasta"
                isSelected={selectedCategory === "Noodles & Pasta"}
                onPress={() => setSelectedCategory("Noodles & Pasta")}
              />
              <FilterItem
                label="Chips & Crisps"
                isSelected={selectedCategory === "Chips & Crisps"}
                onPress={() => setSelectedCategory("Chips & Crisps")}
              />
              <FilterItem
                label="Fast Food"
                isSelected={selectedCategory === "Fast Food"}
                onPress={() => setSelectedCategory("Fast Food")}
              />

              <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
              <FilterItem
                label="Individual Callection"
                isSelected={selectedBrand === "Individual Callection"}
                onPress={() => setSelectedBrand("Individual Callection")}
              />
              <FilterItem
                label="Cocola"
                isSelected={selectedBrand === "Cocola"}
                onPress={() => setSelectedBrand("Cocola")}
              />
              <FilterItem
                label="Ifad"
                isSelected={selectedBrand === "Ifad"}
                onPress={() => setSelectedBrand("Ifad")}
              />
              <FilterItem
                label="Kazi Farmas"
                isSelected={selectedBrand === "Kazi Farmas"}
                onPress={() => setSelectedBrand("Kazi Farmas")}
              />
            </View>

            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Text style={styles.applyBtnText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      <View style={styles.bottomTab}>
        <TabItem icon="🏪" label="Shop" color="#181725" />
        <TabItem icon="🔍" label="Explore" color="#53B175" active />
        <TabItem icon="🛒" label="Cart" color="#181725" />
        <TabItem icon="❤️" label="Favourite" color="#181725" />
        <TabItem icon="👤" label="Account" color="#181725" />
      </View>
    </SafeAreaView>
  );
}

const TabItem = ({ icon, label, color, active }) => (
  <View style={styles.tabItem}>
    <Text style={{ fontSize: 20, color: active ? "#53B175" : "#181725" }}>
      {icon}
    </Text>
    <Text style={[styles.tabLabel, { color: color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
  },
  clearIcon: {
    color: "#ccc",
    fontSize: 18,
    marginLeft: 5,
  },
  filterBtn: {
    marginLeft: 15,
  },
  customFilterIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  card: {
    width: (width - 60) / 2,
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  imgContainer: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    height: 60,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
  },
  desc: {
    fontSize: 12,
    color: "#7C7C7C",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#181725",
  },
  plusBtn: {
    backgroundColor: "#53B175",
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    color: "#fff",
    fontSize: 24,
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    width: "100%",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#F2F3F2",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 15, 
    paddingBottom: 25,
    height: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10, 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeIcon: {
    fontSize: 22,
  },
  filterBody: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#B1B1B1",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxActive: {
    backgroundColor: "#53B175",
    borderColor: "#53B175",
  },
  checkMark: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterLabel: {
    fontSize: 16,
    color: "#181725",
  },
  textGreen: {
    color: "#53B175",
  },
  applyBtn: {
    backgroundColor: "#53B175",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});