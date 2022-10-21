import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axios.post(
    `http://vps-5c7e69c7.vps.ovh.net:3333/api/nodes`,
    req.body
  );

  res.json(data);
}
