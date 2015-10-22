// Using module pattern for encapsulation, note: I have given name to the function (Calculator) just so I can reference it if I want to.
var Calculator = (function Calculator() {
    var currentNumber, previousNumber, currentAction, action_clear = "clear", action_division = "divison", action_multiplication = "multiplication",
        action_substraction = "substraction", action_addition = "addition", action_equality = "equality", action_derivative = "derivative";

    function derivate() {
        currentAction = action_derivative;
    }

    function clear() {
        currentNumber = null;
        previousNumber = null;
        currentAction = null;
    }

    function divide(number) {
        if (number) {
            currentNumber = currentNumber / number;
        } else {
            var currentNumberTemp = currentNumber;
            currentNumber = previousNumber / currentNumber;
            previousNumber = currentNumberTemp;
        }
    }

    function multiply(number) {
        if (number) {
            currentNumber = currentNumber * number;
        } else {
            var currentNumberTemp = currentNumber;
            currentNumber = previousNumber * currentNumber;
            previousNumber = currentNumberTemp;
        }
    }

    function substract(number) {
        if (number) {
            currentNumber = currentNumber - number;
        } else {
            var currentNumberTemp = currentNumber;
            currentNumber = previousNumber - currentNumber;
            previousNumber = currentNumberTemp;
        }
    }

    function add(number) {
        if (number) {
            currentNumber = currentNumber + number;
        } else {
            var currentNumberTemp = currentNumber;
            currentNumber = previousNumber + currentNumber;
            previousNumber = currentNumberTemp;
        }
    }

    function handleActionClicked(action) {
        if (currentAction != null) {
            equate();
            currentAction = null;
        } else {
            currentAction = action;
        }
    }

    function handleNumberClicked(number) {
        if (currentAction == null) {
            currentNumber == null ? currentNumber = number : currentNumber = parseInt(((currentNumber + "") + (number + "")))
            
        } else {
            equate(number);
        }

        updateResult(currentNumber);
    }

    function equate(number) {
        switch (currentAction) {
            case action_division:
                divide(number);
                break;
            case action_multiplication:
                multiply(number);
                break;
            case action_substraction:
                substract(number);
                break;
            case action_addition:
                add(number);
                break;
            case action_clear:
                clear();
                break;
            case action_equality:
                execute();
                break;
            case action_derivative:
                derivate();
                break;
            default: throw new Error("Invalid action");
        }

        currentAction = null;
    }

    function updateResult(content) {
        document.querySelectorAll("[rel='js-result-text']")[0].textContent = content;
    }

    function onButtonClick(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        evt.stopPropagation();

        var rel = evt.target.getAttribute("rel");
        var relParts = rel.split("-");

        if (rel.indexOf("js-button-action") != -1) {
            handleActionClicked(relParts[relParts.length - 1]); // passing the action - which is the last part of the relParts array
        } else if (rel.indexOf("js-button-number") != -1) {
            handleNumberClicked(parseInt(relParts[relParts.length - 1], 10));  // passing the number - which is the last part of the relParts array
        } else {
            throw new Error("Invalid button");
        }
    }

    function init(evt) { // evt here is DOMContentLoaded event
        currentNumber = null;
        previousNumber = null;
        currentAction = null;
        document.querySelectorAll("[rel='js-buttons']")[0].addEventListener("click", onButtonClick, false)
    }

    return {
        init: init
    }
})();

// Making sure the DOM is loaded before initializing our code. Directly passing the init function of the main module.
document.addEventListener("DOMContentLoaded", Calculator.init);