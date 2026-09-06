export async function batchProcess(): Promise<string[]> {
    const tasks = [1, 2, 3, 4, 5].map((number) => {  // tạo 5 task bất đồng bộ
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(`Task ${number} done`); // hoàn thành từng task
            }, 1000);
        });
    });

    const result = await Promise.all(tasks); // xử lý 5 task cùng lúc

    return result; 
}