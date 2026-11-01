import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";

const EMOJI: Record<string, string> = {
  Home: "🏠",
  Categories: "🗂️",
  Cart: "🛒",
  Account: "👤",
};

// cầu nối nhận dữ liệu của React Navigation
export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  const { totalQuantity } = useCart();

  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name] ?? "•",
    // chỉ tab Giỏ hàng mới có badge = tổng số lượng trong giỏ
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));

  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    if (!route) return;

    const isFocused = state.routes[state.index].key === key;

    // phát sự kiện tabPress để thư viện/ màn hình khác có thể "chặn" 
    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });

    // chỉ chuyển tab khi tab đó chưa đang mở và không bị chặn
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />;
}