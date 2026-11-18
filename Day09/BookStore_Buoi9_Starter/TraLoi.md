
### Câu 1: Giá trị dẫn xuất (Derived State)
- **Tại sao errors và valid được tính trực tiếp mỗi lần render mà không dùng useState riêng?**
  errors và valid là các giá trị dẫn xuất (derived state) được suy ra trực tiếp từ các state hiện có gồm name, phone, address và số lượng phần tử của giỏ hàng items. Việc tính toán trực tiếp trong mỗi lần render giúp dữ liệu luôn đồng bộ và nhất quán tức thì với giá trị mới nhất của form.
- **Nếu dùng useState thì dễ sai ở chỗ nào?**
  Nếu lưu bằng useState, ta sẽ phải viết logic cập nhật state lỗi ở tất cả các hàm thay đổi giá trị (setName, setPhone, setAddress, và khi giỏ hàng thay đổi). Việc này dễ dẫn đến tình trạng bất đồng bộ, quên cập nhật ở một vị trí nào đó khiến thông báo lỗi hiển thị sai hoặc nút bấm kích hoạt không đúng thời điểm.


### Câu 2: Thứ tự gọi trong hàm submit
- **Nếu để clear() chạy trước await createOrder(...) thì khi mất mạng người dùng gặp chuyện gì?**
  Nếu gọi clear() trước, giỏ hàng trong store và AsyncStorage sẽ bị xoá ngay lập tức. Khi gọi API createOrder mà gặp lỗi mất mạng hoặc lỗi máy chủ, đơn hàng chưa được tạo thành công nhưng giỏ hàng đã bị mất trắng, khiến người dùng mất toàn bộ danh sách sản phẩm đã chọn và phải chọn lại từ đầu.
- **Vì sao đặt clear() ngay sau createOrder là đúng?**
  Đặt clear() ngay sau await createOrder(...) đảm bảo chỉ khi máy chủ phản hồi tạo đơn hàng thành công thì giỏ hàng mới được dọn dẹp. Nếu có lỗi xảy ra ở bước gọi API, luồng thực thi sẽ nhảy vào khối catch, giỏ hàng được giữ nguyên vẹn để người dùng có thể thử gửi lại đơn hàng.



### Câu 3: So sánh giữa PUT và PATCH
- **Nếu dùng PUT /users/1 với { name, phone } thì db.json còn lại gì ở user đó?**
  Phương thức PUT sẽ thay thế toàn bộ đối tượng tài nguyên hiện tại bằng payload được gửi lên. Do đó, đối tượng user trong db.json sẽ chỉ còn lại các trường name, phone (và id do json-server giữ lại), còn các trường quan trọng khác như email, password sẽ bị mất hoàn toàn.
- **Vì sao bài này chọn PATCH?**
  Phương thức PATCH chỉ cập nhật cục bộ các trường dữ liệu được truyền lên trong request body (name và phone), giữ nguyên vẹn các trường thông tin khác của người dùng như email, password. Vì vậy, PATCH an toàn và phù hợp cho tính năng chỉnh sửa một phần hồ sơ cá nhân.


### Câu 4: Cập nhật lạc quan (Optimistic Update)
- **Nếu bỏ đoạn hoàn lại read: false trong catch ở màn Thông báo thì xảy ra lỗi gì khi mất mạng?**
  Khi người dùng nhấn vào thông báo lúc mất mạng, giao diện đã đổi ngay sang trạng thái "đã đọc" (nền trắng, mất chấm đỏ). Nếu không hoàn lại trong catch, giao diện hiển thị là đã đọc nhưng thực tế máy chủ chưa lưu trạng thái này. Khi người dùng làm mới màn hình hoặc tải lại app, thông báo đó sẽ bị nhảy ngược lại thành "chưa đọc", gây khó hiểu và trải nghiệm không nhất quán.
- **Ví dụ chức năng nên và không nên dùng cập nhật lạc quan:**
  - **Nên dùng:** Chức năng yêu thích / bỏ yêu thích sách (thả tim), hoặc đánh dấu đã đọc thông báo. Đây là các hành động có tỉ lệ thành công cao, tính rủi ro thấp, người dùng muốn thấy phản hồi tức thì mà không cần chờ đợi mạng.
  - **Không nên dùng:** Chức năng thanh toán / đặt đơn hàng hoặc chuyển khoản tiền. Thao tác này liên quan trực tiếp đến tiền bạc và dữ liệu giao dịch, bắt buộc phải đợi phản hồi xác nhận thành công từ máy chủ rồi mới hiển thị thông báo thành công và xóa giỏ hàng.


### Câu 5: Code bổ sung bộ lọc trạng thái ở màn Đơn hàng
Đã thêm bộ lọc trạng thái đơn hàng (Tất cả, Chờ xác nhận, Đang giao, Hoàn tất, Đã huỷ) trong màn hình OrdersScreen.tsx với các bước thực hiện:

1. Thêm state lưu trạng thái được chọn:
```tsx
const [selectedStatus, setSelectedStatus] = useState<"all" | OrderStatus>("all");
```

2. Lọc dữ liệu trước khi truyền vào FlatList:
```tsx
const filteredOrders = orders.filter((o) => selectedStatus === "all" || o.status === selectedStatus);
```

3. Thêm thanh cuộn ngang chứa các nút lọc trạng thái phía trên danh sách đơn hàng:
```tsx
<View style={{ maxHeight: 50 }}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
    {STATUS_FILTERS.map((f) => {
      const active = selectedStatus === f.value;
      return (
        <Pressable
          key={f.value}
          onPress={() => setSelectedStatus(f.value)}
          style={[styles.filterChip, active && styles.filterChipActive]}
        >
          <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{f.label}</Text>
        </Pressable>
      );
    })}
  </ScrollView>
</View>
```

4. Truyền dữ liệu đã lọc vào FlatList:
```tsx
<FlatList
  data={filteredOrders}
  keyExtractor={(o) => String(o.id)}
  ...
/>
```
