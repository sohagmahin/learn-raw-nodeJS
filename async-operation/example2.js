const promise1 = Promise.resolve('promise 1 resolved');
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise 2 resolved');
    }, 2000);
});

Promise.race([promise1, promise2]).then((res) => console.log(res));
Promise.all([promise1, promise2]).then((res) => console.log(res));
