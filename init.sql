CREATE DATABASE water_management;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE consumption (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    consumption_value INT NOT NULL,
    consumption_date DATE NOT NULL,
    water_usage INT NOT NULL,
    bill_amount NUMERIC(10, 2) NOT NULL
);

-- Insert sample
INSERT INTO users (name, email, password) VALUES ('John Doe', 'john.doe@example.com', 'password123');

INSERT INTO consumption (user_id, consumption_value, consumption_date, water_usage, bill_amount)
VALUES
    (1, 150, '2024-01-15', 50, 20.00),
    (1, 200, '2024-02-15', 60, 25.00);