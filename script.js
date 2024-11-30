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
        return "error";
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

// calculator();
function updateDisplay(num){
    display.textContent = `${num}`;
}

function buildExpression(char,type){
    if(type === `numbers` && !isNum2){
        num1+=char;
        updateDisplay(num1);
    }
    else if(type === `numbers` && isNum2){
        num2+=char;
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
        if(char === "clear"){
            num1 = "";
            num2 = "";
            operand = "";
            isNum2 = false;
            lastNum = "";
            updateDisplay("");
        }
        else if (char === "="){
            if(num2 === "") return; 
            lastNum = operation(num1,num2,operand);
            updateDisplay(lastNum);
            num1 = lastNum;
            lastNum = "";
            num2 = "";
            // remain true
            isNum2 = true;
        }
        else{
            lastNum = operation(num1,num2,operand);
            updateDisplay(lastNum);
            num1 = lastNum;
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