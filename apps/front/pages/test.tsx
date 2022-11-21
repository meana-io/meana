import { NextPage } from 'next';
import BaseLayout from '@/layouts/Base/BaseLayout';
import Progress from '@/components/Progress/Progress';

const Settings: NextPage = () => {
  return (
    <BaseLayout>
      <Progress />
    </BaseLayout>
  );
};

export default Settings;
