CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Apartment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    bedroom INT NOT NULL,
    bathroom INT NOT NULL,
    parking BOOLEAN NOT NULL DEFAULT false,
    food BOOLEAN NOT NULL DEFAULT false,
    laundry BOOLEAN NOT NULL DEFAULT false,
    rent BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    default_special_date JSON
);

CREATE TABLE IF NOT EXISTS Price (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apartment_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (apartment_id) REFERENCES Apartment(id)
);

CREATE TABLE IF NOT EXISTS Image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apartment_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (apartment_id) REFERENCES Apartment(id)
);

CREATE TABLE IF NOT EXISTS Reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    apartmentId INT NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    servicesFee DECIMAL(10, 2) NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (apartmentId) REFERENCES Apartment(id)
);
