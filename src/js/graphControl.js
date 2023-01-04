let traceType = ['line', 'scatter', 'bar', 'lineWithErrorBar', 'scatterWithErrorBar'];
/*---------------------sample graph for graph control start--------------------*/
const dataPoints = [[5,7],[7,8],[15,10],[20,18],[17,21]]; 
const getErrorData = () =>{
  let errorData = [];
  for (let i = 0; i < dataPoints.length; i++) {
    const coord = dataPoints[i];
    const x = coord[0];
    const y = coord[1];
    const errorHigh = y + 2*Math.random();
    const errorLow = y - 2*Math.random();
    errorData.push([x, errorHigh, errorLow]);
  }
  return errorData;
}
const traceData = {
    traceID: "0",
    traceColor: "rgb(8,138,6)",
    traceType: "line",
    lineType: "Solid",
    lineWidth: 3,
    markerType: "Square",
    markerWidth: 10,
    markerHeight: 10,
    markerThickness: 1,
    data: dataPoints,
    errorData: []
  }
const yAxis = {
  type:0,
  position: 'left',
  nameGap: 40,
  axisLine: {
    show: true
  },
  axisLabel: {
    formatter: '{value} ml'
  },
  name: 'precipitation'
}
const GraphControlDemo = document.querySelector('#GraphControlDemo');
GraphControlDemo.axisDragDataZoomShouldShow = true;
GraphControlDemo.dataZoomOrient = 'horizontal';
GraphControlDemo.dataZoomHeight = 20
GraphControlDemo.traceData = [traceData];
GraphControlDemo.tooltipDataPoints = [
  {
    tooltipMessage: "five to ten",
    xEnd: 10,
    xStart: 5,
    yEnd: 10,
    yStart: 5
  },
  {
    tooltipMessage: "ten to fifty",
    xEnd: 50,
    xStart: 10,
    yEnd: 50,
    yStart: 10
  }]
GraphControlDemo.yAxis = [yAxis]
GraphControlDemo.xMax = 25;
GraphControlDemo.grid = [{}]
GraphControlDemo.graphWidth = 1000;
GraphControlDemo.graphHeight = 500;
/*---------------------sample graph for graph control end--------------------*/

/*---------Customization section------------*/
/*----------DOM references------------*/
/*---------Trace type dom refs-----------*/
const lineRadio = document.querySelector('#line');
const scatterRadio = document.querySelector('#scatter');
const barRadio = document.querySelector('#bar');
const lineWithErrorBarRadio = document.querySelector('#lineWithErrorBar');
const scatterWithErrorBarRadio = document.querySelector('#scatterWithErrorBar');
/*---------Trace type dom refs-----------*/
/*---------Marker type dom refs-----------*/
const crossRadio = document.querySelector('#cross');
const ellipseRadio = document.querySelector('#ellipse');
const squareRadio = document.querySelector('#square');
const triangleRadio = document.querySelector('#triangle');
const noneRadio = document.querySelector('#none');
/*---------Marker type dom refs-----------*/

/*---------Axis type dom refs-----------*/
const xLinearAxis = document.querySelector('#xLinear');
const xLogarithmicAxis = document.querySelector('#xLogarithmic');
const yLinearAxis = document.querySelector('#yLinear');
const yLogarithmicAxis = document.querySelector('#yLogarithmic');
/*---------Axis type dom refs-----------*/

/*----Line type dom refs------*/
const solidLineRadio = document.querySelector('#Solid');
const dotLineRadio = document.querySelector('#Dot');
const dashLineRadio = document.querySelector('#Dash');
const dashDotLineRadio = document.querySelector('#DashDot');
const dashDotDotLineRadio = document.querySelector('#DashDotDot');
const LongDashLineRadio = document.querySelector('#LongDash');
const LongDashDotLineRadio = document.querySelector('#LongDashDot');
const LongDashDotDotLineRadio = document.querySelector('#LongDashDotDot');
/*----Line type dom refs------*/

/*----------DOM references------------*/
/*---------Functions-------------*/
const updateTraceType = (series_type) => {
  if(series_type === 'LineWithErrorBars' || series_type === 'ScatterWithErrorBars'){
    GraphControlDemo.traceData = [{...traceData,errorData: getErrorData(), traceType: series_type}]
  }else{
    GraphControlDemo.traceData = [{...traceData, traceType: series_type}]
  }
}

const updateXaxisType = (axisType) => {
    GraphControlDemo.xAxisType = axisType;
};

const updateYaxisType = (axisType) => {
  GraphControlDemo.yAxis = [{...yAxis, type: axisType}];
}

const updateMarkerType = marker_type => {
  GraphControlDemo.traceData = [{...traceData, markerType: marker_type}]
};

const toggleDisplayForCustomizationContainer = (axis, displayProp) => {
  axis.style.display = displayProp;
};

const updateLineType = () => {
  if (dotLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'Dot'}];
  } else if (solidLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'Solid'}];
  } else if (dashLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'Dash'}];
  } else if (dashDotLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'DashDot'}];
  } else if (dashDotDotLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'DashDotDot'}];
  } else if (LongDashLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'LongDash'}];
  } else if (LongDashDotLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'LongDashDot'}];
  } else if (LongDashDotDotLineRadio.checked) {
    GraphControlDemo.traceData = [{...traceData,lineType: 'LongDashDotDot'}];
  }
};

