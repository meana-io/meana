import { Card, CardContent, Typography } from '@mui/material';

import { toTitleCase } from '@/utility/toTitleCase';
import Ram from '@/types/ram';

interface RamDetailsProps {
  ram: Ram;
}

const RamDetails: React.FC<RamDetailsProps> = ({ ram }) => {
  const keysToDisplay: (keyof Ram)[] = [
    'path',
    'capacity',
  ];

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          Ram - {ram?.path}
        </Typography>
      </CardContent>
      <CardContent>
        {keysToDisplay.map((key) => (
          <Typography key={key} component="div" variant="h6">
            {toTitleCase(key)}: {ram?.[key] ?? 'N/A'}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default RamDetails;
