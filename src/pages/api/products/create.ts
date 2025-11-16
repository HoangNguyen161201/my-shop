import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('myShop');

    const total = await db.collection('products').countDocuments();

    const newProduct = {
      ...req.body,
      id: `SP-${(total || 0) + 1}`
    };

    await db.collection('products').insertOne(newProduct);

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });

  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}