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
const data = {
  options: {
    colors: [green[700]],
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `${value}%`,
      },
      custom: ({ series, seriesIndex, dataPointIndex }) =>
        String.raw`<div class="custom-tooltip"><span>${series[seriesIndex][dataPointIndex]}%</span></div>`,
    },
    stroke: {
      width: 5,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

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
      <Paper
        variant="elevation"
        sx={{
          width: 500,
          overflow: 'hidden',
          background: green['200'],
          color: green['900'],
        }}
        elevation={24}
      >
        <Box display="flex" flexDirection="column">
          <Box p={3} display="flex" flexDirection="column">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Ram usage</Typography>
              <Tooltip title="Delete">
                <IconButton color="secondary">
                  <StarIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography fontWeight="bold" variant="h5" mt={2}>
              Node - Example
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <DataUsageIcon fontSize="small" />
              <Typography ml={1} component="span">
                Usage:{' '}
                <Typography component="span" fontWeight="bold">
                  58%
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box pt={2}>
            <Chart
              options={data.options}
              height={120}
              type="area"
              series={data.series}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Test;
