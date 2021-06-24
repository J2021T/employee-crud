USE empl_mngmt;

INSERT INTO departments (name)
VALUES 
('Sales'),
('Engineering'),
('Accounting'),
('Operations');

INSERT INTO roles (job_title, salary, dept_id)
VALUES
('Sales Manager', 150000.00, 1),