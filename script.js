console.log("script.js loaded");
let display =  document.querySelector("#display");

let num1 = "";
let num2 = "";
let lastNum= "";
let operand = "";
let isNum2 = false;

function add(a,b){
    return parseFloat(a)+parseFloat(b);
}

function subtract(a,b){
    return parseFloat(a)-parseFloat(b);
}

function multiply(a,b){
    return parseFloat(a)*parseFloat(b);
}

function divide(a,b){
    if (b == "0"){
        console.log(`division by 0`);
        updateDisplay("error");
        return 0;
    }
    return parseFloat(a)/parseFloat(b);
}


function operation(a,b,op){
    if(op === "+") return add(a,b);
    if(op === "-") return subtract(a,b);
    if(op === "*" || op === "x" || op === "X") return multiply(a,b);
    if(op === "/") return divide(a,b);
}

function calculator(){
    let a = 0; let b = 0; let op = "";
    console.log("input number");
    a = Number(prompt("num1"));
    op = String(prompt("operand"));
    b = Number(prompt("num2")); 
    console.log(a);
    console.log(b);
    console.log(op);

    console.log(operation(a,b,op));
}

function decimalCheck(){
    if(num1.at(0) === ".") num1 = "0.";
    if(num2.at(0) === ".") num2 = "0.";

    if(num1.indexOf('.') != num1.lastIndexOf('.')&&num1.length>0){
        num1 = num1.slice(0,num1.length-1);
        }
    console.log(num1);

    if(num2.indexOf('.') != num2.lastIndexOf('.')&&num2.length>0){
        num2 = num2.slice(0,num2.length-1);
    }
    console.log(num2);
}

// calculator();
function updateDisplay(num){
    display.textContent = `${num}`;
}

function buildExpression(char,type){
    if(char === "clear"){
        num1 = "";
        num2 = "";
        operand = "";
        isNum2 = false;
        lastNum = "";
        updateDisplay("0");
    }

    else if(char === "negate" && !isNum2){
        if(num1.at(0) != '-'){
            num1 = '-' + num1;
        }
        else{
            num1 = num1.slice(1,num1.length);
        }
        console.log("HELLO!");
        updateDisplay(num1);
    }

    else if(char === "negate" && isNum2){
        if(num2.at(0) != '-'){
            num2 = '-' + num2;
        }
        else{
            num2 = num2.slice(1,num2.length);
        }
        console.log("HELLO!");
        updateDisplay(num2);
    }

    else if(type === `numbers` && !isNum2){
        num1+=char;
        decimalCheck();
        updateDisplay(num1);
    }
    else if(type === `numbers` && isNum2){
        num2+=char;
        decimalCheck();
        updateDisplay(num2);
    }
    else if(type === "operands" && !isNum2){
        if(char === "=") return;
        if(num1 === "") num1 = "0";
        isNum2 = true;
        operand = char;
        updateDisplay(operand);
    }
    else if(type === "operands" && isNum2){
        if(num2 === "" && char != "="){
            operand = char;
            updateDisplay(operand);
            console.log(`num1: ${num1} num2: ${num2} operand: ${operand} isNum2: ${isNum2} result: ${lastNum}`);
            return;
        }
        // clear case
        else if (char === "="){
            if(num2 === "") return; 
            lastNum = operation(num1,num2,operand);
            updateDisplay(lastNum);
            num1 = lastNum.toString();
            lastNum = "";
            num2 = "";
            // remain true
            isNum2 = false;
        }
        else{
            lastNum = operation(num1,num2,operand);
            updateDisplay(lastNum);
            num1 = lastNum.toString();
            lastNum = "";
            num2 = "";
            operand = char;
            // remain true
            isNum2 = true;
        }
    }
    console.log(`num1: ${num1} num2: ${num2} operand: ${operand} isNum2: ${isNum2} result: ${lastNum}`);
}

// get input from buttons

const buttons = document.getElementById("buttons");
buttons.addEventListener('click',(e)=>{
    const isButton = e.target.matches('.button');
    if(isButton){
        const buttonType = e.target.parentElement.id;
        if(buttonType === "numbers"){
            // console.log(`button number ${e.target.id}`);
            buildExpression(e.target.id, buttonType);
        }
        if(buttonType === "operands"){
            // console.log(`button operand ${e.target.id}`);
            buildExpression(e.target.id,buttonType);
        }
    }
})