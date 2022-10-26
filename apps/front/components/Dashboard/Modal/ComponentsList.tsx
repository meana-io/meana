import { Grid } from '@mui/material';
import { Component } from './DashboardModal';

import ListItem from './ListItem';

interface ComponentsListProps {
  components: Component[];
}

const ComponentsList: React.FC<ComponentsListProps> = ({ components }) => {
  return (
    <Grid container spacing={2} marginTop={4}>
      {components.map((component) => (
        <Grid item xs={6} md={4} key={component.key}>
          <ListItem component={component} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ComponentsList;
