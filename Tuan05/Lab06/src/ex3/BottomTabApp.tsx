import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { PHONES } from "../data/phone";
import { colors } from "../theme";

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      style={s.screen}
      data={PHONES}
      keyExtractor={(phone) => phone.id}
      contentContainerStyle={s.list}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.productName}>{item.name.split(" - ")[0]}</Text>
          <Text>{item.price.toLocaleString("vi-VN")} đ</Text>
        </View>
      )}
    />
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState("");

  const filtered = PHONES.filter((phone) =>
    phone.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={s.screen}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />

      {filtered.length === 0 ? (
        <Text style={s.empty}>
          Không có kết quả cho “{keyword}”
        </Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(phone) => phone.id}
          contentContainerStyle={s.list}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.productName}>
                {item.name.split(" - ")[0]}
              </Text>
              <Text>{item.price.toLocaleString("vi-VN")} đ</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={s.profile}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>A</Text>
      </View>
      <Text style={s.profileName}>Nguyen Huu Tien</Text>
      <Text style={s.email}>tien@gmail.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
    gap: 10,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    gap: 8,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  empty: {
    textAlign: "center",
    margin: 16,
    color: colors.muted,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    color: colors.muted,
  },
});