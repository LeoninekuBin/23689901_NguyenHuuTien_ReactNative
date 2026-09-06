type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export async function exer21(): Promise<Todo> {
    const response = await fetch( // gửi request GET đến API
        "https://jsonplaceholder.typicode.com/todos/1"
    );

    const data: Todo = await response.json(); // chuyển dữ liệu JSON thành object

    return data; 
}