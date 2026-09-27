import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AppTabs() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <Text style={[styles.icon, styles.active]}>
          🏠
        </Text>

        <Text style={[styles.label, styles.active]}>
          Trang chủ
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.icon}>📚</Text>

        <Text style={styles.label}>
          Danh mục
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.icon}>🛒</Text>

        <Text style={styles.label}>
          Giỏ hàng
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Text style={styles.icon}>👤</Text>

        <Text style={styles.label}>
          Tài khoản
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 20,
    marginBottom: 4,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
  },

  active: {
    color: "#2563EB",
    fontWeight: "700",
  },
});