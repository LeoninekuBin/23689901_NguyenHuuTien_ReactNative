type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export async function exer22(): Promise<Todo[]> {
    const ids = [1, 2, 3]; 

    const result = await Promise.all( // thực hiện call nhiều API cùng lúc
        ids.map(async (id) => { // tạo một API với mỗi id trong mảng
            const response = await fetch( // gửi request đến API
                `https://jsonplaceholder.typicode.com/todos/${id}`
            );

            return await response.json() as Todo; // chuyển response thành Todo
        })
    );

    return result; 
}