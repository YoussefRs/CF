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
    userEmail VARCHAR(255) NOT NULL,
    apartmentId INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status ENUM('Pending', 'Approved', 'Declined') DEFAULT 'Pending',
    isPaid TINYINT(1) NOT NULL DEFAULT 0,
    isProcessed TINYINT(1) NOT NULL DEFAULT 0, -- New property isProcessed
    price DECIMAL(10, 2) NOT NULL DEFAULT '0.00', -- Price in decimal format with 2 decimal places
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (apartmentId) REFERENCES Apartment(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
