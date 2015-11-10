import Button from './button.js';

export default class NumberButton {
    constructor (value) {
        Button.call(this, "number", value);
    }
}

NumberButton.prototype = Object.create(Button.prototype);