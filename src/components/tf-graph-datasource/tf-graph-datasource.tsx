/*--------------------Third Party Import---------------------*/
import { Component, h, Prop } from '@stencil/core';
import { SeriesOption, ToolboxComponentOption } from 'echarts';
/*--------------------Third Party Import---------------------*/
/*--------------------Enum Import---------------------*/
import { MarkerType, LineType, InbuiltLineType, InbuiltMarkerType, InbuiltAxisType, TraceType, InbuiltTraceType, EmptyMarker, ChartType, OrientType } from '../../enum/graphControlEnum';
/*--------------------Enum Import---------------------*/
/*--------------------Interface Import---------------------*/
import { TooltipData, TraceDataTypes, TooltipDataTypes, GraphTitleDataTypes, CustomErrorTrace, LegendData, GraphGrid, AxisTick, VisualMapData, DataZoomType, AxisDataResponseTypes, AxisDataProperties, ContextMenuOptions } from '../../modules/graphData-types'
/*--------------------Interface Import---------------------*/
/*--------------------Constant Import---------------------*/
import { DashedLineType, CustomMarkerSvgPath, GraphControlFontWeight, GraphControlAxisLabelLocation, CustomTraceShape, VisualMapPosition } from '../../constant/graphControlConstant';
/*--------------------Constant Import---------------------*/
/*--------------------Utility Function Import---------------------*/
import { customAxisLabel } from '../../utils/utils';
/*--------------------Utility Function Import---------------------*/

@Component({
    tag: 'tf-graph-datasource',
    shadow: true,
})
export class TfGraphDatasource {

    @Prop() dataZoomHeight?: number | string = 20;
    /**
     * to get the visibility for axis drag zoom
     */
    @Prop() axisDragDataZoomShouldShow?: boolean = false;

    /**
     * to get the orientation for axis drag zoom
     */
    @Prop() dataZoomOrient?: string = "horizontal";

    /**
     * xMax is used to set the x-axis maximum range
     */
    //TODO: need to add some default value
    @Prop() xMax?: number;

    /**
     * xMin is used to set the x-axis minimum range
     */
    //TODO: need to add some default value
    @Prop() xMin?: number;

    /**
     * graphTitle used to set the graph title text
     */
    @Prop() graphTitle?: string;

    /**
     * xAxisType used to set the x-axis type whether it will be 0(linear) or 1(logarithmic)
     */
    @Prop() xAxisType?: number = 0;

    /**
     * xAxisTitle used to set the x-axis title text
     */
    @Prop() xAxisTitle?: string;

    /**
     * to get the x-axis data
     */
    //TODO: need to add some default value
    @Prop() xAxisData?: Array<string | number> = null;
    @Prop() additionalContextOptions?: ContextMenuOptions = null;
    /**
     * to get the x-axis tick
     */
    @Prop() xAxisTick?: AxisTick = {
        alignWithLabel: true
    };

    /**
     * tooltipDataPoints used to set the customized tooltip message w.r.t to coordinates value
     */
    @Prop() tooltipDataPoints?: Array<TooltipData> | undefined = [];

    /**
     * traceData used to set the all the properties for each traces which includes trace type, line type, marker type etc.
     */
    @Prop() traceData?: Array<TraceDataTypes> = [];

    /**
     * Gets legend data
     */
    @Prop() legend?: LegendData[];

    /**
     * gets the chartType data 
     */
    @Prop() chartType?: string = '';

    /**
     * to get the visualmap data when chart type is heatmap
     */
    @Prop() visualMapData?: VisualMapData;

    /**
     * to set the padding for the graph control w.r.t to the parent container
     */
    @Prop() grid?: Array<GraphGrid>;
    /**
     * toolbox is used to pass all the properties related drag to zoom feature
     */
    @Prop() toolbox?: ToolboxComponentOption = {
        feature: {
            dataZoom: {
                icon: {
                    zoom: 'path://',
                    back: 'path://',
                },
            },
        },
    }

    /**
     * it's stores the information for the width of the graph
     */
    @Prop() graphWidth?: number = 0;

    /**
     * it's stores the information for the height of the graph
     */
    @Prop() graphHeight?: number = 0;

    /**
     * it's stores the base value of x-axis data when axis type is logarithmic
     */
    @Prop() xAxisBase?: number = 10;

    /**
     * it's stores the base value of y-axis data when axis type is logarithmic
     */
    @Prop() yAxisBase?: number = 10;

    /**
     * to get all the data regarding y-axis  
     */
    //TODO: need to add some default value
    @Prop() yAxis?: Array<AxisDataResponseTypes>

