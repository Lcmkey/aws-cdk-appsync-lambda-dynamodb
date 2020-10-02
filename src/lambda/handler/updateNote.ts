const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
import { Note } from "../models/Note";

interface Params {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
}

const updateNote = async (note: Note) => {
  let params: Params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id: note.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };

  let prefix = "set ";

  for (const [k, v] of Object.entries(note)) {
    if (k !== "id") {
      params["UpdateExpression"] += prefix + "#" + k + " = :" + k;
      params["ExpressionAttributeValues"][":" + k] = v;
      params["ExpressionAttributeNames"]["#" + k] = k;
      prefix = ", ";
    }
  }

  console.log("params: ", params);

  try {
    await docClient.update(params).promise();

    return note;
  } catch (err) {
    console.log("DynamoDB error: ", err);

    return null;
  }
};

export default updateNote;
