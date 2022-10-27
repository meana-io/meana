import { useGetNodeCpu } from '@/hooks/queries/useNodeCpu';
import { Typography } from '@mui/material';
import BaseCardComponent from '../Base';

interface CpuComponentProps {
  query: string;
}

const CpuComponent: React.FC<CpuComponentProps> = ({ query }) => {
  const { data: cpu } = useGetNodeCpu(query);
  return (
    <BaseCardComponent title="CPU">
      <Typography component="div" variant="h6">
        Frequency: {cpu[0]?.frequency}
      </Typography>
      <Typography component="div" variant="h6">
        CoresQuantity: {cpu[0]?.coresQuantity}
      </Typography>
      <Typography component="div" variant="h6">
        Manufacture: {cpu[0]?.manufacture}
      </Typography>
      <Typography component="div" variant="h6">
        Model: {cpu[0]?.model}
      </Typography>
    </BaseCardComponent>
  );
};

export default CpuComponent;
