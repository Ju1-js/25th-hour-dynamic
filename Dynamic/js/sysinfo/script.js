var cpuCounter = 0;
var gpuCounter = 0;
var cpuName = "";
var gpuName = "";
var isChartInit = false;
var animationDuration = 20000;

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(0, 192, 0)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    lightGrey: 'rgb(105, 105, 105)',
    black: 'rgb(0, 0, 0)', 
    white: 'rgb(255, 255, 255)'
};
var color = Chart.helpers.color;

//global chart defaults
Chart.defaults.global.legend.display = false;
Chart.defaults.global.responsive = true;
Chart.defaults.global.elements.pointRadius = 0;
Chart.defaults.global.tooltips.enabled = false;

var cpuChartConfig = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: color(chartColors.white).alpha(1).rgbString(),
            borderColor: chartColors.white,
            fill: false,
            lineTension: 0,
            borderDash: [0, 0],
            pointRadius: 0,
            data: []
        }],
    },
    options: {   
        maintainAspectRatio: false,   
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Processor',
            fontColor: "#fff"
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: animationDuration,
                    refresh: 1000,
                    delay: 1000,
                    onRefresh: onRefresh
                },
                ticks: {
                    display: false,
                },
            }],
            yAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: '%'
                },
                gridLines: { color: "#676062" },
                ticks: {
                    beginAtZero: true,
                    max : 100,
                    fontColor: "#fff"
                }
            }]
        },
    }
};

var gpuChartConfig = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dataset 1 (linear interpolation)',
            backgroundColor: color(chartColors.white).alpha(1).rgbString(),
            borderColor: chartColors.white,
            fill: false,
            lineTension: 0,
            borderDash: [0, 0],
            pointRadius: 0,
            data: []
        }]
    },
    options: {   
        maintainAspectRatio: false,          
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Graphics',
            fontColor: "#fff"
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: animationDuration,
                    refresh: 1000,
                    delay: 1000,
                    onRefresh: onRefresh
                },
                ticks: {
                    display: false, 
                },
            }],
            yAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: '%'
                },
                gridLines: { color: "#676062" },
                 ticks: {
                    beginAtZero: true,
                    max : 100,
                    fontColor: "#fff"
            }
            }]
        },
    }
};

function onRefresh(chart) 
{
    var data = [];
    switch(chart)
    {
        case cpuChart:
            data[0] = cpuCounter;
            break;
        case gpuChart:
            data[0] = gpuCounter;
            break;
    }

    var i = 0;
    chart.config.data.datasets.forEach(
        function(dataset) {
        dataset.data.push({
            x: Date.now(),
            y: data[i],
        });
        i++;
    });
}

var cpuChart, gpuChart;
function initChart() 
{
    cpuChartConfig.options.title.text = cpuName;
    gpuChartConfig.options.title.text = gpuName;

    var ctxCpu = document.getElementById('cpuChart').getContext('2d');
    cpuChart = new Chart(ctxCpu, cpuChartConfig);

    var ctxGpu = document.getElementById('gpuChart').getContext('2d');
    gpuChart = new Chart(ctxGpu, gpuChartConfig);
};

function livelySystemInformation(data) {
    if (!sysinfo.classList.contains("hide")) {
        gpuChartConfig.options.scales.xAxes[0].realtime.duration = animationDuration;
        cpuChartConfig.options.scales.xAxes[0].realtime.duration = animationDuration;

        var obj = JSON.parse(data);
        cpuName = "CPU (% usage)";
        gpuName = "GPU (% usage)";

        cpuCounter = obj.CurrentCpu;
        gpuCounter = obj.CurrentGpu3D;
        if(!isChartInit)
        {
            isChartInit = true;
            initChart();
        }
    } else {
        gpuChartConfig.options.scales.xAxes[0].realtime.duration = 0;
        cpuChartConfig.options.scales.xAxes[0].realtime.duration = 0;
    }
}

//test
//initChart();