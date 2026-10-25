import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "./src/theme";
import { PHONES } from "./src/data/phone";

import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp"; 
import { StackTabApp } from "./src/ex4/StackTabApp";
// import { DrawerApp } from "./src/ex5/DrawerApp";

type Exercise = 0 | 1 | 2 | 3 | 4 | 5;

const MENU: { id: Exercise; title: string }[] = [
  { id: 1, title: "Bài 1 — Select Phone" },
  { id: 2, title: "Bài 2 — Select Phone API" },
  { id: 3, title: "Bài 3 — Bottom Tab" },
  { id: 4, title: "Bài 4 — Stack + Tab + Params" },
  { id: 5, title: "Bài 5 — Drawer" },
];

export default function App() {
  const [exercise, setExercise] = useState<Exercise>(0);

  if (exercise !== 0) {
    return (
      <SafeAreaView style={styles.app}>
        <Pressable
          style={styles.back}
          onPress={() => setExercise(0)}
        >
          <Text style={styles.backText}>‹ Quay lại menu bài tập</Text>
        </Pressable>

        <View style={styles.content}>
          {exercise === 1 && <SelectPhoneApp phone={PHONES[0]} />}
          {exercise === 2 && <SelectPhoneApi />}
          {exercise === 3 && <BottomTabApp />}
          {exercise === 4 && <StackTabApp />}
          {/* {exercise === 5 && <DrawerApp />} */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.app}>
      <ScrollView contentContainerStyle={styles.menu}>
        <Text style={styles.heading}>LAB 06</Text>
        <Text style={styles.subtitle}>Navigation — React Native</Text>

        {MENU.map((item) => (
          <Pressable
            key={item.id}
            style={styles.menuItem}
            onPress={() => setExercise(item.id)}
          >
            <Text style={styles.menuText}>{item.title}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menu: {
    padding: 20,
    gap: 12,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.red,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  arrow: {
    fontSize: 24,
    color: colors.muted,
  },
  back: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  backText: {
    color: colors.red,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
});