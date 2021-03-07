// require dependencies
const AWS = require("aws-sdk");
const fs = require("fs");
// config points to local instance,
// updates local environmental variables
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});
// create the dynamodb service object using the DynamoDB.DocumentClient() class. This class offers a level of abstraction that enables us to use JavaScript objects as arguments and return native JavaScript types. This constructor helps map objects, which reduces impedance mismatching and speeds up the development process. specifying the API version ensures compatibility and latest long-term support version (LTS)
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
// alert user of progress
console.log("Importing thoughts into DynamoDB. Please wait.");
// use node file-system to return the contents of the users.json seed file
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/users.json", "utf8")
);
// create params object for each object in seed data and put into the dynamodb
allUsers.forEach((user) => {
  const params = {
    TableName: "Thoughts",
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought,
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add thought",
        user.username,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});
