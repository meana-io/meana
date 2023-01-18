import { Card, CardContent, CardHeader } from '@mui/material';
import ToogleToDashboard from '../ToogleToDashboard/ToogleToDashboard';

interface DashboardCardProps {
  title: string;
  hash: string;
  value?: string;
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  hash,
  children,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <CardHeader title={title} action={<ToogleToDashboard hash={hash} />} />
      {value && <CardContent>{value}</CardContent>}
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default DashboardCard;
