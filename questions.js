const inquirer = require("inquirer")
const db = require ("./db")
const connection= require("./db/connection")

 
async function start(){
        const {choice} = 
        await inquirer.prompt([
            {
                name: "choice",
                message: "What would you like to do?",
                type: "rawlist",
                choices: [
                 {name: "Add an employee", value: "add_employee"},
                 {name: "Add a department", value: "add_department"}, 
                 {name: "Add a role", value: "add_role"}, 
                 {name: "View all departments", value: "view_departments"}, 
                 {name: "View all roles", value: "view_roles"}, 
                 {name: "View all employees", value: "view_employees"}, 
                 {name: "Update employee role", value: "update_role"}]
            }
        ])
            switch (choice){
                case "add_employee":
                    addEmployee()
                    break;
                case "add_department":
                    addDepartment();
                    break;
                case "add_role":
                    addRole();
                    break;
                case "view_departments":
                    viewDepartments();
                    break;
                case "view_roles":
                    viewRoles();
                    break;
                case "view_employees":
                    viewEmployees()
                    break;
                case "update_role":
                    updateEmployeeRole();
                    break;
                default:
                    console.log("Done")
                    // connection.end();
            }
    }

    async function addEmployee(){
        var {firstName, lastName, role} = await inquirer.prompt([
            {
                name: "firstName",
                message: "What is the first name of the employee?",
                type: "input"
            },
            {
                name: "lastName",
                message: "What is the last name of the employee?",
                type: "input"
            },
            {
                name: "role",
                message: "What is this employee's role ?",
                type: "list",
                choices: 
                // function(){
                //     connection.query(
                //         "SELECT name FROM roles", (err, data) =>{
                //             if (err) throw err;
                //             return data
                //         }
                //     )
                // }
                [
                    {name: "Software Engineer", value: "software_engineer"},
                    {name: "Janitor", value: "janitor"},
                    {name: "Sales Person", value: "sales_person"},
                    {name: "Accountant", value: "accountant"},
                    {name: "HR", value: "hr"},
                    {name: "Intern", value: "intern"},
                    {name: "Manager", value: "manager"}
                ]
            }
            
        ])
            switch (role){
                case "software_engineer":
                    addRole(firstName, lastName)
                    start()
                    break;
                case "janitor":
                    addRole(firstName, lastName)
                    start()
                    break;
                case "sales_person":
                    addRole(firstName, lastName)
                    start()
                    break;
                case "accountant":
                    addRole(firstName, lastName)
                    start()
                break;
                case "hr":
                    addRole(firstName, lastName)
                    start()
                    break;
                case "intern":
                    addRole(firstName, lastName)
                    start()
                    break;
                case "manager":
                    addRole(firstName, lastName)
                    start()
                    break;
            }
            connection.query(
                "INSERT INTO employees SET (?, ?, ?)",
                [
                    {first_name: firstName},
                    {last_name: lastName},
                    {role_id: role}
                ]
            )
        
    }

    function addDepartment(){
        inquirer
        .prompt(
            {
                name: "name",
                message: "What is the name of the department",
                type: "input"
            }
        ).then(function(answers){
            connection.query(
            "INSERT INTO departments SET ?", {name: answers.name}, (err, data)=>{
                if(err) console.log("err")
                console.log(`Successfully added ${answers.name}`)
                start()
            }
            )
        })
    }

    async function addRole(firstName, lastName){
        const choice = await inquirer.prompt([
            {
                name: "title",
                message: "What is the position title you would like to add?",
                type: "input",
                // choices:[
                //     {name: "Software Engineer", value: "software_engineer"},
                //     {name: "Janitor", value: "janitor"},
                //     {name: "Sales Person", value: "sales_person"},
                //     {name: "Accountant", value: "accountant"},
                //     {name: "HR", value: "hr"},
                //     {name: "Intern", value: "intern"},
                //     {name: "Manager", value: "manager"}
                // ]
            }
        ]).then(function(answers){
            connection.query(
            "INSERT INTO roles SET ?", {name: answers.name}, (err, data)=>{
                if(err) console.log("err")
                console.log(`Successfully added ${answers.name}`)
                start()
            }
            )
        })
        
        switch(choice){
            case "software_engineer":
            connection.query(
                "INSERT INTO employees (role_id) SET (1) WHERE ? AND ?",
                [{first_name: firstName},
                {last_name: lastName}
            ])
            break;
            case "janitor":
                connection.query(
                    "INSERT INTO employees (role_id) SET (2) WHERE ? AND ?",
                    [{first_name: firstName},
                    {last_name: lastName}
                ])
            break;
            case "sales_person":
                connection.query(
                    "INSERT INTO employees (role_id) SET (3) WHERE ? AND ?",
                    [{first_name: firstName},
                    {last_name: lastName}
                ])
            break;
            case "accountant":
                connection.query(
                    "INSERT INTO employees (role_id) SET (4) WHERE ? AND ?",
                    [{first_name: firstName},
                    {last_name: lastName}
                ])
            break;
            case "hr":
                connection.query(
                    "INSERT INTO employees (role_id) SET (5) WHERE ? AND ?",
                    [{first_name: firstName},
                    {last_name: lastName}
                ])
            break;
            case "intern":
                connection.query(
                    "INSERT INTO employees (role_id) SET (6) WHERE ? AND ?",
                    [{first_name: firstName},
                    {last_name: lastName}
                ])
            break;
            case "manager":
                connection.query(
                    "INSERT INTO employees (role_id) SET (7) WHERE ? AND ?",
                    [{first_name: firstName},
                    {last_name: lastName}
                ])
            break;
        }
      
        start()
    }

    function viewDepartments(){
        connection.query(
            "SELECT departments.name FROM departments", (err, data)=>{
                if (err) throw err;
                for(department of data){
                    console.log(`
                    ${department.name}`)
                }
                start()
            }
            )
    }

    function viewRoles(){
        connection.query(
            "SELECT employees.first_name, employees.last_name, roles.title FROM roles INNER JOIN employees ON (roles.id = employees.role_id)", (err, data)=>{
                if (err) throw err;
                for (role of data){
                    console.log(`
                    ${role.title}: ${role.first_name} ${role.last_name}`)
                }
                start()
            }
        )
    }

    function viewEmployees(){
        connection.query(
            "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.name FROM employees INNER JOIN roles ON (employees.role_id = roles.id) INNER JOIN departments ON (roles.department_id = departments.id)", (err, data)=>{
                if (err) throw err;
                for (person of data){
                    console.log(`
                    ${person.first_name} ${person.last_name}, 
                    Role: ${person.title}, 
                    Salary: ${person.salary}
                    Department: ${person.name}
                    `)
                }
                start()
            }
            )
    }
        
    function updateEmployee(){
        inquirer
        .prompt([
            {
                name: "employee",
                message: "Which employee would you like to update?",
                type: "rawlist",
                choices: function(){
                    // WILL NEED TO LOOP THROUGH THIS AND RETURN RESULTS IN AN ARRAY
                    connection.query(
                        "SELECT first_name, last_name, employee_id FROM employees",
                    )
                }
            }
        ]).then(function(answers){
            addRole(answers.employee)
            db.updateEmployeeRole(answers)
        })
        start()
    }

start()



// module.exports={
//     // viewAll: viewAll(),
//     // updateEmployee: updateEmployee(),
//     // add: add()
//     // PROBABLY WILL NEED TO ADD SOME MORE STUFF HERE
// }