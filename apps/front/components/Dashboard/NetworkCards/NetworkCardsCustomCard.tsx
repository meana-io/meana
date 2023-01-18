import { useGetDashboardNetworkCards } from '@/api/networkCards';
import { useGetNode } from '@/api/nodes';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';

interface NetworkCardsCustomCardProps {
  hash: string;
}

const NetworkCardsCustomCard: React.FC<NetworkCardsCustomCardProps> = ({
  hash,
}) => {
  const [_, query, name, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetDashboardNetworkCards(query, name);
  const { data: node, isLoading: isLoadingNodeName } = useGetNode(query);

  if (isLoading || isLoadingNodeName) {
    return <Progress />;
  }

  return (
    <DashboardCard title={`${node.name}: ${title}`} hash={hash}>
      {data?.at(0)[key] || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'network_cards_custom_card';

export default NetworkCardsCustomCard;
