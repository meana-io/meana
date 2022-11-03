import { Card, CardContent, CardHeader, CardProps } from '@mui/material';

const ComponentPreview: React.FC<CardProps> = ({
  title,
  onClick,
  children,
}) => {
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer', height: 250 }}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ComponentPreview;
