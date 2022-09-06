export type Measurement = {
  id: string;
  email: string;
  date: string;
  weight: number;
};

export type NewMeasurement = Omit<Measurement, "id" | "email">;
