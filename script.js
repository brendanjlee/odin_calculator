// buttons
const btnClear = document.querySelector('#btn-clear');
const btnDelete = document.querySelector('#btn-delete');
const opBtns = document.querySelectorAll('.btn-ops');

// divs
const screen = document.querySelector('.screen-current');

opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let btnVal = btn.innerHTML;
        screen.innerHTML = btnVal
    });
});

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

function operatore(op, a, b) {
    if (op == '+') return add(a,b);
    else if (op == '-') return subtract(a, b);
    else if (op == '*') return multiply(a, b);

    // divide by 0 return int max
    if (b == 0) return Number.MAX_SAFE_INTEGER;
    return divide(a, b);
}

