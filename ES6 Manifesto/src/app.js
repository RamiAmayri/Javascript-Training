var App = (function () {
	

	function foo (firstName) {
		if (!firstName) {
			throw Error('FirstName is required!');
		}
	}

	foo();
})();

