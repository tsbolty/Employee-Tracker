DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES (Steven, Lucas, 1, 1), (Zach, Bowen, 2, 2), (Martin, Kiethline, 3, 3), (Brandon, Armor, 4, 4), (Jake, Jones, 5, 5), (Hank, Eggers, 6, 6), 
(Ashle, Roedel, 7, 7);

INSERT INTO departments(name)
VALUES (IT, Sanitation, Sales, Accounting, HR, Interns);

INSERT INTO roles (title, salary, department_id)
VALUES (Software Engineer, 120000, 1),
(Janitor, 40000, 2),
(Sales Person, 80000, 3),
(Accountant, 70000, 4),
(HR Representative, 60000, 5),
(Intern, 40000, 6),
(Manager, 100000, 7);