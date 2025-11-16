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

    const newProduct = {
      ...req.body,
    };

    await db.collection('videoTiktoks').insertOne(newProduct);

    return res.status(201).json({
      message: 'Video url created successfully',
      product: newProduct,
    });

  } catch (error: any) {
    console.error('Error creating video url:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}