import Calculator from './components/calculator.js';

var React = require('react');
var ReactDOM = require('react-dom');

var buttons = [
	{ value: 'AC' }, { value: '+/-' }, { value: '%' }, { value: '/' },
	{ value: 7 }, { value: 8 }, { value: 9 }, { value: 'x' },
	{ value: 4 }, { value: 5 }, { value: 6 }, { value: '-' },
	{ value: 1 }, { value: 2 }, { value: 3 }, { value: '+' },
	{ value: 0 }, { value: '.' }, { value: '=' }
];

ReactDOM.render(<Calculator buttons={buttons} />, document.getElementById('wrapper'));