Câu 1: 
Nếu bỏ điều kiện 'ready', giỏ hàng đã lưu trước đó trong 'AsyncStorage' sẽ bị ghi đè mất trắng (trở về rỗng).
Thứ tự các lần render giải thích như sau:
1. Lần render đầu tiên (Initial Mount)
   - Redux Store được khởi tạo với trạng thái ban đầu của giỏ hàng là mảng rỗng: `cartItems = []`.
   - Effect đọc dữ liệu `loadJSON(CART_KEY)` trong `usePersistence` là hàm bất đồng bộ (async), cần thời gian truy xuất storage trên đĩa và chưa thể hoàn thành ngay tức thì.
   - Nếu `useAutoPersist` không có điều kiện kiểm tra `if (ready)`, effect tự động lưu sẽ chạy ngay lập tức ở lần render đầu tiên với giá trị `cartItems` hiện tại (đang là `[]`), dẫn đến việc ghi đè mảng rỗng lên dữ liệu giỏ hàng cũ đang lưu trong `AsyncStorage`.
2. Lần render tiếp theo (khi đọc storage xong):
   - Lúc này hàm đọc bất đồng bộ trả về kết quả thì dữ liệu trên storage đã bị mảng rỗng ghi đè trước đó, khiến giỏ hàng bị mất dữ liệu vĩnh viễn sau mỗi lần mở lại app.
=> Cờ `ready` đóng vai trò chốt an toàn (guard): chỉ cho phép bắt đầu tự động ghi dữ liệu vào storage sau khi ứng dụng đã nạp xong toàn bộ dữ liệu lưu trước đó (`ready = true`).



Câu 2: Token giả & Bảo mật

- Hai điểm không an toàn trong bài thực hành:
  1. Lộ thông tin mật khẩu: Danh sách người dùng và mật khẩu (dạng chuỗi rõ / plain text) nằm sẵn trong file `db.json` hoặc gửi về máy client để tự so sánh, kẻ xấu dễ dàng đọc mã nguồn hoặc can thiệp network để chiếm đoạt tài khoản.
  2. Token giả lập tùy tiện: Token được tạo tự do ở phía client bằng hàm sinh chuỗi đơn giản mà không có chữ ký số bí mật (secret key) từ server, dẫn đến bất kỳ ai cũng có thể giả mạo token để truy cập trái phép.
- Trong hệ thống thực tế:
  - Server (Backend API) là nơi duy nhất chịu trách nhiệm kiểm tra mật khẩu (đã được băm an toàn bằng các thuật toán mã hóa một chiều như bcrypt/Argon2 kèm salt) và sinh ra JSON Web Token (JWT) có chữ ký số kèm thời hạn hết hạn.
  - Lưu trữ token an toàn: Thay vì lưu token thô trong `AsyncStorage` (vốn là lưu trữ dạng văn bản không mã hóa), ứng dụng phải lưu token vào **`expo-secure-store`** (hoặc thư viện tương đương), nơi dữ liệu được bảo vệ bởi phần cứng bảo mật chuyên dụng (`Keychain` trên iOS và `Keystore / EncryptedSharedPreferences` trên Android).


 Câu 3: Hai effect trong `CartItemRow`

Nếu xóa effect đồng bộ `useEffect(() => { setQty(item.quantity); }, [item.quantity])`, state cục bộ `qty` của component sẽ không được cập nhật lại mỗi khi `item.quantity` từ Redux store thay đổi bởi một tác nhân bên ngoài.
Các thao tác điển hình gây ra sai lệch:
1. Nạp giỏ hàng từ AsyncStorage khi vừa mở app (Hydration): Lần render đầu tiên `qty` nhận giá trị khởi tạo; sau đó `usePersistence` nạp dữ liệu giỏ hàng từ máy và dispatch `hydrateCart`. Khi `item.quantity` trong store thay đổi, nếu thiếu effect đồng bộ thì `qty` cục bộ vẫn giữ giá trị cũ của lần render đầu.
2. Thêm cùng một cuốn sách từ màn hình Chi tiết (`BookDetailScreen`): Cuốn sách đã có trong giỏ với số lượng 1. Người dùng bấm vào xem chi tiết cuốn sách đó và bấm "Thêm vào giỏ" lần nữa. Lúc này số lượng trong Redux store đã tăng lên 2, nhưng khi quay lại màn hình giỏ hàng, ô hiển thị số lượng của sản phẩm đó vẫn hiển thị số 1 do `qty` chưa được đồng bộ lại.
3. Thao tác xóa rồi thêm lại sản phẩm hoặc các thao tác cập nhật giỏ hàng từ các màn hình khác.

