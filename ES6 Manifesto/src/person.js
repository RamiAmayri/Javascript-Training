class Person {
	constructor ({ firstName = 'Rob', lastName = 'Riches' }) {
		this.firstName = firstName, this.lastName = lastName;
	}

	getName () {
		return `${this.firstName} ${this.lastName}`;
	}
}

let robRiches = new Person({});

export { Person, robRiches as robbkata };

robRiches = new Person({firstName: 'Bob', lastName: 'Proctor'});