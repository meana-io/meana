import { useState } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { useGetNetworkCards } from '@/api/networkCards';
import Progress from '@/components/Progress/Progress';
import CustomCard from '@/components/CustomCard/CustomCard';
import NodeNetworkCards from '@/types/nodeNetworkCards';
import { toTitleCase } from '@/utility/toTitleCase';
import NoData from '@/components/NoData/NoData';
import { COMPONENT_NAME } from '@/components/Dashboard/Disk/DiskCustomCard';
import { hashParams } from '@/utility/hashParams';

const NetworkCards: React.FC = () => {
  const router = useRouter();
  const [selectedNetworkCard, setSelectedNetworkCard] = useState<string>('');
  const [selectedNetworkCardRecord, setSelectedNetworkCardRecord] = useState<
    NodeNetworkCards | undefined
  >(undefined);
  const nodeId = router.query.id as string;
  const { data: networkCards, isLoading } = useGetNetworkCards(nodeId);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCardName = event.target.value as string;

    setSelectedNetworkCard(selectedCardName);

    setSelectedNetworkCardRecord(
      networkCards.find(({ name }) => name === selectedCardName)
    );
  };

  console.log(networkCards);

  if (isLoading) {
    return <Progress />;
  }

  if (!networkCards) {
    return <NoData />;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="network-cards-label">Network Cards</InputLabel>
            <Select
              labelId="network-cards-label"
              id="network"
              label="Network Cards"
              value={selectedNetworkCard}
              onChange={handleChange}
            >
              {networkCards?.map(({ name }) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={4}>
          <Grid container spacing={2} item xs={12}>
            {selectedNetworkCardRecord &&
              Object.entries(selectedNetworkCardRecord)?.map(([key, value]) => (
                <Grid xs={12} lg={4} item key={key}>
                  <CustomCard
                    hash={hashParams(
                      COMPONENT_NAME,
                      nodeId,
                      //disk.name,
                      toTitleCase(key),
                      key
                    )}
                    title={toTitleCase(key)}
                  >
                    {value || 'N/A'}
                  </CustomCard>
                </Grid>
              ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NetworkCards;
