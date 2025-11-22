import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("accesses");

    if (req.method === "POST") {
      const count = await collection.count();

      if (!count || count == 0) {
        // Chưa có → tạo mới
        await collection.insertOne({ count: 1 });
        return res.status(200).json({
          message: "Created new access record",
          success: true,
        });
      } else {
        // Có rồi → tăng count
        const existing = await collection.find().toArray();
        await collection.findOneAndUpdate(
          { _id: existing[0]._id },
          { $inc: { count: 1 } },
          { returnDocument: "after" }
        );
        return res.status(200).json({
          message: "Updated access count",
          success: true,
        });
      }
    } else if (req.method === "GET") {
      const existing = await collection.find().toArray();

      if (!existing || existing.length == 0) {
        return res.status(200).json({
          message: "No access record found",
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "Access record found",
          success: true,
          access: existing[0],
        });
      }
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}