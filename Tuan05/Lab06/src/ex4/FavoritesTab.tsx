import React from "react";
import { FlatList, Text, View } from "react-native";

import { PHONES } from "../data/phone";
import { ProductRow } from "./ProductRow";
import { useFavorites } from "./FavoritesContext";
import type { TabProps } from "./types";

export function FavoritesTab({
  navigation,
}: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const savedPhones = PHONES.filter((phone) => ids.includes(phone.id));

  if (savedPhones.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={savedPhones}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() =>
            navigation.navigate("ProductDetails", { id: item.id })
          }
        />
      )}
    />
  );
}