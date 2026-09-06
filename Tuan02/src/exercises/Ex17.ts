export async function exer17(): Promise<number[]> {
    const promises = [ // tạo một mảng các promise
        Promise.resolve(10),
        Promise.resolve(20),
        Promise.resolve(30),
    ];

    const result: number[] = []; // tạo mảng để lưu kết quả

    for await (const value of promises) { // lần lượt chờ từng promise trong mảng
        result.push(value); // thêm kết quả vào mảng
    }

    return result; // trả về mảng kết quả
}