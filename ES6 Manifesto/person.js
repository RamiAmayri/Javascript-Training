function Person (firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

Person.prototype.sayHello = function () {
	console.log(this.firstName + ' ' + this.lastName);
};

module.exports = Person;