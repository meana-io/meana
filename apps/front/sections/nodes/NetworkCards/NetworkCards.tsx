import { useState } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { useGetNetworkCards } from '@/api/networkCards';
import Progress from '@/components/Progress/Progress';
import CustomCard from '@/components/CustomCard/CustomCard';
import NodeNetworkCards from '@/types/nodeNetworkCards';
import { toTitleCase } from '@/utility/toTitleCase';
import NoData from '@/components/NoData/NoData';

const NetworkCards = () => {
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

  if (isLoading) {
    return <Progress />;
  }

  if (!networkCards) {
    return <NoData />;
  }

  return (
    <Box>
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
        <Grid container spacing={2} item xs={12} lg={6}>
          {selectedNetworkCardRecord &&
            Object.entries(selectedNetworkCardRecord)?.map(([key, value]) => (
              <Grid xs={12} lg={6} xl={4} item key={key}>
                <CustomCard
                  hash={''}
                  title={toTitleCase(key)}
                  value={(value as string) || 'N/A'}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NetworkCards;
