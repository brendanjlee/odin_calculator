def calculatorRunner():
    stack = []
    operators = ['+', '-', '/', '*']

    while (True):
        op = input('Enter Value: ')
        
        if (op == 'p'):
            print(stack)
            continue
        if (op == 'c'):
            stack = []
            continue

        op = op.strip()

        # is number
        if op.isdigit():
            # convert to number
            op = float(op)

            # add to stack if empty
            if not stack: 
                stack.append(op)
                continue

            top = stack[-1]
            
            # top of stack is an operator -> 
            # calculate value and add back into stack
            if top in operators:
                operator = stack.pop()
                b = stack.pop()
                res = calculate(op, b, operator)
                print(res)
                stack.append(res)
            else:
                print('not a valid operation')

        # operator
        else:
            # stack must not be empty
            if not stack:
                print('stack empty. enter a number')
                continue
            
            # check for valid operator
            if op not in operators:
                print('not a valid operator. enter a valid operator')
                continue

            top = stack[-1]
            
            # top of stack is a number
            if isinstance(top, int) or isinstance(top, float):
                stack.append(op)
            else:
                print('not a valid operation')

def calculate(a, b, operand):
    if operand == '+':
        res =  a + b
    elif operand == '-':
        res = b - a
    elif operand == '*':
        res = a * b
    else:
        res = b / a
    return round(res, 2)

calculatorRunner()