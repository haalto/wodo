type Props = {
  value: string;
  onSave: (value: string) => void;
};

export const WeightInput: React.FC<Props> = ({ onSave, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
      onSave(value);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange}></input>
    </div>
  );
};
