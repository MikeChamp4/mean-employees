const hello = (req, res) => res.send('hello')

const employeeCtrl = {};

const Employee = require('../models/Employee')


employeeCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};


employeeCtrl.createEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body)

    await newEmployee.save()
    res.send({message: 'Employee created!'})
};

employeeCtrl.getEmployee = (req, res) => {
    res.send('getting one employee')
};

employeeCtrl.editEmployee = (req, res) => {
    res.send('PUT / edit employee')
};

employeeCtrl.deleteEmployee = (req, res) => {
    res.send('DELETE employee')
};

module.exports = employeeCtrl;