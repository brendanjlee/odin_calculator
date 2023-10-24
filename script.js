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

    // returns value added if success
    // returns -1 if not 
    const addDigit = (input) => {
        // push if stack empty
        if (stack.length == 0) {
            stack.push(input);
            return input;
        }
        
        // push if top is op
        let top = stack[stack.length - 1];
        if (operators.includes(top)) {
            stack.push(input);
            return input;
        }

        // return -1 if stack already has a number
        return -1;
    }

    const addOperator = (input) => {
        // don't add if stack is empty
        if (stack.length == 0) return -1;

        // don't add if stack contains operator
        if (isNaN(stack[stack.length - 1])) return -1;

        stack.push(input);

        return input;
    }

    const solve = () => {
        // not enough values in stack
        if (stack.length < 3) return null;
        
        // top must be a number
        if (isNaN(stack[stack.length - 1])) return null;

        let a = stack.pop();
        let operator = stack.pop();
        let b = stack.pop();
        let res = calculate(a, b, operator);
        stack.push(res);
        return res;
    }

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
        clearStack,
        addDigit,
        addOperator,
        solve
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

        // if operator, just add
        if (isNaN(Number(screenVal))) {
            updateScreen(btnVal);
            return;
        }
        
        screenVal = Number(screenVal);
        let newVal = (screenVal * 10) + btnVal;
        
        // displayer overflow for big values
        if (newVal >= maxValue) newVal = overflow;

        // add the number
        updateScreen(newVal);
    };

    const decimalBtnHandler = () => {
        let screenVal = screenContentDiv.textContent;

        // check for number
        if (isNaN(Number(screenVal))) return;

        // check for decimals already present
        if (screenVal.includes('.')) return;

        // TODO: add logic for decimal
    }

    const operatorBtnHanlder = (btn) => {
        let btnVal = btn.textContent;
        let screenVal = screenContentDiv.textContent;
        // if number exist, add to stack. Else skip
        if (screenVal === overflow) return;
        if (isNaN(Number(screenVal))) return;
        if (typeof Number(screenVal) === 'number') {

            screenVal = Number(screenVal);
            // TODO: handle div by 0
            
            // add current number to stack
            calculator.addDigit(screenVal);
            console.log(calculator.addOperator(btnVal));
            console.log(calculator.getStack());
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

    const equalsBtnHanlder = () => {
        // add current value into stack if number and not NaN
        let screenVal = Number(screenContentDiv.textContent);
        if (!isNaN(screenVal) && screenVal != NaN) calculator.addDigit(screenVal);

        let res = calculator.solve();
        if (res == null) return;
        updateScreen(res);
    }

    // TODO: allow for keyboard input

    // bind buttons
    btnDigit.forEach((btn) => {
        btn.addEventListener('click', () => numberBtnHandler(btn));
    });
    btnOperator.forEach((btn) => {
        btn.addEventListener('click', () => operatorBtnHanlder(btn));
    })
    btnDelete.addEventListener('click', () => deleteBtnHandler());
    btnClear.addEventListener('click', () => clearBtnHanlder());
    btnEq.addEventListener('click', () => equalsBtnHanlder());
    btnDec.addEventListener('click', () => decimalBtnHandler());

    window.addEventListener('keydown', (e) => {
        const key = document.querySelector(`button[data-key="${e.key}"]`);
        if (!key) return;

        // delete
        if (key.id === 'btn-delete') {
            deleteBtnHandler();
            return;
        }

        // clear
        if (key.id === 'btn-clear') {
            clearBtnHanlder();
            return;
        }

        // equals button
        if (key.id === 'btn-equ') {
            equalsBtnHanlder();
            return;
        }
        
        // operators and digits
        if (key.classList[1] === 'digit') numberBtnHandler(key);
        if (key.classList[1] === 'operand') operatorBtnHanlder(key);
    })

    return {updateScreen}
}

ScreenController();
