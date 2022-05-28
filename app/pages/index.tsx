import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";
import { WeightForm } from "../components/forms/WeightForm";
import { createMeasurement } from "../hooks/api/api";
import { useMeasurements } from "../hooks/api/useMeasurements";
import { NewMeasurement } from "../types/types";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data } = useMeasurements();
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

  return (
    <main>
      <section>
        <h1 className="text-3xl">Hello,</h1>
        <h2 className="text-3xl font-bold">
          {session?.user?.name?.split(" ")[0]}
        </h2>
      </section>
      <section className="mt-5">
        <WeightForm onSubmit={handleMeasurementSubmission} />
      </section>
      <section className="mt-5">
        <h2 className="text-3xl">Your measurements</h2>
        <div>
          {data?.map((m) => (
            <div key={m.id}>
              <div>{m.weight}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
