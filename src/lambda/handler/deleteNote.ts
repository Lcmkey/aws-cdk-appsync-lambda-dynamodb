const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

const deleteNote = async (id: String) => {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id,
    },
  };

  try {
    await docClient.delete(params).promise();

    return id;
  } catch (err) {
    console.log("DynamoDB error: ", err);

    return null;
  }
};

export default deleteNote;
