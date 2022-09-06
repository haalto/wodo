import { Entity } from "dynamodb-toolbox";
import { WodoTable } from "./dynamodb";

export const User = new Entity({
  name: "User",
  attributes: {
    email: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    name: { type: "string" },
    height: { type: "number" },
  },
  table: WodoTable,
});
