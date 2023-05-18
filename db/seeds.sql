-- Insert values for department names
INSERT INTO department (department_name)
VALUES ('Engineering'),
('Sales'),
('Finance'),
('Legal');

-- Insert values for title, salary and department_id
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

-- sales lead = role_id 1,
-- salesperson = role_id 2,
-- lead engineer = role_id 3,
-- software engineer = role_id 4,
-- account manager = role_id 5,
-- accountant = role_id 6,
-- legal team lead = role_id 7,
-- lawyer = role_id 8

-- Insert values for first_name, last_name, role_id and manager_id
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John','Doe', 1, null),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, null),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 5, null),
('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, null),
('Tom', 'Allen', 8, 7);