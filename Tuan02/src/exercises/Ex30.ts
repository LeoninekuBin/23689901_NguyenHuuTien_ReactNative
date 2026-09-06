type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export async function exer30(): Promise<string[]> {
    const requests = [ // tạo danh sách API
        fetch("https://jsonplaceholder.typicode.com/todos/1"), 
        fetch("https://jsonplaceholder.typicode.com/todos/2"), 
        fetch("https://invalid-url.example.com"), // API fail
    ];

    const results = await Promise.allSettled(requests); // chờ tất cả promise hoàn thành 

    const status = results.map((result) => { // duyệt qua kết quả của từng prommise
        if (result.status === "fulfilled") { // check xem có fail hay không
            return "Success"; 
        }

        return "Failed"; 
    });

    return status; 
}