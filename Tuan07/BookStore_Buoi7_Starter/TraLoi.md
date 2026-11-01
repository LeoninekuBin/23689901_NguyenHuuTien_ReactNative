1. Cấu trúc điều hướng

BookDetail được đặt ở Stack bên ngoài Tab nên khi mở chi tiết sách, màn hình này sẽ hiển thị đè lên phần Tab Bar. Khi muốn quay lại thì chỉ cần bấm nút mũi tên ← ở góc trên.

Nếu đặt BookDetail trong Tab thì nó sẽ trở thành một tab riêng, thanh Tab Bar vẫn còn và phải thêm một nút tab cho màn hình chi tiết. Cách này không hợp lý lắm vì màn hình chi tiết thường chỉ cần mở từ danh sách sách rồi quay lại.

2. Redux

Trong Redux Toolkit có sử dụng Immer nên khi viết reducer có thể thao tác với state giống như đang sửa trực tiếp, ví dụ như state.push(). Nhưng thực tế Immer sẽ xử lý phía sau để tạo ra state mới, chứ không làm thay đổi state gốc.

Còn useMemo trong useCart chủ yếu để tối ưu hiệu năng. Nếu bỏ nó thì chương trình vẫn chạy bình thường, nhưng mỗi lần component render thì tổng số lượng và tổng tiền lại được tính lại, kể cả khi danh sách sản phẩm trong giỏ không thay đổi.

3. Promise.all

Ví dụ khi tải dữ liệu, nếu getCategories() bị lỗi nhưng getBooks() vẫn thành công thì Promise.all vẫn báo lỗi cho cả nhóm. Vì vậy màn hình Home có thể chỉ hiển thị ErrorView mà không hiện được danh sách sách.

Nếu đổi sang Promise.allSettled thì có thể kiểm tra riêng kết quả của từng API. Như vậy, dù danh mục bị lỗi thì sách vẫn có thể hiển thị bình thường. Tuy nhiên, cách này phải xử lý thêm từng trường hợp lỗi và dữ liệu tải không đầy đủ.

4. Debounce

Nếu đặt setTimeout trực tiếp trong onChangeText thì mỗi lần gõ một ký tự sẽ tạo ra một timer mới. Những timer cũ vẫn chạy nên có thể khiến chương trình lọc dữ liệu nhiều lần.

Với useEffect và clearTimeout, mỗi khi người dùng nhập thêm ký tự thì timer trước đó sẽ bị hủy và tạo timer mới. Khi ngừng nhập đủ thời gian quy định thì chương trình mới thực hiện lọc. Nhờ vậy tránh phải lọc liên tục khi người dùng đang gõ.

5. Code bổ sung – Sắp xếp giá sách

Bổ sung thêm một state sort để lưu kiểu sắp xếp. Sau đó chỉnh lại visibleBooks để kết hợp cả lọc sách và sắp xếp giá.
const [sort, setSort] = useState<"asc" | "desc" | null>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, {
    keyword: debouncedKeyword,
    categoryId,
    priceRange
  });

  if (sort === null) return filtered;

  return [...filtered].sort((a, b) =>
    sort === "asc"
      ? a.price - b.price
      : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sort]);