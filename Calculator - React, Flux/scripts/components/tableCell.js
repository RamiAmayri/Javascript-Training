var React = require('react');

export default class TableCell extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<td>
				<button onClick={this.props.onClick.bind(null, this.props.value)}>{this.props.value}</button>
			</td>
		);
	}
}