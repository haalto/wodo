import { NewMeasurement } from "../../types/types";

export const getMeasurements = async () => {
  const response = await fetch("api/measurements");

  if (!response.ok) {
    throw new Error(`Could not fetch measurements: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const createMeasurement = async (body: NewMeasurement) => {
  const response = await fetch("api/measurements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Could not create measurement: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
