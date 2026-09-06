export function dodownloadFile(): Promise<string> {
    const promise = new Promise<string>((resolve) => { // promise giả lập việc tải file
        setTimeout(() => { 
            resolve("Download completed"); // trả về thông báo khi tải xong
        }, 3000); // giả lập thời gian download là 3 giây
    });

    return promise; 
}