import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Phone } from "../types";
import { formatPrice } from "../theme";

export function ProductRow({
  phone,
  onPress,
}: {
  phone: Phone;
  onPress: () => void;
}) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <View style={s.info}>
        <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={s.arrow}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1,
    borderColor: "#D8DCE3",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  info: {
    flex: 1,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#E53A2F",
  },
  arrow: {
    fontSize: 26,
    marginLeft: 12,
  },
});