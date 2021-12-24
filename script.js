class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, this.currentOperand.length-1)
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) 
            return
        this.currentOperand += number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '')
            return
        else{
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if( isNaN(prev) || isNaN(current))
            return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerdigits = parseFloat(stringNumber.split('.')[0])
        const decimaldigits = stringNumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigits)){
            integerdisplay = ''
        }
        else{
            integerdisplay = integerdigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if(decimaldigits != null)
            return `${integerdisplay}.${decimaldigits}`
        else{
            return integerdisplay
        }
    }

    updateDisplay() {
        if(this.operation != null)
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        else{
            this.previousOperandTextElement.innerText = ''
        }
        this.currentOperandTextElement.innerText = this.currentOperand
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    }
}

const numberButtons = document.querySelectorAll('[data-num]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})