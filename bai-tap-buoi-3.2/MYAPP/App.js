import { View, Text, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const DATA = [
  {
    id: "1",
    highlight: true,
    type: "task",
    title: "Bước 1 Xác định nhu cầu khách hàng",
    content: "Vũ Văn Hoàng sắp đến hạn lúc 01/08/2020 9:00",
    date: "20/08/2020, 06:00",
  },
  {
    id: "2",
    highlight: true,
    type: "customer",
    title: "Bạn có khách hàng mới!",
    content:
      "Chúc mừng bạn, bạn có khách hàng mới. Hãy mau chóng liên lạc ngay.",
    date: "20/08/2020, 06:00",
  },
  {
    id: "3",
    highlight: false,
    type: "customer",
    title: "Khách hàng được chia sẻ bị trùng",
    content: "Rất tiếc, khách hàng được chia sẻ đã tồn tại trên hệ thống.",
    date: "20/08/2020, 06:00",
  },
  {
    id: "4",
    highlight: true,
    type: "customer",
    title: "Khách hàng được thêm bị trùng",
    content:
      "Rất tiếc, khách hàng được thêm bị đã tồn tại trên hệ thống. Vui lòng thêm khách hàng.",
    date: "20/08/2020, 06:00",
  },
  {
    id: "5",
    highlight: false,
    type: "task",
    title: "Công việc sắp đến hạn trong hôm nay",
    content: "Bạn có 17 công việc sắp hết hạn trong hôm nay.",
    date: "20/08/2020, 06:00",
  },
  {
    id: "6",
    highlight: false,
    type: "task",
    title: "Công việc đã quá hạn",
    content:
      "Bạn có 17 công việc bị quá hạn. Hãy kiểm tra và liên hệ hoàn thành công việc.",
    date: "20/08/2020, 06:00",
  },
];

const NotificationItem = ({ item }) => {
  const isTask = item.type === "task";
  const backgroundColor = item.highlight ? "#e3f2fd" : "#fff";

  return (
    <View style={[styles.item, { backgroundColor }]}>
      <View
        style={[
          styles.iconContainer,
          isTask ? styles.iconTask : styles.iconCustomer,
        ]}
      >
        <Ionicons
          name={isTask ? "checkmark" : "people"}
          size={18}
          color={isTask ? "#fff" : "#3f51b5"}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );
};

const Header = () => (
  <View style={headerStyles.container}>
    <Text style={headerStyles.title}>Thông báo</Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar style="auto" />
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Header />
          <FlatList
            data={DATA}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const headerStyles = {
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // nền xanh nhạt
    borderBottomWidth: 1,
    borderBottomColor: "#d6e4ff",
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  iconTask: {
    backgroundColor: "#3f51b5",
  },

  iconCustomer: {
    backgroundColor: "#e8eaf6",
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },

  content: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
    color: "#888",
  },
};
