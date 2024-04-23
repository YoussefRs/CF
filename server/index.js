const app = require("./src/app");
const { startScript } = require("./config/db");
const dotenv = require("dotenv");

//Run env file
dotenv.config();

// Run database setup script
startScript();

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
