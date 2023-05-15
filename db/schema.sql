-- Created two databases
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use employee_db
USE employee_db;

-- Create table for department
CREATE TABLE department(
    id: INT PRIMARY KEY AUTO_INCREMENT,
    name: VARCHAR(30) NOT NULL
);

-- Create table for role
CREATE TABLE role(
    id: INT PRIMARY KEY AUTO_INCREMENT,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL,
    department_id: INT,
    CONSTRAINT fk_department FOREIGN KEY (department_id) department(id) ON DELETE SET NULL
);

-- Create table for employee
CREATE TABLE employee(
    id: INT PRIMARY KEY AUTO_INCREMENT,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT
    manager_id: INT REFERENCES employee(id) ON DELETE SET NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);