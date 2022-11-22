let series_type = 'line';
let curentSeriesType;
let traceType = ["line","scatter","bar","lineWithErrorBar","scatterWithErrorBar"];
let dataPoints = [[5,7],[7,8],[15,10],[20,18],[17,21]]
const graphControl = document.querySelector('#GraphControl');
graphControl.dataZoom = [
  {
    type: 'inside'
  }
]
graphControl.tooltip = {
  axisPointer: {
    type: "cross"
  }
}
graphControl.xAxis = {
  type: 'value',
  name: "Item",
  nameLocation: "middle",
  nameTextStyle: {
    fontSize: "10",
    color: "black",
    align: "center",
    verticalAlign: "top",
    lineHeight: "56"
  }
}
graphControl.yAxis = {
  type: 'value',
  name: "Price",
  nameLocation: "middle",
  nameTextStyle: {
    fontSize: "10",
    color: "black",
    align: "center",
    lineHeight: "56",

  }
}

function customTraces(params, api) {
  const xValue = api.value(0);
  const highPoint = api.coord([xValue, api.value(1)]);
  const lowPoint = api.coord([xValue, api.value(2)]);
  const halfWidth = api.size([1, 0])[0] * 0.1;
  const style = api.style({
    stroke: api.visual('color'),
    fill: undefined
  })
  return {
    type: 'group',
    children: [
      {
        type: 'line',
        transition: ['shape'],
        shape: {
          x1: highPoint[0] - halfWidth,
          y1: highPoint[1],
          x2: highPoint[0] + halfWidth,
          y2: highPoint[1]
        },
        style: style
      },
      {
        type: 'line',
        transition: ['shape'],
        shape: {
          x1: highPoint[0],
          y1: highPoint[1],
          x2: lowPoint[0],
          y2: lowPoint[1]
        },
        style: style
      },
      {
        type: 'line',
        transition: ['shape'],
        shape: {
          x1: lowPoint[0] - halfWidth,
          y1: lowPoint[1],
          x2: lowPoint[0] + halfWidth,
          y2: lowPoint[1]
        },
        style: style
      }
    ]
  };
}

const updateSeries = () => {
  let isLineWithErrorBar;
  let errorData = [];
  let traceData;
  for (let i = 0; i < dataPoints.length; i++) {
    const coord = dataPoints[i];
    const x = coord[0];
    const y = coord[1];
    const errorHigh = y + Math.random();
    const errorLow = y - Math.random();
    errorData.push([x, errorHigh, errorLow]);
  }
  isLineWithErrorBar = series_type === "lineWithErrorBar" ? true : false;
  if (series_type === "lineWithErrorBar" || series_type === "scatterWithErrorBar") {
    traceData = [
      {
        type: isLineWithErrorBar ? 'line' : 'scatter',
        name: 'bar',
        data: dataPoints,
        itemStyle: {
          color: '#77bef7'
        },
        smooth: true,
        symbol: isLineWithErrorBar ? 'none' : 'circle',
        symbolSize: 10
      },
      {
        type: 'custom',
        name: 'error',
        itemStyle: {
          borderWidth: 1.5,
          color: "#3655fb"
        },
        renderItem: (params, api) => customTraces(params, api),
        encode: {
          x: 0,
          y: [1, 2]
        },
        z: 100,
        data: errorData
      }
    ]
  } else {
    traceData = [
      {
        name: "Series 1",
        data: dataPoints,
        type: series_type,
        lineStyle: {
          color: "red",
          // type: "dashed"
        }
      }
    ]
  }
  graphControl.series = traceData;
}
updateSeries();
graphControl.toolbox = {
  orient: 'vertical',
  itemSize: 13,
  top: 15,
  right: -6,
  feature: {
    dataZoom: {},
  },
}
window.addEventListener("click", function () {
  series_type = document.querySelector("input[type='radio'][name=series_type]:checked")?.value;
  if (traceType.includes(series_type) && curentSeriesType !== series_type) {
    updateSeries();
  }
  curentSeriesType = series_type;
});