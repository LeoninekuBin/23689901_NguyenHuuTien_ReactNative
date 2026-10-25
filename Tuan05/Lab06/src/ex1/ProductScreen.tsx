import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { PHONE_COLORS } from "../data/phone";
import { Stars } from "../components/Starts";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image
            source={PHONE_COLORS[shown].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{phone.name}</Text>

          <View style={styles.row}>
            <Stars value={phone.rating} />
            <Text style={styles.review}>
              (Xem {phone.reviewCount} đánh giá)
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            <Text style={styles.oldPrice}>
              {formatPrice(phone.oldPrice)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.badge}>{phone.badge}</Text>
          </View>

          {/* TODO 1: Nút chọn màu */}
          <Pressable
            style={styles.chooseBtn}
            onPress={() =>
              navigation.navigate("ChooseColor", { color: picked })
            }
          >
            <Text style={styles.chooseText}>
              {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
            </Text>
            <Text style={styles.arrow}>{">"}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* TODO 2: Nút CHỌN MUA nằm dưới cùng */}
      <Pressable style={styles.buyBtn} onPress={() => {}}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageWrap: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    gap: 12,
  },
  name: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  review: {
    color: colors.text,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  oldPrice: {
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: {
    color: colors.text,
    fontWeight: "bold",
  },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 14,
    paddingRight: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  chooseText: {
    fontSize: 15,
    fontWeight: "500",
  },
  arrow: {
    position: "absolute",
    right: 12,
    fontSize: 20,
  },
  buyBtn: {
    backgroundColor: colors.red,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 6,
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});