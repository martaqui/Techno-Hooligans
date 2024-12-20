const app = require("./app");
require("dotenv").config();

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

const tokenSecret = process.env.TOKEN_SECRET;
console.log("Token Secret:", tokenSecret);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});