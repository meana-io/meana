import { Grid } from '@mui/material';
import { Components } from '../Components';

import ListItem from './ListItem';

interface ComponentsListProps {
  components: Components;
}

const ComponentsList: React.FC<ComponentsListProps> = ({ components }) => {
  return (
    <Grid container spacing={2} marginTop={4}>
      {Object.entries(components).map(([key, component]) => (
        <Grid item xs={6} md={4} key={key}>
          <ListItem component={component} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ComponentsList;
