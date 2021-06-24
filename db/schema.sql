DROP DATABASE IF EXISTS empl_mngmt;

CREATE DATABASE empl_mngmt;

USE empl_mngmt;

CREATE TABLE departments (
    dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);

CREATE TABLE employees (
    empl_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    mngr_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL,
    FOREIGN KEY (mngr_id) REFERENCES roles(role_id) ON DELETE SET NULL
);
