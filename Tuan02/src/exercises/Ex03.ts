export function exer03(): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => { // tạo promise có thể hoàn thành hoặc bị từ chối
        setTimeout(() => { 
            reject(new Error("Something went wrong")); // trả về lỗi
        }, 1000); 
    });

    return promise; 
}