type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export async function fetchWithRetry(
    url: string,
    retries: number
): Promise<Todo> {
    for (let attempt = 0; attempt <= retries; attempt++) { // gọi API và retry nếu fail
        try {
            const response = await fetch(url); // gửi request đến API

            if (!response.ok) { // kiểm tra request có tồn tại hay không
                throw new Error("Request failed"); // tạo lỗi nếu fail
            }

            return await response.json() as Todo; // trả về dữ liệu nếu request thành công
        } catch (error) {
            if (attempt === retries) { // check đã dùng hết số lần retry chưa
                throw error; // nếu hết thì trả lỗi 
            }
        }
    }

    throw new Error("Request failed"); 
}
