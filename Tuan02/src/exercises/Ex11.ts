export async function exer11(): Promise<string> {
    const promise = new Promise<string>((resolve) => { 
        setTimeout(() => {
            resolve("Hello Async"); 
        }, 2000);
    });

    const result = await promise; // chờ promise hoàn thành rồi mới lấy kết quả

    return result; 
}