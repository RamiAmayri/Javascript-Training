import Dashboard from './dashboard.js';
import TableRow from './tableRow.js';
import CalculatorAction from '../actions/calculatorAction.js';
import CalculatorStore from '../stores/calculatorStore.js';

var React = require('react');

export default class Calculator extends React.Component {
	constructor (props) {
		super(props);
		this.state = { result: 0 };
	} 

	componentDidMount () {
		CalculatorStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount () {
		CalculatorStore.removeChangeListener(this.onChange.bind(this));
	}

	onButtonClick (value) {
		CalculatorAction.buttonClick(value);
	}

	onChange () {
		this.setState(CalculatorStore.getResult());
	}

	render () {
		let buttons = this.props.buttons;
		let rows = [];

		for (let i = 0 ; i < buttons.length; i+=4) {
			rows.push(<TableRow key={i} cells={buttons.slice(i, i + 4)} onClick={this.onButtonClick} />);
		}

		return (
			<div>
				<table>
					<Dashboard result={this.state.result} />
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}

Calculator.propTypes = { buttons: React.PropTypes.array };