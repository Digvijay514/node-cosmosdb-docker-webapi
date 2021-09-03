  //  <createDatabaseAndContainer>
const config = require("../config");
const CosmosClient = require("@azure/cosmos").CosmosClient;
let _container;

/*
// This script ensures that the database is setup and populated correctly
*/
async function create(client, databaseId, containerId) {
  const partitionKey = config.partitionKey;

  /**
   * Create the database if it does not exist
   */
  const { database } = await client.databases.createIfNotExists({
    id: databaseId
  });
  console.log(`Created database:\n${database.id}\n`);

  /**
   * Create the container if it does not exist
   */
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    );

  console.log(`Created container:\n${container.id}\n`);
}

const initDb = async () => {
  // <CreateClientObjectDatabaseContainer>
  try {
    const { endpoint, key, databaseId, containerId } = config;
  
    const client = new CosmosClient({ endpoint, key });
  
    const database = client.database(databaseId);
    const container = database.container(containerId);
    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);
    // </CreateClientObjectDatabaseContainer>

    console.log("Database Initialized");
    _container = container;

  } catch (err) {
    throw err
  }
}

const getContainer = () => {
  if(!_container) {
    console.error("DB not initialized!")
  }
  return _container;
}

module.exports = { create, getContainer, initDb };
  //  </createDatabaseAndContainer>
