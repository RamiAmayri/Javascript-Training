function ActionButton(value) {
    Button.call(this, "action", value);
}

ActionButton.prototype = Object.create(Button.prototype);