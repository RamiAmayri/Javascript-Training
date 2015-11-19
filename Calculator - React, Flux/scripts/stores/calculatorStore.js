import AppDispatcher from '../appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var CalculatorStore = (function () {
    var _leftNumber, _rightNumber, _action, _justExecuted, _derivate, 
        _immediateActions = ['derivate', 'clear', 'execute', 'plusMinus'],
        _actions = ['percent', 'divide', 'multiply', 'substract', 'add'],
        _numberTypes = Object.freeze({ 0: "integer", 1: "float" }),
        _actionSymbols = Object.freeze({
            '%': '%',
            '/': '/',
            'x': '*',
            '-': '-',
            '+': '+'
        }),
        _symbolsToActions = Object.freeze({
            '%': _actions[0],
            '/': _actions[1],
            'x': _actions[2],
            '-': _actions[3],
            '+': _actions[4]
        }),
        _symbolsToImmediateActions = Object.freeze({
            '.': _immediateActions[0],
            'AC': _immediateActions[1],
            '=': _immediateActions[2],
            '+/-': _immediateActions[3]
        });

    initVariables();

    function getResult () {
        let _result = _leftNumber;
        let _haveRightNumber = haveRightNumber();
        
        _derivate && !_haveRightNumber && Number.isInteger(_leftNumber) ? _result += "." : "";
        haveAction() ? _result += " " + _actionSymbols[_action] : "";
        _haveRightNumber ? _result += " " + _rightNumber : "";
        _derivate && _haveRightNumber && Number.isInteger(_rightNumber) ? _result += "." : "";
        
        return { result: _result };
    }

    function handleButtonClicked (obj) {
        let _value = obj.value;
        isNaN(_value) ? handleActionClick(_value) : handleNumberClick(_value);
    }

    function handleActionClick (action) {
        let _shouldExecuteImmediateAction = shouldExecuteImmediateAction(_symbolsToImmediateActions[action]);
        let _shouldExecuteAction = shouldExecuteAction();

        if (_shouldExecuteImmediateAction) {
            executeImmediateAction(action);
        } else if (_shouldExecuteAction) {
            executeAction();
        } 

        if (!_shouldExecuteImmediateAction) {
            _action = action, _derivate = false;
        }
    } 

    function handleNumberClick (number) {
        if (haveAction()) {
            _rightNumber = _rightNumber || 0;
            _rightNumber = getNumber(_derivate, _rightNumber, number, _numberTypes);
        } else {
            if (_justExecuted) {
                _justExecuted = false, _leftNumber = number;
            } else {
                _leftNumber = getNumber(_derivate, _leftNumber, number, _numberTypes);
            }
        }
    }

    function executeImmediateAction (action) {
        switch (_symbolsToImmediateActions[action]) {
            case 'derivate':
                _derivate = true;
                break;
            case 'clear':
                initVariables();
                break;
            case 'execute':
                shouldExecuteAction() ? executeAction() : '';
                break;
            case 'plusMinus':
                haveRightNumber() ? _rightNumber *= -1 : _leftNumber *= -1;
                break;
        }
    }
    
    function executeAction () {
        switch (_symbolsToActions[_action]) {
            case "percent":
                _leftNumber %= _rightNumber;
                break;
            case "divide":
                _leftNumber /= _rightNumber;
                break;
            case "multiply":
                _leftNumber *= _rightNumber;
                break;
            case "substract":
                _leftNumber -= _rightNumber;
                break;
            case "add":
                _leftNumber += _rightNumber;
                break;
            default: throw new Error("Invalid action");
                break;
        }
    
        initVariables(_leftNumber, null, null, true, false);
    }

    function initVariables (leftNumber = 0, rightNumber = null, action = null, justExecuted = false, derivate = false) {
        _leftNumber = leftNumber, _rightNumber = rightNumber, _action = action, _justExecuted = justExecuted, _derivate = derivate;
    }
    
    function getNumber (derivate, numberOne, numberTwo, numberTypes) {
        if (derivate) {
            let _result;
            Number.isInteger(numberOne) ? _result = parseNumber(numberOne, numberTwo, numberTypes[1], numberTypes, ".") :
                    _result = parseNumber(numberOne, numberTwo, numberTypes[1], numberTypes, "");
            return _result;
        } else {
            return parseNumber(numberOne, numberTwo, numberTypes[0], numberTypes);
        }
    }
    
    function parseNumber (numberOne, numberTwo, numberType, numberTypes, delimeter) {
        if (numberType === numberTypes[0]) { // integer
            return parseInt((numberOne + "") + (numberTwo + ""));
        } else if (numberType === numberTypes[1]) { // float
            return parseFloat((numberOne + delimeter) + (numberTwo + ""));
        } else {
            throw new Error("Invalid number type");
        }
    }
    
    function shouldExecuteImmediateAction (action) { return _immediateActions.indexOf(action) != -1; }
    
    function shouldExecuteAction () { return haveRightNumber() && haveAction(); }
    
    function haveRightNumber () { return _rightNumber != null; }
    
    function haveAction () { return _action != null; }

    return {
    	getResult: getResult,
    	handleButtonClicked: handleButtonClicked,
    	addChangeListener: function (callback) {
    		this.on(CHANGE_EVENT, callback);
    	},
    	removeChangeListener: function (callback) {
    		this.removeListener(CHANGE_EVENT, callback);
    	},
    	emitChange: function () {
    		this.emit(CHANGE_EVENT);
    	}
    };
})();

Object.assign(CalculatorStore, EventEmitter.prototype);

AppDispatcher.register(function (payload) {
	let actionType = payload.actionType;
	switch (actionType) {
		case ActionTypes.BUTTON_CLICK: 
			CalculatorStore.handleButtonClicked({ value: payload.value });
			CalculatorStore.emitChange();
			break;
	}
}); 

export { CalculatorStore as default };