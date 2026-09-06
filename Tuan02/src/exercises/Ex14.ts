export async function exer14(number: number): Promise<number> {
    await new Promise<void>((resolve) => {  // tạo promise để giả lập chờ
        setTimeout(() => {
            resolve(); 
        }, 1000); 
    });

    return number * 3; // trả về giá trị truyền vào nhân 3 sau khi đợi 1 giây 
}