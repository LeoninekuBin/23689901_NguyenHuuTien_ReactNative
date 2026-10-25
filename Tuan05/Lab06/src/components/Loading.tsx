import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={{ marginTop: 12, color: colors.text }}>
        Đang tải...
      </Text>
    </View>
  );
}