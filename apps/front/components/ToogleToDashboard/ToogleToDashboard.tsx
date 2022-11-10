import { IconButton, Tooltip } from '@mui/material';
import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import useDashboard from '@/hooks/useDashboard';

interface ToogleToDashboardProps {
  component: string;
  query: string;
}

const ToogleToDashboard: React.FC<ToogleToDashboardProps> = ({
  component,
  query,
}) => {
  const { addToDashboard } = useDashboard();

  return (
    <Tooltip title={'Add to dashboard'}>
      <IconButton
        color="secondary"
        onClick={() => addToDashboard(component, query)}
      >
        <StarIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ToogleToDashboard;
