USE empl_mngmt;

INSERT INTO departments (dept_name)
VALUES 
('Sales'),
('Engineering'),
('Accounting'),
('Operations');

INSERT INTO roles (job_title, salary, dept_id)
VALUES
('Sales Manager', 150000.00, 1),
('Outside Sales', 75000.00, 1),
('Inside Sales', 60000.00, 1),
('Engineering Manager', 120000.00, 2),
('Electrical Engineer', 100000.00, 2),
('Chemical Engineer', 100000.00, 2),
('Accounting Manager', 110000.00, 3),
('Accountant', 90000.00, 3),
('Operations Manager', 130000.00, 4),
('Custodian', 65000.00, 4),
('Plant Maintenance', 85000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, mngr_id)
VALUES
('Chuck', 'Fields', 1, NULL),
('Aaron', 'Neme', 4, NULL),
('Darius', 'Matthews', 9, NULL),
('Billy-Bob', 'Bobson', 3, 1),
('Zac', 'Lloyd', 2, 1),
('Jeff', 'Campbell', 7, NULL),
('Dave', 'Schlueneker', 5, 2),
('Alex', 'Schlueneker', 6, 2),
('Cory', 'Powell', 8, 6),
('Cassie', 'Odquist', 10, 3),
('Jon', 'Felger', 11, 3);