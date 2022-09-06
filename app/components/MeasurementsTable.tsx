import { DateTime } from "luxon";
import { Measurement } from "../types/types";

const MeasurementRow = ({ data }: { data: Measurement }) => {
  const lxd = DateTime.fromISO(data.date);
  return (
    <tr>
      <td className="font-bold">{data.weight.toPrecision(3)}</td>
      <td>{lxd.toFormat("cccc HH:ss dd MMM")}</td>
    </tr>
  );
};

type MeasurementsTableProps = {
  measurements: Measurement[];
};

export const MeasurementsTable: React.FC<MeasurementsTableProps> = ({
  measurements,
}) => {
  return (
    <table>
      <tbody>
        {measurements.map((m, i) => (
          <MeasurementRow key={i} data={m} />
        ))}
      </tbody>
    </table>
  );
};
