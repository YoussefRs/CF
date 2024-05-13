const mysql = require("mysql2/promise");
const fs = require("fs").promises;
const path = require("path");

async function executeSchemaScript(connection) {
  try {
    const sqlScriptPath = path.join(__dirname, "schema.sql");
    const sqlScript = await fs.readFile(sqlScriptPath, "utf8");
    const sqlStatements = sqlScript
      .split(";")
      .filter((statement) => statement.trim() !== "");
    for (const statement of sqlStatements) {
      await connection.query(statement);
    }
  } catch (err) {
    console.error("Error executing schema SQL script:", err);
    throw err;
  }
}

async function createConnectionWithoutDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "youssefdb!",
    });
    return connection;
  } catch (err) {
    console.error("Error connecting to MySQL server:", err);
    throw err;
  }
}

async function createDatabase() {
  try {
    const connection = await createConnectionWithoutDatabase();
    // Create the database if it doesn't exist
    await connection.query("CREATE DATABASE IF NOT EXISTS city_flat");
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err);
  }
}

async function startScript() {
  try {
    // Create the database
    await createDatabase();

    // Connect to the newly created database
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "youssefdb!",
      database: "city_flat",
    });
    console.log("Connected to City Flat");
    await executeSchemaScript(connection);
    return connection;
  } catch (err) {
    console.error("Error connecting to City Flat database:", err);
    throw err;
  }
}

module.exports = {
  startScript,
};
