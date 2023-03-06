// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// API routes are like a express / rapid / fastify / etc. server

// API routes functions works as serverless functions (AWS Lambda, Azure Functions, Google Cloud Functions, etc.)
// The service will be up only when a request is made to the API route

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}
