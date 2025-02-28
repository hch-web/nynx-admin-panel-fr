import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

function MonthlyBarChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.primary.main;

  const [series] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78],
    },
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions(prevState => ({
      ...prevState,
      colors: [info],
      // colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.lightOrange.main],

      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
          },
        },
      },
      tooltip: {
        theme: 'light',
      },
    }));
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
}

export default MonthlyBarChart;
