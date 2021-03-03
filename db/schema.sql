CREATE DATABASE vaccine_db;
USE vaccine_db;

CREATE TABLE patient (
id INT AUTO_INCREMENT NOT NULL,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
age INT NOT NULL,
height INT,
weight INT,
vaccinated BOOLEAN NOT NULL DEFAULT FALSE,
phoneNum VARCHAR(14),
PRIMARY KEY(id)
);