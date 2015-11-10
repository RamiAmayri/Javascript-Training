import Button from './button.js';

export default class ActionButton {
    constructor (value) {
        Button.call(this, "action", value);
    }
}

ActionButton.prototype = Object.create(Button.prototype);