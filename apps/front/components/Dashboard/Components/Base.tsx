import { Card, CardContent, CardHeader } from '@mui/material';
import { COMPONENT_HEIGHT } from '.';

interface BaseCardComponentProps {
  title: string;
  children: React.ReactNode;
}

const BaseCardComponent: React.FC<BaseCardComponentProps> = ({
  title,
  children,
}) => {
  return (
    <Card sx={{ height: COMPONENT_HEIGHT }}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCardComponent;
