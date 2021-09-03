// @ts-check
//  <ImportConfiguration>
const express = require("express");
const app = express();
const { initDb } = require("./data/databaseContext");
const items = require("./routes/items")
//  </ImportConfiguration>

const PORT = 3000;

async function main() {  
  // Initialize database if not initialized
  await initDb();
  app.use(express.json());
  app.use("/items", items);

  app.listen(PORT, () => console.log("Api running on port 3000"));
}

main();
