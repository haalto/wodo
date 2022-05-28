import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import {
  createNewMeasurement,
  getMeasurementsByEmail,
} from "../../lib/measurementServices";
import { Measurement } from "../../types/types";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Measurement[] | Measurement | Error>
) {
  console.log(req.headers);
  const secret = process.env.JWT_SECRET || "kissasanoomau";

  const token = await getToken({ req, secret });

  console.log(token);
  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const email = token.email;

  if (!email) {
    res.status(400).json({ message: "Email not included in session" });
    return;
  }

  switch (req.method) {
    case "GET":
      return list(req, res)(email);
    case "POST":
      return create(req, res)(email);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const list =
  (req: NextApiRequest, res: NextApiResponse) => async (email: string) => {
    const result = await getMeasurementsByEmail(email);
    res.status(200).json(result as Measurement[]);
  };

const create =
  (req: NextApiRequest, res: NextApiResponse) => async (email: string) => {
    const { weight } = req.body;
    if (!weight) {
      res.status(400).json({ message: "Weight not included in request" });
      return;
    }
    const success = await createNewMeasurement(email, weight);
    if (!success) {
      res.status(500).json({ message: "Failed to create measurement" });
    }
    res.status(200).json({ message: "Successfully created measurement" });
  };