    /**
     * @description function to customize the trace type and their marker for line with error bar and scatter with error bar
     * @param {any} _params provides info about the current series and data and coordinate system
     * @param {any} api includes some methods through which we can further customize our trace marker
     * @return { CustomErrorTrace } it will return custom error trace
     */
    customTraces(_params: any, api: any): CustomErrorTrace {
        const xValue = api.value(0);
        const highPoint = api.coord([xValue, api.value(1)]);
        const lowPoint = api.coord([xValue, api.value(2)]);
        const halfWidth = api.size([1, 0])[0] * 0.1;
        const style = api.style({
            stroke: api.visual('color'),
            fill: undefined,
        });
        return {
            type: CustomTraceShape.GROUP,
            children: [
                {
                    type: InbuiltTraceType.LINE,
                    transition: [CustomTraceShape.SHAPE],
                    shape: {
                        x1: highPoint[0] - halfWidth,
                        y1: highPoint[1],
                        x2: highPoint[0] + halfWidth,
                        y2: highPoint[1],
                    },
                    style: style,
                },
                {
                    type: InbuiltTraceType.LINE,
                    transition: [CustomTraceShape.SHAPE],
                    shape: {
                        x1: highPoint[0],
                        y1: highPoint[1],
                        x2: lowPoint[0],
                        y2: lowPoint[1],
                    },
                    style: style,
                },
                {
                    type: InbuiltTraceType.LINE,
                    transition: [CustomTraceShape.SHAPE],
                    shape: {
                        x1: lowPoint[0] - halfWidth,
                        y1: lowPoint[1],
                        x2: lowPoint[0] + halfWidth,
                        y2: lowPoint[1],
                    },
                    style: style,
                }
            ]
        };
    }

    /**
     * @description function to get the line type when trace type is line
     * @param { string } lineType provides info about line type
     * @returns {string | Array<Number>} it returns the line type, which is supported by apache echart
     */
    getLineType(lineType: string): string | Array<Number> {
        let lineTypeData: string | Array<Number>;
        switch (lineType) {
            case LineType.SOLID:
                lineTypeData = InbuiltLineType.SOLID;
                break;
            case LineType.DOT:
                lineTypeData = InbuiltLineType.DOTTED;
                break;
            case LineType.DASH:
                lineTypeData = InbuiltLineType.DASHED;
                break;
            case LineType.DASH_DOT:
                lineTypeData = DashedLineType.DASH_DOT;
                break;
            case LineType.DASH_DOT_DOT:
                lineTypeData = DashedLineType.DASH_DOT_DOT;
                break;
            case LineType.LONG_DASH:
                lineTypeData = DashedLineType.LONG_DASH;
                break;
            case LineType.LONG_DASH_DOT:
                lineTypeData = DashedLineType.LONG_DASH_DOT;
                break;
            case LineType.LONG_DASH_DOT_DOT:
                lineTypeData = DashedLineType.LONG_DASH_DOT_DOT;
                break;
        }
        return lineTypeData;
    }

    /**
     * @description function to get the marker type for the trace
     * @param { string } markerType provide the info of the symbol
     * @param { boolean } markerFill provide the info about whether symbol should be filled or not
     * @returns {string} it returns the symbol for the marker type, which is supported by apache echart
     */
    getMarkerType(markerType: string, markerFill: boolean): string {
        let markerTypeSymbol = '';
        switch (markerType) {
            case MarkerType.NONE:
                markerTypeSymbol = InbuiltMarkerType.NONE;
                break;
            case MarkerType.SQUARE:
                markerTypeSymbol = markerFill ? InbuiltMarkerType.SQUARE : EmptyMarker.EMPTYRECT;
                break;
            case MarkerType.TRIANGLE:
                markerTypeSymbol = markerFill ? InbuiltMarkerType.TRIANGLE : EmptyMarker.EMPTYTRIANGLE;
                break;
            case MarkerType.CROSS:
                markerTypeSymbol = CustomMarkerSvgPath.CROSS;
                break;
            case MarkerType.ELLIPSE:
                markerTypeSymbol = CustomMarkerSvgPath.ELLIPSE;
                break;
        }
        return markerTypeSymbol;
    }

    /**
     * @description method to set the graph titleData
     * @returns {GraphTitleDataTypes} it returns the entire title data for the graph control
     */
    private getGraphTitleData(): GraphTitleDataTypes {
        const titleData = {
            textStyle:{
                fontSize:12,
                fontWeight: GraphControlFontWeight.BOLD
            },
            text: this.graphTitle,
        }
        return titleData;
    }

