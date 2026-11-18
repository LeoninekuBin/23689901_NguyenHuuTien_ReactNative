import { api } from "../api/client";
import { AppNotification } from "../types";

// hàm sử dụng để lấy danh sách thông báo của người dùng sắp xếp theo thời gian tạo mới nhất
export async function getNotifications(userId: number): Promise<AppNotification[]> {
  const res = await api.get<AppNotification[]>("/notifications", { params: { userId, _sort: "createdAt", _order: "desc" } });
  return res.data;
}

// hàm sử dụng để cập nhật trạng thái thông báo thành đã đọc trên máy chủ qua phương thức patch
export async function markAsRead(id: number): Promise<AppNotification> {
  const res = await api.patch<AppNotification>(`/notifications/${id}`, { read: true });
  return res.data;
}
