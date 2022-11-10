import { useGetNodeRam } from '@/api/ram';
import CustomCard from '@/components/CustomCard/CustomCard';
import { deHashParams } from '@/utility/hashParams';

interface RamCustomCardProps {
  hash: string;
}

const RamCustomCard: React.FC<RamCustomCardProps> = ({ hash }) => {
  const [_, query, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeRam(query, { limit: 1 });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <CustomCard hash={hash} title={title} value={data?.at(0)[key] || 'N/A'} />
  );
};

export const COMPONENT_NAME = 'ram_custom_card';

export default RamCustomCard;
