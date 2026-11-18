import { api } from "../api/client";
import { User } from "../types";

// hàm sử dụng để cập nhật thông tin họ tên và số điện thoại của người dùng, đồng thời loại bỏ mật khẩu trả về
export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, data);
  const { password: _pw, ...user } = res.data;
  return user;
}
