export async function exer15(): Promise<number[]> {
    const task1 = await Promise.resolve(1000); // chờ task1 hoàn thành
    const task2 = await Promise.resolve(2000); // thực hiện task2
    const task3 = await Promise.resolve(3000); // cuối cùng thực hiện task3

    return [task1, task2, task3]; // trả về kết quả 
}