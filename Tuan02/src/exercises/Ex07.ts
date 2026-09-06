export function exer07(): Promise<string> {
    const task1 = new Promise<string>((resolve) => { 
        setTimeout(() => resolve("Task 1 done"), 1000); // set thời gian 1 giây
    });

    const task2 = new Promise<string>((resolve) => { 
        setTimeout(() => resolve("Task 2 done"), 2000); // set thời gian 2 giây
    });

    return Promise.race([task1, task2]); // trả về promise hoàn thành đầu tiên
}