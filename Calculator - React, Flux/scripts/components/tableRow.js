import TableCell from './tableCell.js';

var React = require('react');

export default class TableRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let onClick = this.props.onClick;
		let cells = this.props.cells.map((cell) => {
			return <TableCell key={cell.value} value={cell.value} onClick={onClick} />;
		});

		return (
			<tr>
				{cells}
			</tr>
		);
	}
}