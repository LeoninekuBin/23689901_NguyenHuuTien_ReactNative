type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export async function exer23(): Promise<Todo[]> {
    const response = await fetch( 
        "https://jsonplaceholder.typicode.com/todos"
    );

    const todos: Todo[] = await response.json(); // chuyển dữ liệu JSON thành mảng Todo

    return todos.filter((todo) => todo.completed); // chỉ giữ lại các todo completed
}