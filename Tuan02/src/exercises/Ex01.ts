export function exer01(): Promise<string> {
    const promise = new Promise<string>((resolve) => {  //tạo một promise trả về kiểu String
        setTimeout(() => { // set thời gian thực hiện
            resolve("Hello Async"); //trả về chuỗi "Hello Async"
        }, 2000); // set thời gian là 2 giây nếu muốn 3 giây thì 3000
    });

    return promise; 
}