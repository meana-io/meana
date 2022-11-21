import { useGetNodeDiskPartitionsList } from '@/api/diskPartitions';
import CustomCard from '@/components/CustomCard/CustomCard';
import Progress from '@/components/Progress/Progress';
import { toFormatBytesInNumber } from '@/utility/formatBytes';
import { deHashParams } from '@/utility/hashParams';

interface PartitionCustomCardProps {
  hash: string;
}

const PartitionCustomCard: React.FC<PartitionCustomCardProps> = ({ hash }) => {
  const [_, usedSpace, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeDiskPartitionsList(usedSpace, {
    limit: 1,
  });

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

export const COMPONENT_NAME = 'partition_custom_card';

export default PartitionCustomCard;
