const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText  = currentOperationText
        this.currentOperation = "" 

    }
    // add digit to calculator screen
    addDigit(digit) {

        //verifica se já existe ponto na operaçao
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = digit
        this.updateScreen()
    }

    // calculos 

    processOperation(operation){
        //checar se o current está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //muda a operaçao
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //recebe os valores
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;   
            case "-" :
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*" :
                operationValue =  previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/" :
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":    
                this.processClearOperation();
                break;
            case "=":    
                this.processEqualOperator();
                 break;
          default:
            return;
        }
    }
    
    // change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ){
            console.log(operationValue, operation, current, previous);

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //verifica se o valor é zero. se for ele adiciona o valor de current
            if(previous === 0){
                operationValue = current
            }
            // adicionar o valor de current para o previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }
    //muda a operaçao matematica
    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"]
        if(!mathOperation.includes(operation)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }
    //Deleta o último digito
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //apaga a current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }
    
    //apaga todas as operacoes
    processClearOperation() {
        
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator() {
        const  operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
        
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        //valida se é um numero
        if(+value >= 0 || value ===".") { 
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});