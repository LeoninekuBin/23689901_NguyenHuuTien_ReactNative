export async function queueProcess(): Promise<string[]> {
    const tasks = [1, 2, 3, 4, 5]; 
    const result: string[] = []; // tạo mảng lưu kết quả

    for (const task of tasks) { // duyệt từng task theo thứ tự
        const value = await new Promise<string>((resolve) => { // chờ task hiện tại hoàn thành
            setTimeout(() => {
                resolve(`Task ${task} done`); // trả về kết quả của task
            }, 1000);
        });

        result.push(value); // pusk kết quả vào mảng
    }

    return result; 
}