function Button(type, value) {
    this.type = type;
    this.value = value;
    this.nodeElement = this.getNode(type, value);
    this.nodeElement.addEventListener("click", this.onClick.bind(this), false);
}

Button.prototype.onClick = function (evt) {
    pubSub.publish(this.type + 'ButtonClick', this.value); // first argument is name of the event, second argument is the value of the current button
};

Button.prototype.getQueryString = function (type, value) {
    return "[rel='js-content-button-" + type + "-" + value + "']";
};

Button.prototype.getNode = function (type, value) {
    return document.querySelector(this.getQueryString(type, value));
};