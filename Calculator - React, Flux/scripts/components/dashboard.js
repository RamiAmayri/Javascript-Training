var React = require('react');

export default class Dashboard extends React.Component {
	constructor (props) {
		super (props);
	}
	
	render () {
		return (
			<thead>
				<tr>
					<td rowSpan='3' colSpan='3'>
						<span>{this.props.result}</span>
					</td>
				</tr>
			</thead>
		);
	}
}

Dashboard.defaultProps = { result: 0 };