const customiseGraphProperties = (property, value) => {
  if (graphControl.hasOwnProperty(property)) {
    graphControl[`${property}`] = value;
  }
};
/*---------Functions-------------*/
/*-----------Event Listener Register-------------*/
/*-----------Trace type Event Listener------------*/
lineRadio.addEventListener('click', () => updateTraceType('line'));
scatterRadio.addEventListener('click', () => updateTraceType('scatter'));
barRadio.addEventListener('click', () => updateTraceType('bar'));
lineWithErrorBarRadio.addEventListener('click', () => updateTraceType('LineWithErrorBars'));
scatterWithErrorBarRadio.addEventListener('click', () => updateTraceType('ScatterWithErrorBars'));
/*-----------Trace type Event Listener------------*/
/*-----------Marker type Event Listener------------*/
crossRadio.addEventListener('click', () => updateMarkerType('Cross'));
ellipseRadio.addEventListener('click', () => updateMarkerType('Ellipse'));
squareRadio.addEventListener('click', () => updateMarkerType('Square'));
triangleRadio.addEventListener('click', () => updateMarkerType('Triangle'));
noneRadio.addEventListener('click', () => updateMarkerType('None'));
/*-----------Marker type Event Listener------------*/

/*-----------Axis type Event Listener------------*/
xLinearAxis.addEventListener('click', ()=> updateXaxisType(0));
xLogarithmicAxis.addEventListener('click',()=> updateXaxisType(1));
yLinearAxis.addEventListener('click',()=> updateYaxisType(0));
yLogarithmicAxis.addEventListener('click',()=> updateYaxisType(1));
/*-----------Axis type Event Listener------------*/

/*-----------Line type event Listener-------------*/
solidLineRadio.addEventListener('click', updateLineType);
dotLineRadio.addEventListener('click', updateLineType);
dashLineRadio.addEventListener('click', updateLineType);
dashDotLineRadio.addEventListener('click', updateLineType);
dashDotDotLineRadio.addEventListener('click', updateLineType);
LongDashLineRadio.addEventListener('click', updateLineType);
LongDashDotLineRadio.addEventListener('click', updateLineType);
LongDashDotDotLineRadio.addEventListener('click', updateLineType);
/*-----------Line type event Listener-------------*/
/*-----------Event Listener Register-------------*/
/*---------Customization section------------*/

/*---------------------sample graph for multiple axis start--------------------*/
const multipleAxisGraphControl = document.querySelector('#multipleAxisGraphControl');
multipleAxisGraphControl.graphTitle = 'Temperature precipitation graph'
multipleAxisGraphControl.traceData = [
  {
    name: 'Evaporation',
    traceType: 'bar',
    data: [
      2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
    ],
    traceColor: '#5470C6'
  },
  {
    name: 'Precipitation',
    traceType: 'bar',
    yAxisIndex: 1,
    data: [
      2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
    ],
    traceColor: '#91CC75'
  },
  {
    name: 'Temperature',
    traceType: 'line',
    yAxisIndex: 2,
    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    traceColor: '#EE6666',
    markerType: 'Triangle',
    markerWidth: 4,
    markerHeight: 4
  }
]
multipleAxisGraphControl.yAxis = [
  {
    type: 0,
    name: 'Evaporation',
    nameLocation: 'end',
    position: 'right',
    nameGap: 10,
    nameRotate: 45,
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#5470C6'
      }
    },
    axisLabel: {
      formatter: '{value} ml'
    },
  },
  {
    type: 0,
    name: 'Precipitation',
    nameLocation: 'end',
    position: 'right',
    alignTicks: true,
    nameGap: 10,
    nameRotate: 45,
    offset: 70,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#91CC75'
      }
    },
    axisLabel: {
      formatter: '{value} ml'
    },
  },
  {
    type: 0,
    name: 'temperature',
    position: 'left',
    nameGap: 45,
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#EE6666'
      }
    },
    axisLabel: {
      formatter: '{value} °C'
    },
  }
]
multipleAxisGraphControl.xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
multipleAxisGraphControl.grid = [{ right: '25%',top:'25%'}]
multipleAxisGraphControl.xAxisType = 2;
multipleAxisGraphControl.xAxisTick = {
  alignWithLabel: true
}
multipleAxisGraphControl.graphWidth = 600;
multipleAxisGraphControl.graphHeight = 400;

/*---------------------sample graph for multiple axis end-------------------*/

// Script for Heatmap graph ----------------- Start .......//
const heatmapGraphControl = document.querySelector('#HeatmapGraphControl');
const hours = [
  '12a', '1a', '2a', '3a', '4a', '5a', '6a',
  '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p',
  '6p', '7p', '8p', '9p', '10p', '11p'
];

const days = [
  'Saturday', 'Friday', 'Thursday',
  'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];

const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
heatmapGraphControl.xAxisData = hours;
heatmapGraphControl.xAxisType = 2;
heatmapGraphControl.yAxis = [
  {
    data: days,
    type: 2,
    axisLine: { show: true },
    alignTicks: true,
    axisLabel: { formatter: '{value}' }
  }
]
heatmapGraphControl.visualMapData = {
  type:'continuous',
  min: 0,
  max: 10,
}
heatmapGraphControl.traceData = [
  {
    data: data,
  }
]
heatmapGraphControl.chartType = 'heatmap';
heatmapGraphControl.graphWidth = 600;
heatmapGraphControl.graphHeight = 400;
heatmapGraphControl.grid = [{ left: '20%', bottom: '35%'}]
// Script for Heatmap graph ----------------- End .......//
