import React, { useState } from "react";
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

import type { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phone";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );

  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />

        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* TODO 3: Chỉ hiện thông tin khi đã chọn màu */}
          {picked && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi{" "}
                <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <ScrollView contentContainerStyle={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </ScrollView>

        {/* TODO 4: Nút XONG */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate("Product", { color: picked })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    minHeight: 160,
    gap: 12,
  },
  thumb: {
    width: 100,
    height: 130,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  small: {
    fontSize: 14,
    color: colors.text,
  },
  detail: {
    fontSize: 13,
    color: colors.text,
  },
  bold: {
    fontWeight: "bold",
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 16,
  },
  hint: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "500",
  },
  swatches: {
    alignItems: "center",
    gap: 16,
    paddingBottom: 16,
  },
  swatch: {
    width: 90,
    height: 55,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  swatchOn: {
    borderWidth: 4,
    borderColor: "#333",
  },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: "auto",
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});