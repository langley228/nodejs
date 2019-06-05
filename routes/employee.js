var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');


//MongoDB的內建PK為 _id
//要顯示的 Employee 欄位 1顯示0隱藏
var projection = {
    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
}

//取得查詢條件物件的 function
var getConditions = (id) => {
    if (id)
        return { _id: id };
    else
        return {};
};

//find all
//http://localhost:3000/employees
router.get('', function (req, res, next) {
    Employee.find(getConditions(), projection, (err, employees) => {
        res.send(employees);
    });
});

//find one by id
//http://localhost:3000/employees/{id}
router.get('/:id', function (req, res, next) {
    Employee.findOne(getConditions(req.params.id), projection,
        (err, employee) => {
            if (employee)
                res.send(employee);
            else
                res.sendStatus(404);
        });
});

//update one by id 
//http://localhost:3000/employees/{id}
router.put('/:id', function (req, res, next) {
    Employee.updateOne(getConditions(req.params.id), req.body,
        (err, raw) => {
            if (raw.ok == 0)
                res.sendStatus(404);
            else
                res.send("OK");
        });
});

//delete by id
//http://localhost:3000/employees/{id}
router.delete('/:id', function (req, res, next) {
    Employee.deleteOne(getConditions(req.params.id),
        (err) => {
            if (err)
                res.sendStatus(404);
            else
                res.send("OK");
        });
});

//add one
//http://localhost:3000/employees
router.post('', function (req, res, next) {
    new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }).save(function (err, employee, count) {
        res.send({
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
        });
    });
});

module.exports = router;
