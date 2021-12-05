let mongoose = require('mongoose');

let validateEmail = function(emailId) {
	let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(emailId);
};

const EmployeeSchema = mongoose.Schema({
	_id: {
		type: Number,
		required: [ true, 'Please enter an ID! Cannot be empty' ]
	},
	firstName: {
		type: String,
		required: [ true, 'Please enter a first name! Cannot be empty' ],
		trim: true
	},
	lastName: {
		type: String,
		required: [ true, 'Please enter a last name! Cannot be empty' ],
		trim: true
	},
	emailId: {
		type: String,
		required: [ true, 'Please enter an email! Cannot be empty' ],
		trim: true,
		validate: [ validateEmail, 'Please provide the proper email format: (username@domain.com)' ],
		lowercase: true
	}
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
