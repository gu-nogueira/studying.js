import { NextApiRequest, NextApiResponse } from "next";

// Next API routes can receive dynamic segments in the form of an array
// E. g. /api/users/1/2/3 will be received as ["1", "2", "3"]
// For that, the file name must be [...params].tsx
// For receiving a single dynamic segment, the file name must be [id].tsx

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  console.log(req.query)

  return res.status(200).json({ id });
}