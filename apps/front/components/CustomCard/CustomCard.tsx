import { Card, CardContent, CardHeader } from '@mui/material';
import ToogleToDashboard from '../ToogleToDashboard/ToogleToDashboard';

interface CustomCardProps {
  title: string;
  hash: string;
  value?: string;
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
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
      {value && <CardContent sx={{ height: '100%' }}>{value}</CardContent>}
      {children && (
        <CardContent sx={{ height: '100%' }}>{children}</CardContent>
      )}
    </Card>
  );
};

export default CustomCard;
