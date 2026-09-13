import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CATEGORIES } from "../../data";

const DEMO_EXTRA_HEIGHT = false;

export function CategoryChips() {
  return (
    <View
      style={[
        styles.wrap,
        DEMO_EXTRA_HEIGHT && {
          height: 220,
          alignContent: "flex-start",
        },
      ]}
    >
      {CATEGORIES.map((name) => (
        <View key={name} style={styles.chip}>
          <Text style={styles.chipText}>{name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D9D7F0",
    backgroundColor: "#FFFFFF",
  },

  chipText: {
    color: "#1E1B4B",
    fontSize: 13,
    fontWeight: "600",
  },
});