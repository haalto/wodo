import { useRouter } from "next/router";

export const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex text-center font-bold items-center justify-center"
      onClick={() => router.push("/")}
    >
      <p className="font-russo">WEIGHT TRACKER</p>
    </div>
  );
};
