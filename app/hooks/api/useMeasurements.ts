import { useQuery } from "react-query";
import { Measurement } from "../../types/types";
import { getMeasurements } from "./api";

export const useMeasurements = () => {
  return useQuery<unknown, unknown, Measurement[]>(
    "measurements",
    getMeasurements
  );
};
