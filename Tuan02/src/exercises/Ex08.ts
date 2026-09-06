export function exer08(): Promise<number> {
    return Promise.resolve(2) // tạo promise với giá trị 2
        .then((number) => number * number) // bình phương
        .then((number) => number * 2) // nhân 2
        .then((number) => number + 5); // cộng thêm 5 và trả về kết quả cuối cùng
}