import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axios.post(
    `http://135.125.190.40:3333/api/nodes`,
    req.body
  );

  res.json(data);
}
