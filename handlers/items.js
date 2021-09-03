const { getContainer } = require("../data/databaseContext");

const getAllItems = async (req, res, next) => {
    const container = getContainer();
    try {
        // <QueryItems>    
        // query to return all items
        const querySpec = {
            query: "SELECT * from c"
        };
        
        // read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        res.status(200).json(items);
        // </QueryItems>
    } catch(err) {
        console.log(err.message);
    }
}

const getItemById = async (req, res, next) => {
    const container = getContainer();

    try {
        const {id, category} = req.params;
        
        const { resource: item } = await container.item(id, category).read();
        if(item) {
            
            res.status(200).json(item);
        } else {
            res.status(404).json({message: "Item not found"});
        }

    } catch(err) { 
        console.error(err.message);
    }
}

const createItem = async (req, res, next) => {
    const container = getContainer();

    try {
        // <CreateItem>
        /** Create new item newItem is defined at the top of this file */

        const newItem = req.body;
        const { resource: createdItem } = await container.items.create(newItem);
        res.status(201).json({message: "Item Created", item: createdItem});
        // </CreateItem>
    } catch (err) {
        console.error(err.message);
    }
}

const updateItemById = async (req, res, next) => {
    const container = getContainer();

    try {
        // <UpdateItem>
        /** Update item
         * Pull the id and partition key value from the newly created item.
         * Update the isComplete field to true.
         */
        const { id, category } = req.params;
        const item = req.body;

        const { resource: updatedItem } = await container
        .item(id, category)
        .replace(item);

        console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`); 
        console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);

        res.status(200).json({message: "Item updated", data: updatedItem})
        // </UpdateItem>
    } catch (err) {
        console.error(err.message);
    }
}

const deleteItemById = async (req, res, next) => {
    const container = getContainer();

    try {
        // <DeleteItem>    
        /**
         * Delete item
         * Pass the id and partition key value to delete the item
         */

        const { id, category } = req.params;
        const { resource: result } = await container.item(id, category).delete();
        res.status(200).json({message: "Item Deleted", data: result});
        // </DeleteItem>  

    } catch(err) {
        res.status(400);
        console.error(err.message);
    }
}

module.exports = {
    getAllItems, getItemById, createItem, updateItemById, deleteItemById
}