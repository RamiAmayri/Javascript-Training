var Calculator = (function Calculator() {
    var leftNumber, rightNumber, action, justExecuted, derivate, actionSymbols = {
        percentage: "%",
        divide: "/",
        multiply: "*",
        substract: "-",
        add: "+"
    };

    function haveAction() { return action != null }
    function haveRightNumber() { return rightNumber != null }
    function initVariables() { leftNumber = 0, rightNumber = null, action = null, justExecuted = false, derivate = false }

    function updateContent(content) {
        var content = leftNumber;
        derivate && !haveRightNumber() && Number.isInteger(leftNumber) ? content += "." : "";
        haveAction() ? content += " " + actionSymbols[action] : "";
        haveRightNumber() ? content += " " + rightNumber : "";
        derivate && haveRightNumber() && Number.isInteger(rightNumber) ? content += "." : "";
        document.querySelector("[rel='js-result-text']").textContent = content;
    }

    function onButtonClick(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        evt.stopPropagation();

        var rel = evt.target.getAttribute("rel");
        var relParts = rel.split("-");

        if (rel.indexOf("js-button-action") != -1) {
            setAction(relParts[relParts.length - 1]); // passing the action - which is the last part of the relParts array
        } else if (rel.indexOf("js-button-number") != -1) {
            setNumber(parseInt(relParts[relParts.length - 1], 10));  // passing the number - which is the last part of the relParts array
        } else {
            throw new Error("Invalid button");
        }

        updateContent();
    }
	  
	function execute(){
	    switch (action) {
	        case "percentage":
	            leftNumber %= rightNumber;
	            break;
	        case "divide":
	            leftNumber /= rightNumber;
	            break;
			case "multiply": 
				leftNumber *= rightNumber;
				break;
			case "substract":
				leftNumber -= rightNumber;
				break;
			case "add":
				leftNumber += rightNumber;
		}
		
	    rightNumber = null, action = null, justExecuted = true, derivate = false;
	}
	
	function setNumber(number){
	    if (haveAction()) {
	        rightNumber = rightNumber || 0;
	        if (derivate) {
	            Number.isInteger(rightNumber) ? rightNumber = parseFloat((rightNumber + ".") + (number + "")) : rightNumber = parseFloat((rightNumber + "") + (number + ""));
	        } else {
	            rightNumber = parseInt((rightNumber + "") + (number + ""));
	        }
	    } else {
	        if (justExecuted) {
	            justExecuted = false, leftNumber = number;
	        } else {
	            if (derivate) {
	                Number.isInteger(leftNumber) ? leftNumber = parseFloat((leftNumber + ".") + (number + "")) : leftNumber = parseFloat((leftNumber + "") + (number + ""));
	            } else {
	                leftNumber = parseInt((leftNumber + "") + (number + ""));
	            }
	        }
	    }
	}
	
	function setAction(act) {
	    if (act == "derivate") {
	        derivate = true;
	    } else if (act == "clear") {
	        initVariables();
        } else if (act == "execute") {
		    execute();
        } else if (act == "plusMinus") {
            haveRightNumber() ? rightNumber *= -1 : leftNumber *= -1;
        } else {
            haveAction() && haveRightNumber() ? execute() : "";
			action = act, derivate = false;
		}
	}

	function init() {
	    initVariables(); // initialziing local variables
		document.querySelector("[rel='js-buttons']").addEventListener("click", onButtonClick, false); // initializing html bindings
	}
	
	return {
	    init: init,
        // setNumber, setAction and execute can also be exposed and tested within the javascript code with unit tests.
		//setNumber: setNumber,
		//setAction: setAction,
		//execute: execute
	}
})();

// Making sure the DOM is loaded before initializing our code. Directly passing the init function of the main module.
document.addEventListener("DOMContentLoaded", Calculator.init);