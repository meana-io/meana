import { useGetNodeDisk } from '@/api/disks';
import CustomCard from '@/components/CustomCard/CustomCard';
import Progress from '@/components/Progress/Progress';
import { toFormatBytesInNumber } from '@/utility/formatBytes';
import { deHashParams } from '@/utility/hashParams';

interface DiskCustomCardProps {
  hash: string;
}

const DiskCustomCard: React.FC<DiskCustomCardProps> = ({ hash }) => {
  const [_, nodeId, diskName, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeDisk(nodeId, diskName);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <CustomCard
      hash={hash}
      title={title}
      value={toFormatBytesInNumber(data?.at(0)[key]) || 'N/A'}
    />
  );
};

export const COMPONENT_NAME = 'disk_custom_card';

export default DiskCustomCard;
