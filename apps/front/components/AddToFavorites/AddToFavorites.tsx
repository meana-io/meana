import { IconButton, Tooltip } from '@mui/material';
import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';
import { useAddToFavorites } from '@/hooks/useAddToFavorites';

interface AddToFavoritesProps {}

const AddToFavorites: React.FC<AddToFavoritesProps> = ({}) => {
  const { isFavorite, onAdd, onRemove } = useAddToFavorites('awd');

  return (
    <Tooltip title={isFavorite ? 'Remove from dashboard' : 'Add to dashboard'}>
      <IconButton color="secondary" onClick={isFavorite ? onRemove : onAdd}>
        {isFavorite ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default AddToFavorites;
