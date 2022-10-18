import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axios.get(`http://135.125.190.40:3333/api/node-ram`, {
    data: {
      where: {
        nodeId: req.query.id,
      },
      linit: 50,
    },
  });

  res.json(data);
}
