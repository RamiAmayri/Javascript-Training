function NumberButton(value) {
    Button.call(this, "number", value);
}

NumberButton.prototype = Object.create(Button.prototype);