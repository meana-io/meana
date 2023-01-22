import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import CustomCard from '@/components/CustomCard/CustomCard';

import RamStick from '@/types/ramStick';
import { toTitleCase } from '@/utility/toTitleCase';
import { useRouter } from 'next/router';
import { hashParams } from '@/utility/hashParams';
import { COMPONENT_NAME } from '@/components/Dashboard/Ram/RamCustomCard';
interface RamStickkDetailsProps {
  ramSticks: RamStick[];
}

const RamStickkDetails: React.FC<RamStickkDetailsProps> = ({ ramSticks }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  ramSticks?.sort((a, b) => a?.locator?.localeCompare(b?.locator));

  return (
    <Grid container spacing={2}>
      {ramSticks?.map((ramStick, index) => (
        <Grid container item xs={12} key={index}>
          <Card variant="outlined">
            <CardHeader title={ramStick?.locator ?? 'N/A'} />
            <CardContent>
              <Grid container spacing={2}>
                {Object.keys(ramStick).map((key, index) => (
                  <Grid xs={12} md={12} lg={3} item key={`${key}-${index}`}>
                    <CustomCard
                      hash={hashParams(
                        COMPONENT_NAME,
                        nodeId,
                        ramStick?.locator ?? 'N/A',
                        toTitleCase(key),
                        key
                      )}
                      title={toTitleCase(key)}
                      value={ramStick[key]}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RamStickkDetails;
