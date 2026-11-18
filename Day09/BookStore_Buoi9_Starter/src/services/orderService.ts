import { api } from "../api/client";
import { Order, OrderItem, PaymentMethod, ShippingAddress } from "../types";

export interface NewOrder {
  userId: number;
  items: OrderItem[];
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
}

// hàm sử dụng để gửi đơn hàng mới lên máy chủ thông qua phương thức post
export async function createOrder(payload: NewOrder): Promise<Order> {
  const res = await api.post<Order>("/orders", { ...payload, status: "pending", createdAt: new Date().toISOString() });
  return res.data;
}

// hàm sử dụng để lấy danh sách đơn hàng của người dùng theo userId và sắp xếp mới nhất lên đầu
export async function getOrdersByUser(userId: number): Promise<Order[]> {
  const res = await api.get<Order[]>("/orders", { params: { userId, _sort: "createdAt", _order: "desc" } });
  return res.data;
}
