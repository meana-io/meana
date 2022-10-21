import { NextPage } from 'next';

import ServerForm from '@/components/AddServer/ServerForm';

interface AddNewNodePageProps {}

const AddNewNode: NextPage<AddNewNodePageProps> = ({}) => {
  return <ServerForm />;
};

export default AddNewNode;