    private getAxisType(type: number): string{
        let axisType = ''
        switch (type) {
            case 0:
                axisType = InbuiltAxisType.VALUE;
                break;
            case 1:
                axisType = InbuiltAxisType.LOG;
                break;
            case 2:
                axisType = InbuiltAxisType.CATEGORY;
                break;
        }
        return axisType;
    }

    /**
     * @description function to set the x-Axis all properties
     * @returns {AxisDataProperties} it returns the entire data related to the x-axis of the graph
     */
    private getXaxisData():AxisDataProperties {
        const { xMin, xMax, xAxisTitle, xAxisType ,xAxisBase, xAxisData, xAxisTick } = this;
        let axisType = this.getAxisType(xAxisType);
        const updatedXaxis: AxisDataProperties = {
            type: axisType,
            min: xMin,
            max: xMax,
            data: xAxisData,
            name: xAxisTitle,
            nameTextStyle:{ fontWeight: GraphControlFontWeight.BOLDER },
            nameLocation: GraphControlAxisLabelLocation.MIDDLE,
            nameGap:20,
            axisTick: xAxisTick,
            axisLine: { onZero: false },
            axisLabel: axisType === InbuiltAxisType.LOG ? {
                formatter: (value:number) => customAxisLabel(value,xAxisBase),
                rich: {
                    title: {
                        verticalAlign: 'super',
                        fontSize: '.5rem',
                    },
                },
            } : {},
        }
        return updatedXaxis;
    }

    /**
     * @description function to get all the data properties for the yaxis 
     * @returns {Array<AxisDataProperties>} it will return all the properties of yaxis 
     */
    private getYaxisData(): Array<AxisDataProperties>{
        let updatedXaxis = [];
        const { yAxis } = this;
        if (yAxis?.length) {
            for (let index = 0; index < yAxis.length; index++) {
                const { data, min, max, name, type, axisLine, offset, position, axisLabel, alignTicks, nameGap, nameLocation, nameRotate  } = yAxis[index];
                let axisType = this.getAxisType(type);
                let singleAxisData = {
                    type: axisType,
                    min: min,
                    max: max,
                    data:data,
                    axisLine: axisLine,
                    alignTicks: alignTicks,
                    offset: offset,
                    position: position,
                    name: name,
                    nameRotate: nameRotate,
                    nameTextStyle:{ fontWeight: GraphControlFontWeight.BOLDER},
                    nameLocation: nameLocation ? nameLocation : GraphControlAxisLabelLocation.MIDDLE,
                    nameGap:nameGap,
                    axisLabel: axisType === InbuiltAxisType.LOG ? {
                        formatter: (value:number) => customAxisLabel(value,this.yAxisBase),
                        rich: {
                            title: {
                                verticalAlign: 'super',
                                fontSize: '.5rem',
                            },
                        },
                    } : axisLabel ? axisLabel : null
                }
                updatedXaxis.push(singleAxisData)
            }
        }
        return updatedXaxis;
    }

    /**
     * @description to get the properties for the zoom if axisDragDataZoomShouldShow received true then axis drag zoom will be there in graph or else mousewheel zoom will be there 
     * @returns {Array<DataZoomType>} it returns the property for axis drag zoom
     */
     private getDataZoom(): Array<DataZoomType> {
        if (this.axisDragDataZoomShouldShow) {
            return [{
                type: 'slider',
                orient: this.dataZoomOrient,
                show: this.axisDragDataZoomShouldShow,
                bottom: '1%',
                height: this.dataZoomHeight
            }]
        } else{
            return [
                {
                    type: 'inside'
                }
            ];
        }
    }

