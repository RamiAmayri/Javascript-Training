import pubSub from './pubSub.js';
import NumberButton from './numberButton.js';
import ActionButton from './actionButton.js';

export default class Calculator {
    constructor () {
        this.actions = ['percent', 'divide', 'multiply', 'substract', 'add'];
        this.immediateActions = ['derivate', 'clear', 'execute', 'plusMinus'];
        this.numberTypes = Object.freeze({ 0: "integer", 1: "float" });
        this.actionSymbols = Object.freeze({
            percent: "%",
            divide: "/",
            multiply: "*",
            substract: "-",
            add: "+"
        });
            
        this.buttons = [], this.initVariables(), this.initButtons();
    
        pubSub.subscribe("actionButtonClick", this.handleActionButtonClick.bind(this));
        pubSub.subscribe("numberButtonClick", this.handleNumberButtonClick.bind(this));
    }
    
    updateContent () {
        let content = this.leftNumber;
        let haveRightNumber = this.haveRightNumber();
        
        this.derivate && !haveRightNumber && Number.isInteger(this.leftNumber) ? content += "." : "";
        this.haveAction() ? content += " " + this.actionSymbols[this.action] : "";
        haveRightNumber ? content += " " + this.rightNumber : "";
        this.derivate && haveRightNumber && Number.isInteger(this.rightNumber) ? content += "." : "";
        document.querySelector("[rel='js-content-result-text']").textContent = content;
    }
    
    handleActionButtonClick (action) {
        let shouldExecuteImmediateAction = this.shouldExecuteImmediateAction(action);
        let shouldExecuteAction = this.shouldExecuteAction();

        if (shouldExecuteImmediateAction) {
            this.executeImmediateAction(action);
        } else if (shouldExecuteAction) {
            this.executeAction();
        } 

        if (!shouldExecuteImmediateAction) {
            this.action = action, this.derivate = false;
        }
        
        this.updateContent();
    } 
    
    executeImmediateAction (action) {
        switch (action) {
            case 'derivate':
                this.derivate = true;
                break;
            case 'clear':
                this.initVariables();
                break;
            case 'execute':
                this.shouldExecuteAction() ? this.executeAction() : '';
                break;
            case 'plusMinus':
                this.haveRightNumber() ? this.rightNumber *= -1 : this.leftNumber *= -1;
                break;
        }
    }
    
    executeAction () {
        switch (this.action) {
            case "percent":
                this.leftNumber %= this.rightNumber;
                break;
            case "divide":
                this.leftNumber /= this.rightNumber;
                break;
            case "multiply":
                this.leftNumber *= this.rightNumber;
                break;
            case "substract":
                this.leftNumber -= this.rightNumber;
                break;
            case "add":
                this.leftNumber += this.rightNumber;
                break;
            default: throw new Error("Invalid action");
                break;
        }
    
        this.initVariables(this.leftNumber, null, null, true, false);
    }
    
    handleNumberButtonClick (number) {
        if (this.haveAction()) {
            this.rightNumber = this.rightNumber || 0;
            this.rightNumber = this.getNumber(this.derivate, this.rightNumber, number, this.numberTypes);
        } else {
            if (this.justExecuted) {
                this.justExecuted = false, this.leftNumber = number;
            } else {
                this.leftNumber = this.getNumber(this.derivate, this.leftNumber, number, this.numberTypes);
            }
        }
    
        this.updateContent();
    }
    
    initVariables (leftNumber = 0, rightNumber = null, action = null, justExecuted = false, derivate = false) {
        this.leftNumber = leftNumber, this.rightNumber = rightNumber, this.action = action,
            this.justExecuted = justExecuted, this.derivate = derivate;
    }
    
    initButtons () { this.initNumberButtons(), this.initActionButtons(); }
    
    initNumberButtons () {
        for (var i = 0; i <= 9; i++) {
            this.addButton(i);
        }
    }
    
    initActionButtons () {
        this.addButton("clear"), this.addButton("plusMinus"), this.addButton("percent"),
            this.addButton("divide"), this.addButton("multiply"), this.addButton("substract"),
            this.addButton("add"), this.addButton("execute"), this.addButton("derivate");
    }
    
    addImmediateAction (action) {
        this.immediateActions.push(action);
    }
    
    addButton (value) {
        isNaN(value) ? this.buttons.push(new ActionButton(value)) : this.buttons.push(new NumberButton(value));
    }
    
    getNumber (derivate, numberOne, numberTwo, numberTypes) {
        if (derivate) {
            let result;
            Number.isInteger(numberOne) ? result = this.parseNumber(numberOne, numberTwo, numberTypes[1], numberTypes, ".") :
                    result = this.parseNumber(numberOne, numberTwo, numberTypes[1], numberTypes, "");
            return result;
        } else {
            return this.parseNumber(numberOne, numberTwo, numberTypes[0], numberTypes);
        }
    }
    
    parseNumber (numberOne, numberTwo, numberType, numberTypes, delimeter) {
        if (numberType === numberTypes[0]) { // integer
            return parseInt((numberOne + "") + (numberTwo + ""));
        } else if (numberType === numberTypes[1]) { // float
            return parseFloat((numberOne + delimeter) + (numberTwo + ""));
        } else {
            throw new Error("Invalid number type");
        }
    }
    
    shouldExecuteImmediateAction (action) { return this.immediateActions.indexOf(action) != -1; }
    
    shouldExecuteAction () { return this.haveRightNumber() && this.haveAction(); }
    
    haveRightNumber () { return this.rightNumber != null; }
    
    haveAction () { return this.action != null; }
}