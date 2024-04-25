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

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "youssefdb!",
      database: "city_flat",
    });
    return connection;
  } catch (err) {
    console.error("Error connecting to MySQL server:", err);
    throw err;
  }
}

async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "youssefdb!",
    });
    await connection.query("CREATE DATABASE IF NOT EXISTS city_flat");
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err);
    throw err;
  }
}

async function startScript() {
  try {
    await createDatabaseIfNotExists();
    const connection = await createConnection();
    console.log("Connected to City Flat");
    await executeSchemaScript(connection)
    return connection;
  } catch (err) {
    console.error("Error connecting to City Flat database:", err);
    throw err;
  }
}

module.exports = { startScript };
