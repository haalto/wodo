import { useQuery } from "react-query";
import { Measurement } from "../../types/types";
import { getMeasurements } from "./api";

const validateMeasurement = (measurement: Measurement) => {
  return !!measurement.weight && measurement.timestamp;
};

export const useMeasurements = () => {
  const query = useQuery<unknown, unknown, Measurement[]>(
    "measurements",
    getMeasurements
  );

  return {
    ...query,
    data: query.data?.filter((measurement) => validateMeasurement(measurement)),
  };
};
