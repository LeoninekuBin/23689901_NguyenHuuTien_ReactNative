import React from "react";
import { FlatList } from "react-native";
import { PHONES } from "../data/phone";
import { ProductRow } from "./ProductRow";
import type { TabProps } from "./types";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
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