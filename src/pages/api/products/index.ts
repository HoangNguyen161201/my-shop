import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('myShop'); // database của bạn

    // Lấy query param
    const { page = '1', limit = '12', search } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Lấy tổng số products
    const total = await db.collection('products').countDocuments();

    // Lấy danh sách products với pagination
    const products = await db
      .collection('products')
      .find({ deleted: { $ne: true }, $or: [
        { title: { $regex: search, $options: "i" } },
        { id: { $regex: search, $options: "i" } },
      ] }) 
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limitNum)
      .toArray();

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
}