export const lineChartOptions = {
  animations: {
    radius: {
      duration: 500,
      easing: 'linear' as const,
      loop: (context: any) => context.active,
    },
  },

  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  datasetStrokeWidth: 10,
  pointDotStrokeWidth: 10,
  tooltipFillColor: 'rgb(0,0,0)',
  scales: {
    x: {
      grid: {
        borderColor: '#ffffff90',
        borderWidth: 2,
      },
      ticks: {
        callback: function (this: any, val: any, index: any) {
          return index % 2 === 0 ? this.getLabelForValue(val) : '';
        },
        padding: 0,
        textStrokeColor: '#fff',
        color: '#fff',
      },
    },
    y: {
      grid: {},
      type: 'linear' as const,
      min: -100,
      max: 32000,
      display: false,
    },
  },
  hover: {
    mode: 'dataset' as const,
    intersect: false,
    includeInvisible: true,
  },
  tooltips: {
    enabled: true,
    mode: 'x-axis',
    intersect: false,
    padding: 2,
    caretPadding: 4,
    usePointStyle: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const darkLineChartOptions = {
  animations: {
    radius: {
      duration: 500,
      easing: 'linear' as const,
      loop: (context: any) => context.active,
    },
  },

  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  datasetStrokeWidth: 10,
  pointDotStrokeWidth: 10,
  tooltipFillColor: 'rgb(0,0,0)',
  scales: {
    x: {
      grid: {
        borderColor: 'black',
        borderWidth: 2,
      },
      ticks: {
        callback: function (this: any, val: any, index: any) {
          return index % 2 === 0 ? this.getLabelForValue(val) : '';
        },
        padding: 0,
        textStrokeColor: '#fff',
        color: 'black',
      },
    },
    y: {
      grid: {},
      type: 'linear' as const,
      min: -100,
      max: 32000,
      display: false,
    },
  },
  hover: {
    mode: 'dataset' as const,
    intersect: false,
    includeInvisible: true,
  },
  tooltips: {
    enabled: true,
    mode: 'x-axis',
    intersect: false,
    padding: 2,
    caretPadding: 4,
    usePointStyle: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
