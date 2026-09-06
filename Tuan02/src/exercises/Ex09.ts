export function exer09(): Promise<number[]> {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // tạo mảng số

    const promise = new Promise<number[]>((resolve) => { // tạo promise trả về một mảng số 
        setTimeout(() => { 
            resolve(numbers); // trả về mảng 
        }, 1000); // 1 giây chờ
    });

    return promise.then((numbers) => { // nhận mảng sau khi promise hoàn thành
        return numbers.filter((number) => number % 2 === 0); // lọc giữ lại các số chẵn theo yêu cầu
    });
}