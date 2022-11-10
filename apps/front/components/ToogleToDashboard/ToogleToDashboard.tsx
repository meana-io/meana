import { IconButton, Tooltip } from '@mui/material';
import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import useDashboard from '@/hooks/useDashboard';

interface ToogleToDashboardProps {
  hash: string;
}

const ToogleToDashboard: React.FC<ToogleToDashboardProps> = ({ hash }) => {
  const { addToDashboard, removeFormDashboard, isActive } = useDashboard();
  const isAddedToDashboard = isActive(hash);

  return (
    <Tooltip
      title={isAddedToDashboard ? 'Remove form Dashboard' : 'Add to Dashboard'}
    >
      <IconButton
        color="secondary"
        onClick={() =>
          isAddedToDashboard ? removeFormDashboard(hash) : addToDashboard(hash)
        }
      >
        {isAddedToDashboard ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToogleToDashboard;
