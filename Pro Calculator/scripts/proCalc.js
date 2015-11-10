import Calculator from './calc.js';

export default class ProCalculator extends Calculator {
	constructor () {
		super();
		
		this.addButtons();
		this.addImmediateActions();
	}

	handleActionButtonClick (action) {
		if (super.shouldExecuteImmediateAction(action)) {
			this.execute(action);
		}
		
		super.handleActionButtonClick(action);
	}
	
	execute (action) {
		let haveRightNumber = this.haveRightNumber();
		
		switch (action) {
			case 'sqrt':
				haveRightNumber ? this.rightNumber = Math.sqrt(this.rightNumber) : this.leftNumber = Math.sqrt(this.leftNumber);
				break;
			case 'sin':
				haveRightNumber ? this.rightNumber = Math.sin(this.rightNumber) : this.leftNumber = Math.sin(this.leftNumber);
				break;
			case 'cos':
				haveRightNumber ? this.rightNumber = Math.cos(this.rightNumber) : this.leftNumber = Math.cos(this.leftNumber);
				break;
			case 'tan':
				haveRightNumber ? this.rightNumber = Math.tan(this.rightNumber) : this.leftNumber = Math.tan(this.leftNumber);
				break;
			case 'cot':
				haveRightNumber ? this.rightNumber = Math.cot(this.rightNumber) : this.leftNumber = Math.cot(this.leftNumber);
				break;
		}
	}
	
	addButtons () {
		super.addButton('sqrt'), super.addButton('sin'), super.addButton('cos'), super.addButton('tan'), super.addButton('cot');
	}
	
	addImmediateActions () {
		super.addImmediateAction('sqrt'), super.addImmediateAction('sin'), super.addImmediateAction('cos'),
			 super.addImmediateAction('tan'), super.addImmediateAction('cot');
	}
}

Math.constructor.prototype.cot = function (value) {
	return 1 / Math.tan(value);
};