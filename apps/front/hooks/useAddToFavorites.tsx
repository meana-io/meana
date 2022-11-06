import { Params } from '@/utility/router';
import { useState } from 'react';

const hashParams = (...params: string[]) => params.join('/');

export const useAddToFavorites = (
  componentName: string,
  apiRoute: string,
  query: Params
) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const onAdd = () => {
    setIsFavorite(true);
  };
  const onRemove = () => {
    setIsFavorite(false);
  };
  return {
    isFavorite,
    onAdd,
    onRemove,
  };
};
