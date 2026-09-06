export function exer10(): Promise<string> {
    const promise = new Promise<string>((resolve) => { 
        setTimeout(() => {
            resolve("Task completed"); 
        }, 1000); 
    });

    return promise
        .then((result) => result) // nhận kết quả khi promise thành công
        .catch(() => "Task failed") // catch lỗi nếu promise fail
        .finally(() => console.log("Done ex10")); // console log Done sau khi promise kết thúc
}