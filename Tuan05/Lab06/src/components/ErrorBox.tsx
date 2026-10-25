import React from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: colors.red, marginBottom: 16 }}>
        {message}
      </Text>

      <Pressable
        onPress={onRetry}
        style={{
          backgroundColor: colors.red,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          THỬ LẠI
        </Text>
      </Pressable>
    </View>
  );
}