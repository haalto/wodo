import React, { useState } from "react";
import { WeightInput } from "./WeightInput";

type Props = {
  onSubmit: (value: number) => void;
};

export const WeightForm: React.FC<Props> = ({ onSubmit }) => {
  const [weight, setWeight] = useState<number | string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof weight === "string") {
      return;
    }
    onSubmit(weight);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Add new measurement</label>
        <WeightInput onSave={setWeight} value={weight} />
        <button className="border-2 w-20" type="submit">
          Add
        </button>
      </form>
    </>
  );
};
