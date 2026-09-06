export function simulateTask(time: number): Promise<string> {
    const promise = new Promise<string>((resolve) => { // tạo promise trả về kiểu string
        setTimeout(() => { 
            resolve("Task done"); // trả về chuỗi theo yêu cầu
        }, time); // thời gian chờ được truyền vào thông qua tham số time
    });

    return promise;
}