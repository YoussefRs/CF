const mysql = require("mysql2/promise");
const fs = require("fs").promises;
const path = require("path");

async function executeSchemaScript() {
  try {
    const connection = await createConnectionWithoutDatabase();
    const sqlScriptPath = path.join(__dirname, "schema.sql");
    const sqlScript = await fs.readFile(sqlScriptPath, "utf8");
    const sqlStatements = sqlScript.split(';').filter(statement => statement.trim() !== '');
    for (const statement of sqlStatements) {
      await connection.query(statement);
    }
    await connection.end();
  } catch (err) {
    console.error("Error executing schema SQL script:", err);
  }
}


async function createConnectionWithoutDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "youssefdb!",
      database: "city_flat",
    });
    console.log("Connected to City Flat");
    return connection;
  } catch (err) {
    console.error("Error connecting to MySQL server:", err);
    throw err; // Rethrow the error to notify the caller
  }
}

async function createDatabase() {
  try {
    const connection = await createConnectionWithoutDatabase();
    await connection.query("CREATE DATABASE IF NOT EXISTS city_flat");
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err);
  }
}

async function startScript() {
  await createDatabase();
  await executeSchemaScript();
}

module.exports = { startScript, createConnectionWithoutDatabase };
