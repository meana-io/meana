import { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Grid, Icon, Paper, Tooltip } from '@mui/material';
import SdCardIcon from '@mui/icons-material/SdCard';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { purple, green } from '@mui/material/colors';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import DataUsageIcon from '@mui/icons-material/DataUsage';
import StarIcon from '@mui/icons-material/Star';
import AreaChartCard from '@/components/ChartCards/AreaChartCard';

const Test: NextPage = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <AreaChartCard
        title="RAM"
        series={[
          {
            name: 'Series 1',
            data: [45, 52, 38, 45, 19, 23, 2],
          },
        ]}
      />
    </Box>
  );
};

export default Test;
