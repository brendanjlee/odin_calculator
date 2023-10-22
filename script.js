function CalculatorController() {
    const stack = [];
    const operators = ['+', '-', '*', '/'];

    const calculate = (a, b, op) => {
        let res;
        if (op === '+') res = a + b;
        else if (op == '-') res = b - a;
        else if (op == '*') res = a * b;
        else res = b /a;

        return parseFloat(res.toFixed(4));
    }

    const getStack = () => stack;

    const clearStack = () => stack.length = 0;

    const runner = (input) => {
        let op = input;
        console.log(stack);

        // op is a number
        if (!isNaN(op)) {
            // convert to a float
            op = parseFloat(op);

            // add to stack if not empty
            if (stack.length == 0) {
                stack.push(op);
                return;
            }

            let top = stack[stack.length - 1];

            // top of stack is an operator
            if (operators.includes(top)) {
                let operator = stack.pop();
                let b = stack.pop();
                let res = calculate(op, b, operator);
                console.log(res);
                stack.push(res);
            } else {
                console.log('not a valid operation');
            }

        }
        // operator
        else {
            if (stack.length == 0) {
                console.log('stack empty. enter a number');
                return;
            };
            if (!operators.includes(op)) {
                console.log('not a valid operator. enter a valid operator');
                return;
            };

            let top = stack[stack.length - 1];

            // top of stack is a number
            if (!isNaN(top)) stack.push(op);
            else console.log('not a valid operation');
        }
    }

    return {
        runner,
        getStack,
        clearStack
    }
}

function ScreenController() {
    // calculator
    const calculator = CalculatorController();

    // dom elements
    const screenContentDiv = document.querySelector('.screen-content');
    const btnClear = document.querySelector('#btn-clear');
    const btnDelete = document.querySelector('#btn-delete');
    const btnDigit = document.querySelectorAll('.digit');
    const btnOperator = document.querySelectorAll('.operand');
    const btnEq = document.querySelector('#btn-equ');
    const btnDec = document.querySelector('#btn-dec');

    // constants
    const maxValue = 99999999;
    const overflow = "OVERFLOW"

    // updates text on calculator
    const updateScreen = (val) => screenContentDiv.textContent = val;

    // reset text to 0
    const resetScreen = () => updateScreen(0);

    // Handlers
    const numberBtnHandler = (btn) => {
        let btnVal = Number(btn.textContent);
        let screenVal = screenContentDiv.textContent;
        
        // check for overflow
        if (screenVal === overflow) screenVal = 0;
        
        screenVal = Number(screenVal);
        let newVal = (screenVal * 10) + btnVal;
        
        // displayer overflow for big values
        if (newVal >= maxValue) newVal = overflow;

        updateScreen(newVal);
    };

    const operatorBtnHanlder = (btn) => {
        let btnVal = btn.textContent;
        let screenVal = screenContentDiv.textContent;
        // if number exist, add to stack. Else skip
        if (screenVal === overflow) return;
        if (typeof Number(screenVal) === 'number') {
            screenVal = Number(screenVal);

            // skip if previous value is 0 and operator is division
            //if (screenVal == 0 && btnVal === '/') return;
            
            updateScreen(btnVal);   
        }
    }

    const clearBtnHanlder = () => {
        resetScreen(0);
        calculator.clearStack();
    }

    const deleteBtnHandler = () => {
        let screenVal = screenContentDiv.textContent;
        if (screenVal === overflow) return;
        
        // display 0 if empty or already 0
        if (screenVal.length == 0 || screenVal == "0") {
            screenContentDiv.textContent = 0;
            return;
        }
        if (typeof Number(screenVal) === 'number') {
            let newVal = screenVal.substring(0, screenVal.length - 1);
            if (newVal.length == 0) {
                newVal = 0;
            }
            screenContentDiv.textContent = newVal;
        }
    }

    // bind buttons
    btnDigit.forEach((btn) => {
        btn.addEventListener('click', () => numberBtnHandler(btn));
    });
    btnOperator.forEach((btn) => {
        btn.addEventListener('click', () => operatorBtnHanlder(btn));
    })
    btnDelete.addEventListener('click', () => deleteBtnHandler());
    btnClear.addEventListener('click', () => clearBtnHanlder());

    return {updateScreen}
}

ScreenController();
