def calculator():
    stack = []
    operators = ['+', '-', '/', '*']

    while (True):
        op = input('Enter Value: ')
        op = op.strip()

        # is number
        if op.isdigit():
            # convert to number
            op = float(op)

            # add to stack if empty
            if not stack: 
                stack.append(op)
                continue
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
            
            top = stack[0]
            
            # top of stack is a number
            if top.isnumeric():
                stack.append(op)
            else:
                print('not a valid operation')

