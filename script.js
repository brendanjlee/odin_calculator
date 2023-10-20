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

    const runner = (input) => {
        let op = input;
        if (op === 'p') {
            console.log(stack);
            return;
        }
        if (op == 'c') {
            stack.length = 0;
            return;
        }

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
}

//CalculatorController();

// while (true) {
//     let op = prompt('Enter Value');
//     op = op.trim();
//     CalculatorController.runner(op);
// }
