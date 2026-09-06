import { simulateTask } from "./Ex05";

export async function exer12(): Promise<string> {
    const result = await simulateTask(2000); // gọi hàm từ bài 5 và truyền dữ liệu 2000 vào

    return result; // trả về kết quả sau khi hoàn thành
}