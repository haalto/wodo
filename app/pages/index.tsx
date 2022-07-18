import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";
import { WeightForm } from "../components/forms/WeightForm";
import { createMeasurement } from "../hooks/api/api";
import { useMeasurements } from "../hooks/api/useMeasurements";
import { Measurement, NewMeasurement } from "../types/types";
import { Chart } from "react-chartjs-2";
import chartTrendline from "chartjs-plugin-trendline";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  chartTrendline
);
import { DateTime } from "luxon";
import { MeasurementsTable } from "../components/MeasurementsTable";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useMeasurements();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newMeasurement: NewMeasurement) => createMeasurement(newMeasurement),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("measurements");
      },
    }
  );

  const handleMeasurementSubmission = async (weight: number) => {
    const measurement: NewMeasurement = {
      weight,
      timestamp: new Date().toISOString(),
    };
    mutation.mutate(measurement);
  };

  const getLatestValue = (measurements: Measurement[]) => {
    const latestMeasurement = [...measurements].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })[0];
    return latestMeasurement ? latestMeasurement.weight : "";
  };

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  const sortedData = [...data].sort((a, b) =>
    DateTime.fromISO(a.timestamp) > DateTime.fromISO(b.timestamp) ? 1 : -1
  );

  const labels = sortedData.map((m) =>
    DateTime.fromISO(m.timestamp).toFormat("dd LLLL")
  );
  const weightData = sortedData.map((m) => m.weight);

  return (
    <main className="flex flex-col space-y-6">
      <section>
        <h1 className="text-2xl">Hello,</h1>
        <h2 className="text-3xl font-bold">
          {session?.user?.name?.split(" ")[0]}
        </h2>
        <div className="mt-5">
          Today is <strong>{DateTime.now().toFormat("dd LLLL yyyy")}</strong>
        </div>
      </section>
      <section className="mt-5">
        <WeightForm
          onSubmit={handleMeasurementSubmission}
          initialValue={getLatestValue(data).toString()}
        />
      </section>
      <section className="mt-5">
        <h2 className="text-3xl">Weight </h2>
        <div>
          <Chart
            type={"line"}
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Weight",
                  data: weightData,
                  fill: true,
                  borderColor: "rgb(75, 192, 192)",
                  trendlineLinear: {
                    style: "rgba(255,105,180, .8)",
                    lineStyle: "dotted",
                    width: 2,
                    projection: true,
                  },
                },
              ],
            }}
          />
        </div>
      </section>
      <section>
        <h2 className="text-3xl">Latest measrurements </h2>
        <MeasurementsTable
          measurements={[
            ...sortedData.slice(sortedData.length - 7, sortedData.length),
          ].reverse()}
        />
      </section>
    </main>
  );
};

export default Home;
