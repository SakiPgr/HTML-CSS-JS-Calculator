class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
    this.allClear();
  }

  allClear() {
    this.previousOperand = '';
    this.currentOperand = '0';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    if (this.currentOperand.length === 0) {
      this.currentOperand = '0';
    }
  }
  
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0') {
      this.currentOperand = ''; 
    }
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousDisplay.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousDisplay.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operandButtons = document.querySelectorAll('[data-operand]');
const previousDisplay = document.querySelector('[data-previous]');
const currentDisplay = document.querySelector('[data-current]');
const allClearButton = document.querySelector('[data-all-clear]');
const delButton = document.querySelector('[data-del]');
const equalButton = document.querySelector('[data-equal]');

const calculator = new Calculator(previousDisplay, currentDisplay);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.value);
    calculator.updateDisplay();
  })
})

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.value);
    calculator.updateDisplay();
  })
})

allClearButton.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateDisplay();
})

equalButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

delButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})