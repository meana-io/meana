import { useGetNode } from '@/api/nodes';
import { useGetNodeRamStick } from '@/api/ram';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';

interface RamCustomCardProps {
  hash: string;
}

const RamCustomCard: React.FC<RamCustomCardProps> = ({ hash }) => {
  const [_, query, ramLocator, title, key] = deHashParams(hash);
  const { data: ramSticks, isLoading: isLoadingRamSticks } =
    useGetNodeRamStick(query);

  const { data: node, isLoading: isLoadingNodeName } = useGetNode(query);

  if (isLoadingRamSticks || isLoadingNodeName) {
    return <Progress />;
  }

  const ramStick = ramSticks?.find(({ locator }) => locator === ramLocator);

  return (
    <DashboardCard title={`${node.name}: ${ramLocator} - ${title}`} hash={hash}>
      {(ramStick && ramStick[key]) || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'ram_custom_card';

export default RamCustomCard;
