// require dependencies
const AWS = require("aws-sdk");

// config points to local instance,
// updates local environmental variables
AWS.config.update({
  region: "us-east-2",
});
// create the dynamodb service object using the DynamoDB class. specifying the API version ensures compatibility and latest long-term support version (LTS)
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// this params object holds the schema and metadata of the table. keys indicate properties and values indicate schema configurations.
const params = {
  TableName: "Thoughts",
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH" }, //Partition key
    { AttributeName: "createdAt", KeyType: "RANGE" }, //Sort key. using createdAt as the sort key is a benefit because queries will automatically sort by this value which orders thoughts by most recent entry. the sort key is used in combination with the partition key to create a composite key.
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" }, // "S" indicates a string data type
    { AttributeName: "createdAt", AttributeType: "N" }, // "N" indicates a number data type
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
    // this setting reverse a maximum write and read capacity of the database which is how AWS factors in pricing
  },
};
// create table method using schema params
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
