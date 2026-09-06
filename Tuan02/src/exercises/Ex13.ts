export async function exer13(): Promise<string> {
    try {
        const promise = new Promise<string>((resolve, reject) => { 
            setTimeout(() => {
                reject(new Error("Something went wrong")); // tạo lỗi cho promise
            }, 1000);
        });

        await promise; // chờ promise hoàn thành
        return "Success"; // trả về success nếu thành công
    } catch (error) {
        return "Error: Something went wrong"; // bắt và xử lý lỗi nếu fail
    }
}