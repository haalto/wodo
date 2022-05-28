export type Measurement = {
  id: string;
  email: string;
  timestamp: string;
  weight: number;
};

export type NewMeasurement = Omit<Measurement, "id" | "email">;
