export async function exer26(): Promise<string> {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve(); 
        }, 5000); 
    });

    return "5-second wait"; // trả về thông báo sau khi chờ đủ 5 giây
}