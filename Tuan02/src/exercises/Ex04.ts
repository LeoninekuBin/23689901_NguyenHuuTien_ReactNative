export function exer04(): Promise<number> {
    const promise = new Promise<number>((resolve) => { // tạo promise trả về kiểu số
        resolve(Math.random()); // trả về số ngẫu nhiên
    });

    return promise; 
}