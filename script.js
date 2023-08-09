// buttons
const btnClear = document.querySelector('#btn-clear');
const btnDelete = document.querySelector('#btn-delete');
const btnDigit = document.querySelectorAll('.digit');
const btnOps = document.querySelectorAll('.operand');
const btnEq = document.querySelector('#btn-equ');
const btnDec = document.querySelector('#btn-dec');

// divs
const screen = document.querySelector('.screen-current');

// variables
const inf = Number.NEGATIVE_INFINITY;
let leftOperand = inf;
let rightOperand = inf;
let operator = '';

// bind 
btnDigit.forEach((btn) => {
    btn.addEventListener('click', () => updateOperands(btn));
});

btnOps.forEach((btn) => {
    btn.addEventListener('click', () => updateOperator(btn));
})

btnEq.addEventListener('click', () => solve());

btnClear.addEventListener('click', () => clearScreen());

btnDelete.addEventListener('click', () => deleteOp());

function solve() {
    if (leftOperand == inf|| rightOperand == inf || operator.length == 0) {
        return;
    }

    if (rightOperand == 0 && operator == '/') {
        updateScreen('DIVIDE BY 0')
        return;
    }
    
    let res = operate(operator, leftOperand, rightOperand);
    updateScreen(res);

    leftOperand = res;
    rightOperand = inf;
    operator = '';
    }

function reset() {
    leftOperand = inf;
    rightOperand = inf;
    operator = '';
}

function clearScreen() {
    reset();
    updateScreen(0);
}

function deleteOp() {
    if (typeof Number(screen.textContent) == 'number') {
        screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);

        if (rightOperand == inf) {
            leftOperand = Number(screen.textContent);
        } else {
            rightOperand = Number(screen.textContent);
        }
    }
}


function updateOperator(btn) {
    if (leftOperand == inf) return;
    operator = btn.textContent;
    updateScreen(operator);
}

function updateOperands(btn) {
    let btnVal = Number(btn.textContent);

    // overflow
    if (leftOperand > 99999999 || rightOperand > 99999999) {
        reset();
        updateScreen("OVERFLOW");
        return;
    }

    // left operator 
    if (operator.length == 0) {
        if (leftOperand != inf) {
            leftOperand = appendNumber(leftOperand, btnVal);
        } else {
            leftOperand = btnVal;
        }
        updateScreen(leftOperand);
    } else {    // right operator
        if (rightOperand != inf) {
            rightOperand = appendNumber(rightOperand, btnVal);
        } else {
            rightOperand = btnVal;
        }
        updateScreen(rightOperand)
    }
}

function appendNumber(prev, curr) {
    return (prev * 10) + curr;
}

function deleteNumber(num) {
    let res = num % 10;
    num = Math.floor(num / 10);
    return num + res;
}

function updateScreen(value) {
    screen.textContent = value;
}

// basic operators
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.floor(a / b);
}

function operate(op, a, b) {
    if (op == '+') return add(a,b);
    else if (op == '-') return subtract(a, b);
    else if (op == '*') return multiply(a, b);
    return divide(a, b);
}

