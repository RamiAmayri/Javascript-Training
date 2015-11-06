export default function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}

Person.prototype = {
    sayHello: function () {
        console.log('Hello my name is ' + this.firstName + ' ' + this.lastName + ', ' + this.age);
    }
}