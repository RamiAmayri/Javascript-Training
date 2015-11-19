import AppDispatcher from '../appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

var CalculatorAction = {
	buttonClick (value) {
		AppDispatcher.dispatch({
			actionType: ActionTypes.BUTTON_CLICK,
			value: value
		});
	}
};

export { CalculatorAction as default };