import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import db from "./dynamodb";
import { v4 } from "uuid";

const measurementTable = process.env.DYNAMODB_TABLE || "MeasurementTable";

export const getMeasurementsByEmail = async (email: string) => {
  const result = await db.send(
    new QueryCommand({
      TableName: measurementTable,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    })
  );

  if (result.$metadata.httpStatusCode !== 200) {
    return false;
  }

  return result.Items;
};

export const createNewMeasurement = async (email: string, weight: number) => {
  const result = await db.send(
    new PutCommand({
      TableName: measurementTable,
      Item: {
        id: v4(),
        email,
        timestamp: new Date().toISOString(),
        weight: weight,
      },
    })
  );

  if (result.$metadata.httpStatusCode !== 200) {
    return false;
  }

  return true;
};
