import { useGetNodeCpu } from '@/api/cpu';
import CustomCard from '@/components/CustomCard/CustomCard';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';

interface CpuCustomCardProps {
  hash: string;
}

const CpuCustomCard: React.FC<CpuCustomCardProps> = ({ hash }) => {
  const [_, query, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeCpu(query, { limit: 1 });

  if (isLoading) {
    return <Progress />;
  }

  return (
    <CustomCard hash={hash} title={title} value={data?.at(0)[key] || 'N/A'} />
  );
};

export const COMPONENT_NAME = 'cpu_custom_card';

export default CpuCustomCard;
