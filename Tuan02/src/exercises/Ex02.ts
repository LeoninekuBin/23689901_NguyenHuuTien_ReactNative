export function exer02(): Promise<number> {
    const promise = new Promise<number>((resolve) => { // tạo một promise trả về kiểu number
        setTimeout(() => { // set thời gian thực hiện
            resolve(10); // trả về số 10 theo yêu cầu
        }, 1000); // thời gian chờ là 1 giây
    });

    return promise; 
}