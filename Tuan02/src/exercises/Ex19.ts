import { fetchUser } from "./Ex18";


type User = {
    id: number;
    name: string;
};

export async function fetchUsers(ids: number[]): Promise<User[]> { // tạo hàm nhận một mảng id
    const users = await Promise.all( // chờ tất cả user được lấy về
        ids.map((id) => fetchUser(id)) // gọi hàm fetchUser của bài 18 cho từng id
    );

    return users;
}

