let express = require('express');
let mongoose = require('mongoose');
let employeeModel = require('./models/Employee');

let app = express();
//

app.use(express.json());

mongoose.connect(
	'mongodb+srv://TheRiftGuardian:S6fdxxikdhRL29K@comp3123.okoru.mongodb.net/101289239_assignment2?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.get('/', (req, res) => {
	res.send('<h1>MongoDB mongoose Example</h1>');
});

//GET Employees
app.get('/api/v1/employees', async (req, res) => {
	const employees = await employeeModel.find({});

	try {
		res.send(employees);
		console.log('All Employee resources are fetched.');
	} catch (err) {
		res.status(500).send(err);
	}
});

//POST Employee
app.post('/api/v1/employees', async (req, res) => {
	const employee = new employeeModel(req.body);

	try {
		await employee.save();
		res.status(201).send(employee);
		console.log('A new Employee resource is created.');
	} catch (err) {
		res.status(500).send(err);
	}
});
//GET Employee
app.get('/api/v1/employees/:id', async (req, res) => {
	const employees = await employeeModel.findById(req.params.id);

	try {
		res.send(employees);
		console.log('One Employee resource is fetched.');
	} catch (err) {
		res.status(500).send(err);
	}
});

//PUT Employee
app.put('/api/v1/employees/:id', async (req, res) => {
	try {
		updateEmployee = await employeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
		employee = await updateEmployee.save();
		res.send(employee);
		console.log('Employee resource is updated.');
	} catch (err) {
		res.status(500).send(err);
	}
});

//DELETE Employee
app.delete('/api/v1/employees/:id', async (req, res) => {
	try {
		const employee = await employeeModel.findByIdAndDelete(req.params.id);
		res.status(204).send('Employee resource is deleted.');
	} catch (err) {
		res.status(500).send(err);
	}
});

app.listen(9090, () => {
	console.log('Server running at http://localhost:9090/');
});
