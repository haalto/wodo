type Props = {
  value: number | string;
  onSave: (value: number | string) => void;
};

export const WeightInput: React.FC<Props> = ({ onSave, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(e.target.value);

    if (isNaN(parsedValue)) {
      return onSave("");
    }

    if (parsedValue < 0) {
      return onSave("");
    }

    onSave(parsedValue);
  };

  return (
    <div>
      <input
        type="number"
        min="0"
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};
