type User = {
    id: number;
    name: string;
};

async function fetchUser(id: number): Promise<User> {
    await new Promise<void>((resolve) => { 
        setTimeout(() => {
            resolve(); 
        }, 3000); // giả lập call API mất 3 giây
    });

    return {
        id: id,
        name: `User ${id}`,
    };
}

export async function exer20(id: number): Promise<User | string> {
    const apiCall = fetchUser(id); // bắt đầu gọi API

    const timeout = new Promise<string>((resolve) => { // promise check timeout
        setTimeout(() => {
            resolve("API call timeout"); // thông báo lỗi nếu quá thời gian
        }, 2000); // giới hạn thời gian là 2 giây
    });

    return Promise.race([apiCall, timeout]); // lấy kết quả promise hoàn thành trước để giả lập theo yêu cầu đề
}