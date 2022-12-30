const displayResult = document.querySelector('#display-result');
const displayPass = document.querySelector('#display-pass')
const inputButtons = document.querySelectorAll('.btn.input');
const inputOperator = document.querySelectorAll('.btn.operator');
const equal = document.querySelector('.value.equal');
const clear = document.querySelector('.value.clear');
const deleteInput = document.querySelector('.btn.del')
const reNum = /\d/;
// const reNegativeOrPositive = /^-?\d*\.{0,1}\d+$/;
// const reDecimal = /^\d+\.\d+$/;
// const reDecimalNegative = /^-\d*\.?\d+$/;
let num1 = '';
let num2 = '';
let operator = '';
let resultValue = '';

// input value 
inputButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const element = e.target;
        const value = element.textContent;
        // num 1
        if (operator === '' && num1 === '' && value === '.') {
            displayResult.textContent = `0${value}`;
            num1 = displayResult.textContent;
        } else if (operator === '' && !num1.includes('.') && !reNum.test(resultValue)) {
            displayResult.textContent = displayResult.textContent.concat(value);
            num1 = displayResult.textContent;
        } else if (operator === '' && displayResult.textContent.length < 11 && value !== '.' && !reNum.test(resultValue)) {
            displayResult.textContent = displayResult.textContent.concat(value);
            num1 = displayResult.textContent;
            // num2
        } else if (num2 === '' && operator !== '' && value === '.' && reNum.test(num1)) {
            displayResult.textContent = ''
            displayResult.textContent = `0${value}`;
            num2 = `0${value}`;
        } else if (operator !== '' && displayResult.textContent.length < 11 && reNum.test(num1)) {
            if (operator !== '' && !num2.includes('0.') && num2 === '') {
                displayResult.textContent = '';
            }
            if (!num2.includes('.')) {
                displayResult.textContent = displayResult.textContent.concat(value);
                num2 = displayResult.textContent;

            } else if (value !== '.') {
                displayResult.textContent = displayResult.textContent.concat(value);
                num2 = displayResult.textContent;
            }
        }
    })

})

// input operator
let count = 1; // CONTINUOUS CALCULATION
inputOperator.forEach(button => {
    button.addEventListener('click', async (e) => {
        const element = e.target;
        const value = element.textContent;
        if (reNum.test(num1) && count === 1) {
            displayResult.textContent = value;
            operator = value;
            count++; // count 2 operator
        } else if (num1 === '' && count === 1 && value === '-') {
            displayResult.textContent = value;
            num1 = value;
        } else if (!num2.includes('-') && num2 === '' && value === '-' && count === 2 && operator !== '') {
            num2 = value;
            displayResult.textContent = '';
            displayResult.textContent = num2;
        } else if ((reNum.test(num2) && count === 2)) {
            if (displayPass.textContent.length < 25 && displayPass.textContent === '') {
                displayPass.textContent += num1 + operator + num2;

            } else if (displayPass.textContent.length < 25 && displayPass.textContent !== '') {
                displayPass.textContent += `${operator}${num2}`
            }
            await result(num1, num2, operator);
            operator = value;
        }
        // console.log(count)
    })
})



// showing result calculator
equal.addEventListener(('click'), async () => {
    console.log(num1);
    console.log(num2);
    console.log(operator);
    if (displayPass.textContent.length < 25 && displayPass.textContent === '') {
        // displayPass.textContent.slice()
        displayPass.textContent += num1 + operator + num2;

    } else if (displayPass.textContent.length < 25 && displayPass.textContent !== '') {
        displayPass.textContent += `${operator}${num2}`
    } else if (displayPass.textContent.length >= 25 && displayPass.textContent !== '') {

    }
    await result(num1, num2, operator)
    count = 1;

})

const result = (number1, number2, operatorInput) => {
    if (operatorInput === 'x') {
        resultValue = Math.round((parseFloat(number1) * parseFloat(number2)) * 10000) / 10000;
        // displayPass.textContent += num1 + operator + num2;
        displayResult.textContent = resultValue;
        operator = '';
        num2 = '';
        num1 = resultValue.toString();
        count = 2;
    } else if (operatorInput === '/') {
        resultValue = Math.round((parseFloat(number1) / parseFloat(number2)) * 10000) / 10000;
        displayResult.textContent = resultValue;
        operator = '';
        num2 = '';
        num1 = resultValue.toString();
        count = 2;
    } else if (operatorInput === '+') {
        resultValue = Math.round((parseFloat(number1) + parseFloat(number2)) * 10000) / 10000;
        displayResult.textContent = resultValue;
        operator = '';
        num2 = '';
        num1 = resultValue.toString();
        count = 2;
    } else if (operatorInput === '-') {
        resultValue = Math.round((parseFloat(number1) - parseFloat(number2)) * 100) / 100;
        displayResult.textContent = resultValue;
        operator = '';
        num2 = '';
        num1 = resultValue.toString();
        count = 2;
    }
}

// clear 

clear.addEventListener(('click'), () => {
    displayResult.textContent = '';
    displayPass.textContent = '';
    num1 = '';
    num2 = '';
    operator = '';
    resultValue = '';
    count = 1;
})


// delete
deleteInput.addEventListener(('click'), () => {
    if (num2 === '' && operator === '' && num1 !== '' && !reNum.test(resultValue)) {
        num1 = num1.substring(0, num1.length - 1)
        // console.log(num1)
        displayResult.textContent = num1;
    } else if (reNum.test(num1) && reNum.test(num2)) {
        num2 = num2.substring(0, num2.length - 1)
        // console.log(num2)
        displayResult.textContent = num2;
    }
})