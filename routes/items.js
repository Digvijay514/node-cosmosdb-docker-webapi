const router = require("express").Router();
const { getAllItems, getItemById, createItem, updateItemById, deleteItemById } = require("../handlers/items");

// Item Routes
router.get("/", getAllItems);
router.get("/:category/:id", getItemById);
router.post("/", createItem);
router.put("/:category/:id", updateItemById);
router.delete("/:category/:id", deleteItemById);

module.exports = router; 

