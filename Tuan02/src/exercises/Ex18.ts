type User = {
    id: number;
    name: string;
};

export function fetchUser(id: number): Promise<User> { // tạo hàm nhận id và trả về promise user
    const promise = new Promise<User>((resolve) => { // giả lập call API
        setTimeout(() => {
            resolve({
                id: id, // trả về id được truyền vào
                name: `User ${id}`, // tạo tên user dựa trên id
            });
        }, 1000); // giả lập API trả kết quả sau 1 giây
    });

    return promise;
}

