import type { ColorKey, Phone } from "../types";

export const PHONE_COLORS: Record<
  ColorKey,
  { label: string; hex: string; image: number }
> = {
  silver: {
    label: "bạc",
    hex: "#C9EEFA",
    image: require("../../assets/phones/silver.png"),
  },
  red: {
    label: "đỏ",
    hex: "#E53A2F",
    image: require("../../assets/phones/red.png"),
  },
  black: {
    label: "đen",
    hex: "#000000",
    image: require("../../assets/phones/black.png"),
  },
  blue: {
    label: "xanh",
    hex: "#2A4494",
    image: require("../../assets/phones/blue.png"),
  },
};

export const COLOR_ORDER: ColorKey[] = [
  "silver",
  "red",
  "black",
  "blue",
];

export const PHONES: Phone[] = [
  {
    id: "1",
    name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: 1790000,
    oldPrice: 1790000,
    rating: 5,
    reviewCount: 828,
    supplier: "Tiki Tradding",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "2",
    name: "Vsmart Live 4 - Hàng chính hãng",
    price: 3990000,
    oldPrice: 4490000,
    rating: 5,
    reviewCount: 120,
    supplier: "Vsmart",
    badge: "GIÁ TỐT",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "3",
    name: "Vsmart Star 5 - Hàng chính hãng",
    price: 2490000,
    oldPrice: 2790000,
    rating: 4,
    reviewCount: 95,
    supplier: "Vsmart",
    badge: "GIÁ TỐT",
    colors: COLOR_ORDER,
    defaultColor: "black",
  },
  {
    id: "4",
    name: "Vsmart Active 3 - Hàng chính hãng",
    price: 3290000,
    oldPrice: 3690000,
    rating: 5,
    reviewCount: 210,
    supplier: "Vsmart",
    badge: "ƯU ĐÃI",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "5",
    name: "Vsmart Aris Pro - Hàng chính hãng",
    price: 5990000,
    oldPrice: 6990000,
    rating: 5,
    reviewCount: 88,
    supplier: "Vsmart",
    badge: "ƯU ĐÃI",
    colors: COLOR_ORDER,
    defaultColor: "black",
  },
  {
    id: "6",
    name: "Vsmart Bee 3 - Hàng chính hãng",
    price: 990000,
    oldPrice: 1190000,
    rating: 4,
    reviewCount: 65,
    supplier: "Vsmart",
    badge: "GIÁ TỐT",
    colors: COLOR_ORDER,
    defaultColor: "silver",
  },
];