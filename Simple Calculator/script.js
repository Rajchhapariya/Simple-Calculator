let currentInput = '';
let previousInput = '';
let operator = '';
let awaitingNextNumber = false;

const display = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

function handleButtonClick(value) {
    if (awaitingNextNumber && isNumber(value)) {
        currentInput = value;
        awaitingNextNumber = false;
    } else if (isNumber(value)) {
        currentInput += value;
    } else if (isOperator(value)) {
        if (currentInput !== '') {
            if (previousInput === '') {
                previousInput = currentInput;
                operator = value;
                currentInput = '';
            } else {
                calculate();
                operator = value;
            }
        }
        awaitingNextNumber = true;
    } else if (value === '=') {
        calculate();
    } else if (value === 'C') {
        clear();
    } else if (value === '%') {
        calculatePercentage();
    } else if (value === '^') {
        setExponent();
    }

    updateDisplay();
}

function isNumber(value) {
    return !isNaN(value) || value === '.';
}

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/' || value === '%' || value === '^';
}

function updateDisplay() {
    display.textContent = currentInput;
}

function calculate() {
    if (currentInput === '' || previousInput === '') {
        return;
    }

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            currentInput = (num1 / num2).toString();
            break;
        case '%':
            currentInput = (num1 % num2).toString();
            break;
        case '^':
            currentInput = Math.pow(num1, num2).toString();
            break;
    }

    previousInput = '';
    operator = '';
}

function calculatePercentage() {
    if (currentInput !== '') {
        const num = parseFloat(currentInput);
        currentInput = (num / 100).toString();
    }
}

function setExponent() {
    if (currentInput !== '') {
        previousInput = currentInput;
        operator = '^';
        currentInput = '';
    }
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
}
