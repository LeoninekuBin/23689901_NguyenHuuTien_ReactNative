    import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PHONES, PHONE_COLORS } from "../data/phone";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Starts";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({
  route,
}: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((item) => item.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return <Text>Không tìm thấy sản phẩm #{id}</Text>;
  }

  const saved = has(phone.id);
  const image = PHONE_COLORS[phone.defaultColor].image;

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <View style={s.imageWrap}>
        <Image source={image} style={s.image} resizeMode="contain" />
      </View>

      <Text style={s.name}>{phone.name}</Text>

      <Stars value={phone.rating} />

      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text>Nhà cung cấp: {phone.supplier}</Text>

      <Pressable
        style={s.button}
        onPress={() => toggle(phone.id)}
      >
        <Text style={s.buttonText}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  imageWrap: {
    height: 240,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 22,
    color: colors.red,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.red,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});