import {
  DarkTheme,
  DefaultTheme,
  Slot,
  ThemeProvider,
} from "expo-router";
import { useColorScheme } from "react-native";
import { StyleSheet, View } from "react-native";

import AppTabs from "@/components/app-tabs";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Slot />
        </View>

        <AppTabs />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});