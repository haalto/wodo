import { Table } from "dynamodb-toolbox";
import DynamoDB from "aws-sdk/clients/dynamodb";

const wodoTable = process.env.DYNAMODB_TABLE || "WodoTable";

export const client = new DynamoDB.DocumentClient({
  region: process.env.REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

export const WodoTable = new Table({
  // Specify table name (used by DynamoDB)
  name: wodoTable,

  // Define partition and sort keys
  partitionKey: "PK",
  sortKey: "SK",

  // Add the DocumentClient
  DocumentClient: client,
});
