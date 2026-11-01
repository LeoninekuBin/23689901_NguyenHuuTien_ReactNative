import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { TabScreenProps } from "../navigation/types";
import { Category } from "../types";
import { colors, radius } from "../theme";

export function CategoriesScreen({ navigation }: TabScreenProps<"Categories">) {
  // cùng khuôn với Home nhưng chỉ gọi 1 API
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getCategories());
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <Header title="🗂️ Danh mục" />
      {/* 3 trạng thái: đang tải -> lỗi (có Thử lại) -> có dữ liệu */}
      {loading ? (
        <LoadingView label="Đang tải danh mục…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(c) => String(c.id)}
          contentContainerStyle={{ padding: 12, gap: 10 }}
          renderItem={({ item }) => (
            // 7.8c: bấm danh mục -> sang tab Home kèm categoryId (Home sẽ tự lọc)
            <Pressable style={styles.row} onPress={() => navigation.navigate("Home", { categoryId: item.id })}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16, borderRadius: radius.md, gap: 12 },
  emoji: { fontSize: 26 },
  name: { flex: 1, fontSize: 16, fontWeight: "700", color: colors.text },
  arrow: { fontSize: 22, color: colors.muted },
});