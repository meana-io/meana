import { Alert, Card, CardContent } from '@mui/material';

const NoData: React.FC = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Alert severity="info">No data</Alert>
      </CardContent>
    </Card>
  );
};

export default NoData;
