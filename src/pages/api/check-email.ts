import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method != "POST") {
      return res.status(405).json({ message: "Method not allow" });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ message: "Email có tồn tại", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy email", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
