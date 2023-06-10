var cpuCounter = 0;
var ramCounter = 0;
var gpuCounter = 0;
var cpuName = "";
var ramName = "";
var gpuName = "";
var isChartInit = false;
var animationDuration = 20000;

var chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(0, 192, 0)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
  lightGrey: "rgb(105, 105, 105)",
  black: "rgb(0, 0, 0)",
  white: "rgb(255, 255, 255)",
};
var color = Chart.helpers.color;

//global chart defaults
Chart.defaults.global.legend.display = false;
Chart.defaults.global.responsive = true;
Chart.defaults.global.elements.pointRadius = 0;
Chart.defaults.global.tooltips.enabled = false;

var cpuChartConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Dataset 1 (linear interpolation)",
        backgroundColor: color(chartColors.white).alpha(1).rgbString(),
        borderColor: chartColors.white,
        fill: false,
        lineTension: 0,
        borderDash: [0, 0],
        pointRadius: 0,
        data: [],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Processor",
      fontColor: "#fff",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: animationDuration,
            refresh: 1000,
            delay: 1000,
            onRefresh: onRefresh,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "%",
          },
          gridLines: { color: "#676062" },
          ticks: {
            beginAtZero: true,
            max: 100,
            fontColor: "#fff",
          },
        },
      ],
    },
  },
};

var ramChartConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Dataset 1 (linear interpolation)",
        backgroundColor: color(chartColors.white).alpha(1).rgbString(),
        borderColor: chartColors.white,
        fill: false,
        lineTension: 0,
        borderDash: [0, 0],
        pointRadius: 0,
        data: [],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Memory",
      fontColor: "#fff",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: animationDuration,
            refresh: 1000,
            delay: 1000,
            onRefresh: onRefresh,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "%",
          },
          gridLines: { color: "#676062" },
          ticks: {
            beginAtZero: true,
            max: 100,
            fontColor: "#fff",
          },
        },
      ],
    },
  },
};

var gpuChartConfig = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Dataset 1 (linear interpolation)",
        backgroundColor: color(chartColors.white).alpha(1).rgbString(),
        borderColor: chartColors.white,
        fill: false,
        lineTension: 0,
        borderDash: [0, 0],
        pointRadius: 0,
        data: [],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Graphics",
      fontColor: "#fff",
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: animationDuration,
            refresh: 1000,
            delay: 1000,
            onRefresh: onRefresh,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "%",
          },
          gridLines: { color: "#676062" },
          ticks: {
            beginAtZero: true,
            max: 100,
            fontColor: "#fff",
          },
        },
      ],
    },
  },
};

function onRefresh(chart) {
  var data = [];
  switch (chart) {
    case cpuChart:
      data[0] = cpuCounter;
      break;
    case ramChart:
      data[0] = ramCounter;
      break;
    case gpuChart:
      data[0] = gpuCounter;
      break;
  }

  var i = 0;
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: data[i],
    });
    i++;
  });
}

var cpuChart, ramChart, gpuChart;
function initChart() {
  cpuChartConfig.options.title.text = cpuName;
  ramChartConfig.options.title.text = ramName;
  gpuChartConfig.options.title.text = gpuName;

  var ctxCpu = document.getElementById("cpuChart").getContext("2d");
  cpuChart = new Chart(ctxCpu, cpuChartConfig);

  var ctxRam = document.getElementById("ramChart").getContext("2d");
  ramChart = new Chart(ctxRam, ramChartConfig);

  var ctxGpu = document.getElementById("gpuChart").getContext("2d");
  gpuChart = new Chart(ctxGpu, gpuChartConfig);
}

function livelySystemInformation(data) {
  if (!sysinfo.classList.contains("hide")) {
    var obj = JSON.parse(data);
    if (!sysinfo.children[0].classList.contains("hide")) {
      cpuName = "CPU (% usage)";
      cpuChartConfig.options.scales.xAxes[0].realtime.duration =
        animationDuration;
      cpuCounter = obj.CurrentCpu;
    }
    if (!sysinfo.children[1].classList.contains("hide")) {
      ramName = "RAM (% usage)";
      ramChartConfig.options.scales.xAxes[0].realtime.duration =
        animationDuration;
      ramCounter = (1 - obj.CurrentRamAvail / obj.TotalRam) * 100;
    }
    if (!sysinfo.children[2].classList.contains("hide")) {
      gpuName = "GPU (% usage)";
      gpuChartConfig.options.scales.xAxes[0].realtime.duration =
        animationDuration;
      gpuCounter = obj.CurrentGpu3D;
    }

    if (!isChartInit) {
      isChartInit = true;
      initChart();
    }
  } else {
    cpuChartConfig.options.scales.xAxes[0].realtime.duration = 0;
    ramChartConfig.options.scales.xAxes[0].realtime.duration = 0;
    gpuChartConfig.options.scales.xAxes[0].realtime.duration = 0;
  }
}
