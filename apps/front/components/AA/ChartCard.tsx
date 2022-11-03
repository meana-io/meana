import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Paper, Tooltip } from '@mui/material';
import {
  DataUsage as DataUsageIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const chartOptions = (color) => ({
  options: {
    colors: [color[700]],
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
});

interface DashboardCartCardProps {
  title: string;
  color: string;
  nodeName: string;
}

const DashboardCartCard: React.FC<DashboardCartCardProps> = ({
  title,
  color,
  nodeName,
}) => {
  const { options, series } = chartOptions(color);

  return (
    <Paper
      variant="elevation"
      sx={{
        width: 500,
        overflow: 'hidden',
        background: color['200'],
        color: color['900'],
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
            <Typography variant="h6">{title}</Typography>
            <Tooltip title="Delete">
              <IconButton color="secondary">
                <StarIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography fontWeight="bold" variant="h5" mt={2}>
            Node - {nodeName}
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
          <Chart options={options} height={120} type="area" series={series} />
        </Box>
      </Box>
    </Paper>
  );
};

export default DashboardCartCard;
