// Use js visualizer for better understanding https://www.jsv9000.app/

// Program-1 :

console.log("Script");
setTimeout(() => { console.log("1") }, 0);
Promise.resolve().then(() => { console.log("2") });
console.log("End");

// Synchronous task will run first so script and end will be printed in the console first
// The Anonymous function setTimeout will be moved to the task queue (callback function)
// Then the Anonymous function Promise will run next as it is given more priority than the task queue
// Followed by that the setTimeout runs next to that
// Irrespective of the queue the callbacks will be executed in the FIFO order 


// Program-2 :

console.log("Script");
setTimeout(() => { console.log("1") }, 0);
Promise.resolve().then(() => { console.log("2") }).then(() => { console.log("3") }).then(() => { console.log("4")});
console.log("End");


// Program-3 :

console.log("Begins");
setTimeout(() => {
    console.log("setTimeout 1");
    Promise.resolve().then(() => {
        console.log("Promise 1");
    })
}, 0);

/* As the micro task was present inside the macro task queue so the scope of the task get changed 
so that it will not be added to the main call stack initially as it was inside the macro task queue
Firstly the setTimeout gets executed after that the promise is getting resolved by adding it to the 
microtask queue */

new Promise(function (resolve, reject){
    console.log("Promise 2");
    setTimeout(() => {
        console.log("setTimeout 2");
    });
}).then(() => {
    console.log("Then block executed");
})


// Program-4 :

async function async1() {
    console.log("Async1 Start");
    async2().then(() => { 
        console.log("Async1 End");
    })
}

async function async2() {
    console.log("Async2");
}

console.log("Script Start");

setTimeout(function () {
    console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
    console.log("Promise 1");
    resolve();
}).then(function () {
    console.log("Promise 2");
})

console.log("Script End");


// Program-5 : 

console.log("Script Start");

setTimeout(() => {
    console.log("setTimeout 1");
})

new Promise((resolve) => {
    console.log("Promise 1");
    resolve();
}).then(() => {
    console.log("Then 1");
    new Promise((resolve) => {
        console.log("Promise 2");
        resolve();
    }).then(() => {
        console.log("Then 2");
    })
})

console.log("Script End");


// Program-6 :

console.log("Script Start");

new Promise((resolve) => {
    console.log("Promise Start");
    setTimeout(() => {
        console.log("Inside setTimeout");
        resolve();
    }, 0);
}).then(() => {
    console.log("Promise End");
});

console.log("Script End");

// Program-8 : 

console.log("1");
setTimeout(() => { console.log("2")}, 0);
setTimeout(() => { console.log("3")}, 0);

const p = Promise.resolve();
for(let i = 0; i < 2;i++){
    p.then(() => {
        setTimeout(() => {
            console.log("4");
            setTimeout(() => {
                console.log("5");
            }, 0);
            p.then(() => { console.log("6")});
        }, 0);
        console.log("7");
    })
    console.log("8");
}

// Output : 1

console.log(a);
var a = 3;
console.log(a);
function a() {};
console.log(a);

// Output : 2

console.log(a);
var a = 3;
{
    console.log(a);
    var a = 20;
    console.log(a);
}
function a() {
    console.log(a);
    var a = 20;
    console.log(a);
}

a();

console.log(a);