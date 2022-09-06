import { Entity } from "dynamodb-toolbox";
import { WodoTable } from "./dynamodb";

export const Measurement = new Entity({
  name: "Measurement",
  attributes: {
    email: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    id: ["sk", 1],
    date: ["sk", 0],
    weight: { type: "number", required: true },
  },
  table: WodoTable,
});
