export function exer06(): Promise<string[]> {
    const task1 = new Promise<string>((resolve) => { // tạo task trả về chuỗi 
        setTimeout(() => resolve("Task 1 done"), 1000); //set thời gian trả về
    });

    const task2 = new Promise<string>((resolve) => { // tạo task trả về chuỗi 
        setTimeout(() => resolve("Task 2 done"), 2000); 
    });

    const task3 = new Promise<string>((resolve) => { // tạo task trả về chuỗi 
        setTimeout(() => resolve("Task 3 done"), 3000); 
    });

    return Promise.all([task1, task2, task3]); // chạy 3 promise cùng lúc 
}