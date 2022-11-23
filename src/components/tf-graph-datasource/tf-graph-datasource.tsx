import { Component, h, Prop, State, Watch } from '@stencil/core';
import { MarkerType, LineType, defaultLineType, defaultMarkerType, AxisType } from '../../enum/graphControlEnum';
@Component({
    tag: 'tf-graph-datasource',
    styleUrl: 'tf-graph-datasource.scss',
    shadow: true,
})
export class TfGraphDatasource {

    @Prop() graphTitle?: any = {text:"Item Price graph"};

    @Prop() xAxisType?: any = "Linear";

    @Prop() yAxisType?: any = "Linear";

    @Prop() zoomType?: any = "axisDragZoom";

    @Prop() traceType = 'line';

    @Prop() lineType?: any = 'DashDotDot';

    @Prop() markerType?: any = 'Ellipse';

    @State() traceData?:any = [
        {
          symbolSize: 5,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
          ],
          type: 'line'
        }
      ];

    @State() xAxisData: any = {
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

    @State() yAxisData: any = {
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

    @State() zoomTypeData?: any = [
        {
            type: 'inside'
        }
    ];

    @State() graphTitleData?: any;

    @State() tooltip = {
        axisPointer: {
            type: "cross"
        }
    };

    @State() dataPoints = [[5, 7], [7, 8], [15, 10], [20, 18], [17, 21]];

    @Watch('xAxisType')
    watchXAxisType() {
        this.updateXAxisType()
    }

    @Watch('yAxisType')
    watchYAxisType() {
        this.updateYAxisType()
    }

    @Watch('traceType')
    watchTracesType() {
        this.updateTrace();
    }

    @Watch('lineType')
    watchLineType() {
        this.updateTrace();
    }

    @Watch('markerType')
    watchmarekerType() {
        this.updateTrace();
    }

    @Watch('zoomType')
    watchZoomType() {
        this.updateZoomtype();
    }

    updateZoomtype() {
        if (this.zoomType === "axisDragZoom") {
            this.zoomTypeData = [
                {
                    type: 'slider'
                }
            ]
        } else {
            this.zoomTypeData = [
                {
                    type: 'inside'
                }
            ]
        }
    }

    updateXAxisType() {
        console.log("inside updateXAxisType==>>",this.xAxisType);
        if (this.xAxisType === AxisType[1])
            this.xAxisData = {
                type: 'log',
                name: "Item",
                nameLocation: "middle",
                nameTextStyle: {
                    fontSize: "10",
                    color: "black",
                    align: "center",
                    verticalAlign: "top",
                    lineHeight: "56"
                },
                axisLabel: {
                    formatter: function (value) {
                        return '10' + '{title|' + Math.log(value) / Math.log(10) + '}';
                    },
                    rich: {
                        title: {
                            verticalAlign: 'super',
                            fontSize: '.5rem'
                        }
                    }
                }
            }
    }

    updateYAxisType() {
        if (this.yAxisType === AxisType[1]) {
            this.yAxisData = {
                type: 'value',
                name: "Price",
                nameLocation: "middle",
                nameTextStyle: {
                    fontSize: "10",
                    color: "black",
                    align: "center",
                    lineHeight: "56",

                },
                axisLabel: {
                    formatter: function (value) {
                        return '10' + '{title|' + Math.log(value) / Math.log(10) + '}';
                    },
                    rich: {
                        title: {
                            verticalAlign: 'super',
                            fontSize: '.5rem'
                        }
                    }
                }
            }
        }
    }

    customTraces(params, api) {
        console.log("🚀 ~ file: tf-graph-datasource.tsx ~ line 138 ~ TfGraphDatasource ~ customTraces ~ params", params)
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

    getErrorData() {
        let errorData = [];
        for (let i = 0; i < this.dataPoints.length; i++) {
            const coord = this.dataPoints[i];
            const errorHigh = coord[1] + Math.random();
            const errorLow = coord[1] - Math.random();
            errorData.push([coord[0], errorHigh, errorLow]);
        }
        return errorData;
    }

    getLineType() {
        let lineTypeData;
        switch (this.lineType) {
            case LineType[0]:
                lineTypeData = defaultLineType[0];
                break;
            case LineType[1]:
                lineTypeData = defaultLineType[1];
                break;
            case LineType[2]:
                lineTypeData = defaultLineType[2];
                break;
            case LineType[3]:
                lineTypeData = [16, 4, 2, 4];
                break;
            case LineType[4]:
                lineTypeData = [16,4,2,4,2,4];
                break;
            case LineType[5]:
                lineTypeData = [40,20];
                break;
            case LineType[6]:
                lineTypeData = [16,20,2,4];
                break;
            case LineType[7]:
                lineTypeData = [16,20,2,4,2,4];
                break;
        }
        return lineTypeData;
    }

    updateTrace() {
        if (this.traceType === "lineWithErrorBar" || this.traceType === "scatterWithErrorBar") {
            let isLineWithErrorBar;
            isLineWithErrorBar = this.traceType === "lineWithErrorBar" ? true : false;
            let errorTraceData = this.getErrorData();
            this.traceData = [
                {
                    type: isLineWithErrorBar ? 'line' : 'scatter',
                    name: 'bar',
                    data: this.dataPoints,
                    itemStyle: {
                        color: '#77bef7'
                    },
                    lineStyle: {
                        type: isLineWithErrorBar ? this.getLineType() : ""
                    },
                    smooth: true,
                    symbol: this.updateMarkerType(),
                    symbolSize: this.markerType === "Ellipse" ? [16, 8] : 10
                },
                {
                    type: 'custom',
                    name: 'error',
                    itemStyle: {
                        borderWidth: 1.5,
                        color: "#3655fb"
                    },
                    renderItem: (params, api) => this.customTraces(params, api),
                    encode: {
                        x: 0,
                        y: [1, 2]
                    },
                    z: 100,
                    data: errorTraceData
                }
            ]
        } else {
            this.traceData = [
                {
                    name: "Series 1",
                    data: this.dataPoints,
                    type: this.traceType,
                    lineStyle: this.traceType === "line" ? {
                        color: "red",
                        type: this.getLineType()
                    }: "",
                    symbol: this.updateMarkerType(),
                    symbolSize: this.markerType === "Ellipse" ? [16, 8] : 10
                }
            ]
        }        
    }

    updateMarkerType() {
        let markerTypeSymbol = '';
        switch (this.markerType) {
            case MarkerType[0]:
                markerTypeSymbol = defaultMarkerType[0];
                break;
            case MarkerType[3]:
                markerTypeSymbol = defaultMarkerType[1];
                break;
            case MarkerType[4]:
                markerTypeSymbol = defaultMarkerType[2];
                break;
            case MarkerType[1]:
                markerTypeSymbol = "path://M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                break;
            case MarkerType[2]:
                markerTypeSymbol = "path://M44.166,75.062C19.812,75.062,0,61.202,0,44.167C0,27.13,19.812,13.27,44.166,13.27c24.354,0,44.166,13.859,44.166,30.896,C88.332,61.204,68.52,75.062,44.166,75.062z M44.166,16.27C21.467,16.27,3,28.784,3,44.167c0,15.381,18.467,27.896,41.166,27.896,s41.166-12.515,41.166-27.896C85.332,28.785,66.865,16.27,44.166,16.27z"
                break;
        }
        return markerTypeSymbol;
    }

    render() {
        return (
            <div class="root" >
                <tf-graph
                    graphTitle={this.graphTitle}
                    xAxis={this.xAxisData}
                    yAxis={this.yAxisData}
                    dataZoom={this.zoomTypeData}
                    tooltip={this.tooltip}
                    // toolbox={this.toolbox}
                    series={this.traceData}
                ></tf-graph>
            </div>
        );
    }
}