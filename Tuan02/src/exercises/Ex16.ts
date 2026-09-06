export async function exer16(): Promise<number[]> {
    const task = await Promise.all([ // chạy nhiều promise song song
        Promise.resolve(1000), 
        Promise.resolve(2000), 
        Promise.resolve(3000), 
    ]);

    return task; // trả về toàn bộ kết quả
}