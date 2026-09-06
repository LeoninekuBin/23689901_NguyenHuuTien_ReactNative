type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

export async function exer24(): Promise<Post> {
    const response = await fetch( // gửi request POST đến API
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST", //method để là post
            headers: {
                "Content-Type": "application/json", // dữ liệu gửi đi là JSON
            },
            body: JSON.stringify({ // chuyển object thành chuỗi JSON
                title: "Expo",
                body: "Learning Async",
                userId: 1,
            }),
        }
    );

    const data: Post = await response.json(); // chuyển response JSON thành object

    return data; 
}