Câu 4: Một nguồn state (Single Source of Truth)

- Khi dùng `useState` riêng ở mỗi nơi:
  Mỗi component `HeartButton` (tại màn hình Home, trong danh mục, hay tại màn hình Chi tiết sách) sẽ nắm giữ một vùng nhớ state độc lập. Khi người dùng bấm thả tim một cuốn sách ở màn hình Home, chỉ có icon tim ở trang Home chuyển sang màu đỏ. Khi người dùng nhấn vào xem trang chi tiết cuốn sách đó, nút tim ở trang chi tiết vẫn giữ state riêng là chưa thích (trái tim màu xám). Tương tự, nếu bỏ thích ở trang chi tiết thì khi quay ra màn hình chính, tim ở màn hình chính vẫn đỏ.
- Redux Store giải quyết vấn đề này ra sao:
  Redux đóng vai trò là một nguồn chân lý duy nhất (Single Source of Truth) quản lý mảng `ids` các cuốn sách yêu thích. Tất cả các nút `HeartButton` ở mọi màn hình đều kết nối vào Redux thông qua custom hook `useWishlist()`. Khi có sự kiện `toggle(bookId)`, Redux store cập nhật mảng `ids`, từ đó kích hoạt cập nhật đồng thời cho mọi component đang hiển thị cuốn sách đó. Nhờ vậy, trạng thái trái tim luôn được đồng bộ tức thì và nhất quán 100% trên toàn ứng dụng.


Đoạn code đã triển khai tại `src/screens/LoginScreen.tsx`:

```tsx
// 1. State quản lý trạng thái ẩn/hiện mật khẩu
const [showPassword, setShowPassword] = useState(false);

// 2. Giao diện JSX: bọc FormField trong View relative và đặt nút bấm con mắt bên phải ô nhập
<View style={styles.passwordContainer}>
  <FormField
    label="Mật khẩu"
    value={password}
    onChangeText={setPassword}
    error={errors.password}
    secureTextEntry={!showPassword} // khi showPassword = false thì che mật khẩu
    style={{ paddingRight: 40 }}
  />
  <Pressable
    style={styles.eyeBtn}
    onPress={() => setShowPassword((prev) => !prev)}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    hitSlop={6}
  >
    <Text style={styles.eyeText}>{showPassword ? "🙈" : "👁"}</Text>
  </Pressable>
</View>

// 3. Khai báo StyleSheet
const styles = StyleSheet.create({
  // ...
  passwordContainer: { position: "relative" },
  eyeBtn: { position: "absolute", right: 12, top: 34, padding: 4 },
  eyeText: { fontSize: 18 },
  // ...
});
```

- Nguyên lý hoạt động:
- Mặc định `showPassword` là `false`, do đó `secureTextEntry={!showPassword}` có giá trị `true` giúp che ký tự mật khẩu thành các dấu tròn bảo mật, và biểu tượng hiển thị là con mắt `👁`.
- Khi người dùng nhấn vào nút con mắt, state `showPassword` được đảo ngược thành `true`, lúc này `secureTextEntry` trở thành `false` giúp hiển thị rõ mật khẩu để người dùng dễ kiểm tra lỗi gõ phím, đồng thời icon chuyển sang `🙈`.
