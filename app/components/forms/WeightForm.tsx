import React, { useState } from "react";
import { WeightInput } from "./WeightInput";

type Props = {
  onSubmit: (value: number) => void;
  initialValue: string;
};

export const WeightForm: React.FC<Props> = ({ onSubmit, initialValue }) => {
  const [weight, setWeight] = useState<string>(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWeight = parseFloat(weight);
    if (typeof parsedWeight === "string") {
      return;
    }
    onSubmit(parsedWeight);
    setWeight("");
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
