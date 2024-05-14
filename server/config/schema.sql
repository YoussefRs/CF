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
    price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Price (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apartment_id INT NOT NULL,
    price DECIMAL(10, 2) ,
    start_date DATE,
    end_date DATE,
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
    nightsCount INT NOT NULL,
    normalNightsCount INT NOT NULL,
    specialNightsCount INT NOT NULL,
    normalNightsPrice DECIMAL(10, 2) NOT NULL,
    specialNightsPrice DECIMAL(10, 2) NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    servicesFee DECIMAL(10, 2) NOT NULL,
    isPaid TINYINT(1) NOT NULL DEFAULT 0,
    isProcessed TINYINT(1) NOT NULL DEFAULT 0, 
    status ENUM('Pending', 'Approved', 'Declined') DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (apartmentId) REFERENCES Apartment(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservationId INT NOT NULL,
    serviceName VARCHAR(255) NOT NULL,
    servicePrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (reservationId) REFERENCES Reservations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ApartmentReview (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apartmentId INT NOT NULL,
    userId INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apartmentId) REFERENCES Apartment(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);