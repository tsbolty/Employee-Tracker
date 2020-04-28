const connection = require("./connection")
require("../questions")

class Tables {

    addEmployee(employee){
        connection.query(
            "INSERT INTO employees SET ?",
            [{
              first_name: employee.firstName,
              last_name: employee.lastName,
              role_id: employee.role,
              manager_id: employee.manager
            }]
        )
    }

    addRole(role){
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: role.title,
                salary: role.salary,
                department_id: role.departmentId
            }
        )
    }

    addDepartment(department){
        connection.query(
            "INSERT INTO departments SET ?",
            {
                name: department.name,
                id: department.id
            }
        )
    }

    updateEmployeeRole(employee){
        connection.query(
            "UPDATE employees SET ? WHERE ?",
            [{employee_role: employee.role}, {employee_manager: employee.manager},
            {
                employee_id : employee.id
            }]
        )}

    findDepartments(){
        return connection.query(
        "SELECT name, id FROM departments"
        )
    }

    








}

module.exports = new Tables