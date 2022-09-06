/**
 * Script to migrate old data to new data structure.
 */
import { client } from "../lib/dynamodb";
import { Measurement } from "../lib/Measurement";

type OldMeasurement = {
  email: string;
  id: string;
  weight: number;
  timestamp: string;
};

const getOldMeasurements = async (email: string) => {
  const response = client.query({
    TableName: "MeasurementTable",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  });
  const { Items } = await response.promise();
  return Items;
};

const migrate = async (measurements: OldMeasurement[]) => {
  for (const measurement of measurements || []) {
    const { id, email, timestamp, weight } = measurement;
    const newMeasurement = {
      email,
      weight,
      sk: [timestamp, id],
      date: timestamp,
      id,
    };
    await Measurement.put(newMeasurement);
  }
};

(async () => {
  const email = process.argv[2];
  const oldMeasurements = (await getOldMeasurements(email)) as OldMeasurement[];
  if (oldMeasurements) {
    await migrate(oldMeasurements);
  }
})();
