var a = 10;
var b = 20;
 
function addNum(a,b) {
    const add = a + b;
    return add;
}

const result = addNum(a,b);
console.log(result);


// console.log(c); // Reference Error Since it is not created no memory is allocated

// console.log(d);
// let d = 10;

function closure() {
    let i = 10;
    console.log("Start");
    setTimeout(function() {
        console.log("Inside setTimeout");
        console.log("Value of i : ",i);
    }, 4000);
    console.log("End");
}
closure();

let time = 0;
let times;

function Time() {
    setInterval(function () {
            
            time = time + 1;
            console.log("Value of I : ", time);
            times = time * 1000;
            if(time > 5) { 
                clearInterval(Time);
            }
    }, times);
}

Time();