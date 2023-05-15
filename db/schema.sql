-- Created two databases
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use employee_db
USE employee_db;

-- Create table for department
CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- Create table for role
CREATE TABLE role(
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT
);

-- Create table for employee
CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);