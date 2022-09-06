import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { v4 } from "uuid";
import { Measurement } from "../../lib/Measurement";

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | any | Error>
) {
  const secret = process.env.JWT_SECRET || "kissasanoomau";

  const token = await getToken({ req, secret });

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
    const { Items } = await Measurement.query(email, {
      filters: { attr: "entity", eq: "Measurement" },
    });
    res.status(200).json(Items);
  };

const create =
  (req: NextApiRequest, res: NextApiResponse) => async (email: string) => {
    const { weight, date } = req.body;
    if (!weight) {
      res.status(400).json({ message: "Weight not included in request" });
      return;
    }

    try {
      const id = v4();
      await Measurement.put({ email, weight, sk: [date, id], date, id });
      res.status(200).json({ message: "Successfully created measurement" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Failed to create measurement" });
    }
  };
