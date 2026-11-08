import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// Component sao tái sử dụng: vừa hiển thị sao tĩnh, vừa hỗ trợ bấm chọn số sao tương tác
export function RatingStars({ value, size = 18, onChange }: Props) {
  // làm tròn giá trị điểm sao để xác định số sao cần tô màu vàng
  const filled = Math.round(value);

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        // vẽ ngôi sao ★: nếu vị trí <= filled thì tô màu cảnh báo vàng, còn lại màu viền xám
        const star = (
          <Text key={n} style={{ fontSize: size, color: n <= filled ? colors.warning : colors.line }}>
            ★
          </Text>
        );

        // nếu có truyền hàm onChange (trong form đánh giá) thì bọc trong Pressable để bấm chọn
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            {star}
          </Pressable>
        ) : (
          star
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
});