    /**
     * @description function to set all the properties for each trace data
     * @returns {Array<SeriesOption>} it will return entire data for ecah traces of the graph control
     */
    private getTraceData():Array<SeriesOption> {
        let updatedTraceData = [];
        const { traceData } = this;
        if (traceData?.length) {
            for (let index = 0; index < traceData.length; index++) {
                const element = traceData[index];
                const { data, errorData, lineType, lineWidth, markerFill, markerType, markerWidth, markerHeight, markerThickness, traceColor, traceID, traceType, yAxisIndex } = element;
                const isLineWithErrorBar = traceType === TraceType.LINE_WITH_ERROR_BARS;
                const isScatterWithErrorBar = traceType === TraceType.SCATTER_WITH_ERROR_BARS;
                if (isLineWithErrorBar || isScatterWithErrorBar) {
                    let singleErrorTraceData = {
                        type: 'custom',
                        itemStyle: {
                            borderWidth: 1.5,
                            color: `${traceColor}`,
                        },
                        renderItem: (params: any, api: any) => this.customTraces(params, api),
                        encode: {
                            x: 0,
                            y: [1, 2],
                        },
                        z: 100,
                        yAxisIndex: yAxisIndex ? yAxisIndex : null,
                        data: errorData,
                    }
                    updatedTraceData.push(singleErrorTraceData);
                    let singleTraceData = {
                        id: traceID,
                        data: data,
                        type: isLineWithErrorBar ? InbuiltTraceType.LINE : InbuiltTraceType.SCATTER,
                        lineStyle: traceType === TraceType.LINE_WITH_ERROR_BARS ? { type: this.getLineType(lineType), width: lineWidth } : '',
                        symbol: this.getMarkerType(markerType, markerFill),
                        symbolSize: markerType === MarkerType.ELLIPSE ? [16, 8] : [markerWidth, markerHeight],
                        itemStyle: {
                            color: `${traceColor}`,
                            opacity: markerThickness
                        },
                        yAxisIndex: yAxisIndex ? yAxisIndex : null,                    }
                    updatedTraceData.push(singleTraceData);
                    // when chartType is heatmap
                } else if (this.chartType === ChartType.HEATMAP) {
                    let singleTraceData = {
                        id: traceID,
                        data: data,
                        type: ChartType.HEATMAP,
                        emphasis: {
                            itemStyle: {
                                borderColor: '#333',
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            }
                        },
                        label: {
                            show: true
                          },
                    }
                    updatedTraceData.push(singleTraceData);
                }
                 else {
                    let singleTraceData = {
                        id: traceID,
                        data: data,
                        type: traceType,
                        lineStyle: traceType === InbuiltTraceType.LINE ? { type: this.getLineType(lineType), width: lineWidth } : '',
                        symbol: this.getMarkerType(markerType, markerFill),
                        symbolSize: markerType === MarkerType.ELLIPSE ? [16, 8] : [markerWidth, markerHeight],
                        itemStyle: {
                            color: `${traceColor}`,
                            opacity: markerThickness
                        },
                        yAxisIndex: yAxisIndex ? yAxisIndex : null,                    
                    }
                    updatedTraceData.push(singleTraceData);
                }
            }
        }
        return updatedTraceData;
    }

    /**
     * @description function to set the customized tooltip message w.r.t to coordinates value
     * @returns {TooltipDataTypes} it will return the custom tootltip message for each coordinates
     */
    private getTooltipData(): TooltipDataTypes{
        let tooltipData = this.tooltipDataPoints;
        const tooltip = {
            axisPointer: {
                type: 'cross',
            },
            formatter: function (params) {
                let data = params.data || [0, 0];
                let x = data[0];
                let y = data[1]
                let coordinatesData = '';
                if(tooltipData){
                    for (let index = 0; index < tooltipData.length; index++) {
                        const element = tooltipData[index];
                        const {xStart, xEnd, yStart, yEnd, tooltipMessage} = element;
                        if(((x >= xStart) && (x <= xEnd))&&((y >= yStart) && (y <= yEnd))){
                            coordinatesData = tooltipMessage;
                        }
                    }
                    if(!coordinatesData){
                        coordinatesData = x + ', ' + y;
                    }
                } else{
                    coordinatesData = x + ', ' + y;
                }
                return coordinatesData;
            }
        };
        return tooltip;
    }
    /**
     * @description method to get the visualmap data when chart type is heatmap
     * @return {VisualMapData} it will return all the data of visualmap
     */
    private getVisualmap(): VisualMapData | null{
        if(this.chartType === ChartType.HEATMAP && this.visualMapData){
            const updatedVisualmapData = {...this.visualMapData, calculable: true, orient: OrientType.HORIZONTAL, left: VisualMapPosition.CENTER, bottom: "15%"}
            return updatedVisualmapData;
        } else return null
    }

    render() {
        return (
            <tf-graph 
                graphTitle={this.getGraphTitleData()}
                xAxis={this.getXaxisData()}
                yAxis={this.getYaxisData()}
                series={this.getTraceData()}
                tooltip={this.getTooltipData()}
                visualMap={this.getVisualmap()}
                dataZoom={this.getDataZoom()}
                toolbox={this.toolbox}
                graphWidth={this.graphWidth}
                graphHeight={this.graphHeight}
                legend={this.legend}
                grid={this.grid}
                additionalContextOptions={this.additionalContextOptions}
                >
                </tf-graph>
        );
    }
}
