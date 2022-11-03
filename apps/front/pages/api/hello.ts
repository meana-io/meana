import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const layout = {
    'ram_component/1': {
      x: 1,
      y: 0,
      w: 1,
      h: 1,
      i: 'ram_component/1',
      key: 'ram_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
    'cpu_component/1': {
      x: 0,
      y: 1,
      w: 1,
      h: 1,
      i: 'cpu_component/1',
      key: 'cpu_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
    'cpu_component/2': {
      x: 2,
      y: 0,
      w: 1,
      h: 1,
      i: 'cpu_component/2',
      key: 'cpu_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
    'cpu_component/3': {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: 'cpu_component/3',
      key: 'cpu_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
    'cpu_component/4': {
      x: 1,
      y: 2,
      w: 1,
      h: 1,
      i: 'cpu_component/4',
      key: 'cpu_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
    'cpu_component/5': {
      x: 2,
      y: 1,
      w: 1,
      h: 1,
      i: 'cpu_component/5',
      key: 'cpu_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
    'cpu_component/6': {
      x: 1,
      y: 1,
      w: 1,
      h: 1,
      i: 'cpu_component/6',
      key: 'cpu_component',
      query: 'dceb57db-49b3-46c3-b091-742583f76c85',
    },
  };

  if (req.method === 'GET') {
    res.status(200).json(layout);
  }
  if (req.method === 'DELETE') {
    const id = req.query.id as string;
    const record = layout[id];
    delete layout[id];
    res.status(200).json(record);
  }

  if (req.method === 'PUT') {
    const data = req.body;
    layout[data.key] = data;
    res.status(200).json(data);
  }
}
