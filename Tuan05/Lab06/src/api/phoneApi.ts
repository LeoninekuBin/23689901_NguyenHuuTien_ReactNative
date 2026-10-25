import { PHONES } from "../data/phone";
import type { Phone } from "../types";

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? ""
).replace(/\/$/, "");

export const USING_API = API_URL !== "";

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchPhone(id: string): Promise<Phone> {

  if (!USING_API) {
    await sleep(600);

    const phone = PHONES.find((item) => item.id === id);

    if (!phone) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    return phone;
  }


  const response = await fetch(`${API_URL}/phones/${id}`);

  if (!response.ok) {
    throw new Error(`Máy chủ trả về lỗi ${response.status}`);
  }

  return (await response.json()) as Phone;
}