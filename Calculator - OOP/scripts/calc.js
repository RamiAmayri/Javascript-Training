function Calculator() {
    this.numberTypes = Object.freeze({ 0: "integer", 1: "float" });
    this.actionSymbols = Object.freeze({
        percent: "%",
        divide: "/",
        multiply: "*",
        substract: "-",
        add: "+"
    });

    this.buttons = [];

    pubSub.subscribe("actionButtonClick", this.handleActionButtonClick.bind(this));
    pubSub.subscribe("numberButtonClick", this.handleNumberButtonClick.bind(this));
}

Calculator.prototype.updateContent = function () {
    var content = this.leftNumber;
    this.derivate && !this.haveRightNumber() && Number.isInteger(this.leftNumber) ? content += "." : "";
    this.haveAction() ? content += " " + this.actionSymbols[this.action] : "";
    this.haveRightNumber() ? content += " " + this.rightNumber : "";
    this.derivate && this.haveRightNumber() && Number.isInteger(this.rightNumber) ? content += "." : "";
    document.querySelector("[rel='js-content-result-text']").textContent = content;
};

Calculator.prototype.handleActionButtonClick = function (action) {
    if (action == "derivate") {
        this.derivate = true;
    } else if (action == "clear") {
        this.initVariables(0, null, null, false, false);
    } else if (action == "execute") {
        this.executeAction();
    } else if (action == "plusMinus") {
        this.haveRightNumber() ? this.rightNumber *= -1 : this.leftNumber *= -1;
    } else {
        this.haveAction() && this.haveRightNumber() ? this.executeAction() : "";
        this.action = action, this.derivate = false;
    }

    this.updateContent();
};

Calculator.prototype.handleNumberButtonClick = function (number) {
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
};

Calculator.prototype.getNumber = function (derivate, numberOne, numberTwo, numberTypes) {
    if (derivate) {
        var result;
        Number.isInteger(numberOne) ? result = this.parseNumber(numberOne, numberTwo, numberTypes[1], numberTypes, ".") :
                result = this.parseNumber(numberOne, numberTwo, numberTypes[1], numberTypes, "");
        return result;
    } else {
        return this.parseNumber(numberOne, numberTwo, numberTypes[0], numberTypes);
    }
};

Calculator.prototype.parseNumber = function (numberOne, numberTwo, numberType, numberTypes, delimeter) {
    if (numberType === numberTypes[0]) { // integer
        return parseInt((numberOne + "") + (numberTwo + ""));
    } else if (numberType === numberTypes[1]) { // float
        return parseFloat((numberOne + delimeter) + (numberTwo + ""));
    } else {
        throw new Error("Invalid number type");
    }
};

Calculator.prototype.executeAction = function () {
    switch (this.action) {
        case "percentage":
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
    }

    this.initVariables(this.leftNumber, null, null, true, false);
};

Calculator.prototype.init = function () { this.initVariables(0, null, null, false, false), this.initButtons(); };
    
Calculator.prototype.initVariables = function (leftNumber, rightNumber, action, justExecuted, derivate) {
    this.leftNumber = leftNumber, this.rightNumber = rightNumber, this.action = action,
        this.justExecuted = justExecuted, this.derivate = derivate;
};

Calculator.prototype.initButtons = function () { this.initNumberButtons(), this.initActionButtons(); };

Calculator.prototype.initNumberButtons = function () {
    for (var i = 0; i <= 9; i++) {
        this.buttons.push(new NumberButton(i));
    }
};

Calculator.prototype.initActionButtons = function () {
    this.buttons.push(new ActionButton("clear"), new ActionButton("plusMinus"), new ActionButton("percent"),
        new ActionButton("divide"), new ActionButton("multiply"), new ActionButton("substract"),
        new ActionButton("add"), new ActionButton("execute"), new ActionButton("derivate"));
};

Calculator.prototype.haveRightNumber = function () { return this.rightNumber != null; };

Calculator.prototype.haveAction = function () { return this.action != null; };