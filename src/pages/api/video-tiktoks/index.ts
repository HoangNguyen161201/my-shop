import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('myShop'); // đổi theo tên DB của bạn

    // Lấy tất cả dữ liệu từ collection "tiktoks"
    const tiktoks = await db.collection('videoTiktoks')
      .find({})
      .sort({ _id: -1 })  // sort mới -> cũ
      .toArray();

    res.status(200).json({
      total: tiktoks.length,
      data: tiktoks,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}