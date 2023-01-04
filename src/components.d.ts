/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface TfGraph {
        /**
          * dataZoom stores the information about all the customized feature of zooming in graph control, the minimum required value are given below {      type: {'inside' | 'slider'} type of zooming feature }
         */
        "dataZoom"?: echarts.DataZoomComponentOption;
        /**
          * graphTitle prop stores the information of graph main title, the minimum required value are given below {  text: { 'name' } text content for the title of the graph,  top: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the top side of the graph  left: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the left side of the graph  padding: { ['10','10','10','10'] }, any numeric value of paadding from the respective places in this format [top,right,bottom,left]  textStyle: {      fontSize: { '10' }, font size of the graph title in the numeric value format      color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the graph title in different format   } }
         */
        "graphTitle"?: echarts.TitleComponentOption;
        /**
          * legend stores the information regarding customizing legend features legend:{  padding: { ['10','10','10','10'] }, to place the legend in some particular position padding can be used in this format [top,right,bottom,left]  }
         */
        "legend"?: echarts.LegendComponentOption;
        /**
          * renderer prop used to visualisation mode of graph (canvas is the default value)
         */
        "renderer": 'canvas' | 'svg';
        /**
          * series stores the information all the traces and their properties {  name: {'NAME OF THE TRACES'}, name of the traces which will be showing into legend data  id: {'SERIES_1'}, id of the series   data: { '[[10, 20],[30, 40]]' | '[[1.5, 2.5],[3.5, 4.5]]'}, data-points for the graph  type: {'line' | 'bar' | 'pie' | 'scatter' | 'bar' ...} type of traces  symbol: { 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'}, types of coordinates symbol  symbolSize: { [3,3] }, size of the coordinates symbol numeric format ['width','height']   lineStyle:{  type: { 'solid' | 'dashed' | 'dotted' }, if the traces type is line then type line should mention here  color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the line traces  width: { 10 | 2 }, set the width of the line in numeric value      }  }
         */
        "series"?: echarts.SeriesOption;
        /**
          * theme prop used to set the the background color of the graph whether it will be dark or white (white is default value)
         */
        "theme"?: string | Object;
        /**
          * toolbox stores the information about position of rubberband zooming icon {     orient: { 'horizontal' | 'vertical'}, sequence of the toolbox icon    top: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the top side of the graph    right: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' | 20 | 20% }, position from the left side of the graph can be in pixel, percent also    feature:    {      dataZoom:{              icon: {                  zoom: { 'path://' }, to hide zoom icon                  back: { 'path://' }, to hide zoom reset icon                 }            }    }
         */
        "toolbox"?: echarts.ToolboxComponentOption;
        /**
          * tooltip stores the information about all the customized feature of tooltip, the minimum required value are given below {      axisPointer: {          type: {'cross' | 'line' | 'shadow' | 'none'} types of cross-hair feature    } }
         */
        "tooltip"?: any;
        /**
          * xAxis stores the information about all the customized feature of xAxis, the minimum required value are given below  type: {'value' | 'category' | 'time' | 'log'}, type of axis  name: {'TITLE OF THE AXIS'}, title of the axis  nameLocation: { 'start' | 'middle' or 'center' | 'end' }, loaction of the title w.r.t to the axis  nameTextStyle:{      fontSize: {'Numeric Value'}, font size of the axis title      color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the axis name in different format   },  max: { '0.5' | '100' | '16' }, any integer value can be the max value of the axis  min: { '0.1' | '10' | '8' } any integer value can be the min value of the axis
         */
        "xAxis"?: any;
        /**
          * yAxis stores the information about all the customized feature of yAxis  type: {'value' | 'category' | 'time' | 'log'}, type of axis  name: {'TITLE OF THE AXIS'}, title of the axis  nameLocation: { 'start' | 'middle' or 'center' | 'end' }, loaction of the title w.r.t to the axis  nameTextStyle:{      fontSize: {'Numeric Value'}, font size of the axis title      color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the axis name in different format   },  max: { '0.5' | '100' | '16' }, any integer value can be the max value of the axis  min: { '0.1' | '10' | '8' } any integer value can be the min value of the axis
         */
        "yAxis"?: any;
    }
    interface TfGraphDatasource {
        "graphTitle"?: any;
        "lineType"?: any;
        "markerType"?: any;
        "toolbox"?: any;
        "traceType": string;
        "xAxisType"?: any;
        "yAxisType"?: any;
        "zoomType"?: any;
    }
}
export interface TfGraphCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTfGraphElement;
}
declare global {
    interface HTMLTfGraphElement extends Components.TfGraph, HTMLStencilElement {
    }
    var HTMLTfGraphElement: {
        prototype: HTMLTfGraphElement;
        new (): HTMLTfGraphElement;
    };
    interface HTMLTfGraphDatasourceElement extends Components.TfGraphDatasource, HTMLStencilElement {
    }
    var HTMLTfGraphDatasourceElement: {
        prototype: HTMLTfGraphDatasourceElement;
        new (): HTMLTfGraphDatasourceElement;
    };
    interface HTMLElementTagNameMap {
        "tf-graph": HTMLTfGraphElement;
        "tf-graph-datasource": HTMLTfGraphDatasourceElement;
    }
}
declare namespace LocalJSX {
    interface TfGraph {
        /**
          * dataZoom stores the information about all the customized feature of zooming in graph control, the minimum required value are given below {      type: {'inside' | 'slider'} type of zooming feature }
         */
        "dataZoom"?: echarts.DataZoomComponentOption;
        /**
          * graphTitle prop stores the information of graph main title, the minimum required value are given below {  text: { 'name' } text content for the title of the graph,  top: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the top side of the graph  left: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the left side of the graph  padding: { ['10','10','10','10'] }, any numeric value of paadding from the respective places in this format [top,right,bottom,left]  textStyle: {      fontSize: { '10' }, font size of the graph title in the numeric value format      color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the graph title in different format   } }
         */
        "graphTitle"?: echarts.TitleComponentOption;
        /**
          * legend stores the information regarding customizing legend features legend:{  padding: { ['10','10','10','10'] }, to place the legend in some particular position padding can be used in this format [top,right,bottom,left]  }
         */
        "legend"?: echarts.LegendComponentOption;
        "onChartclick"?: (event: TfGraphCustomEvent<any>) => void;
        /**
          * Dispatched when the chart zoom has changed
         */
        "onChartdatazoom"?: (event: TfGraphCustomEvent<any>) => void;
        /**
          * Dispatched when an element in the chart is double clicked
         */
        "onChartdblclick"?: (event: TfGraphCustomEvent<any>) => void;
        "onChartfinished"?: (event: TfGraphCustomEvent<any>) => void;
        "onChartrendered"?: (event: TfGraphCustomEvent<any>) => void;
        /**
          * Dispatched when the chart selection has changed
         */
        "onChartselectchanged"?: (event: TfGraphCustomEvent<any>) => void;
        /**
          * renderer prop used to visualisation mode of graph (canvas is the default value)
         */
        "renderer"?: 'canvas' | 'svg';
        /**
          * series stores the information all the traces and their properties {  name: {'NAME OF THE TRACES'}, name of the traces which will be showing into legend data  id: {'SERIES_1'}, id of the series   data: { '[[10, 20],[30, 40]]' | '[[1.5, 2.5],[3.5, 4.5]]'}, data-points for the graph  type: {'line' | 'bar' | 'pie' | 'scatter' | 'bar' ...} type of traces  symbol: { 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'}, types of coordinates symbol  symbolSize: { [3,3] }, size of the coordinates symbol numeric format ['width','height']   lineStyle:{  type: { 'solid' | 'dashed' | 'dotted' }, if the traces type is line then type line should mention here  color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the line traces  width: { 10 | 2 }, set the width of the line in numeric value      }  }
         */
        "series"?: echarts.SeriesOption;
        /**
          * theme prop used to set the the background color of the graph whether it will be dark or white (white is default value)
         */
        "theme"?: string | Object;
        /**
          * toolbox stores the information about position of rubberband zooming icon {     orient: { 'horizontal' | 'vertical'}, sequence of the toolbox icon    top: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the top side of the graph    right: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' | 20 | 20% }, position from the left side of the graph can be in pixel, percent also    feature:    {      dataZoom:{              icon: {                  zoom: { 'path://' }, to hide zoom icon                  back: { 'path://' }, to hide zoom reset icon                 }            }    }
         */
        "toolbox"?: echarts.ToolboxComponentOption;
        /**
          * tooltip stores the information about all the customized feature of tooltip, the minimum required value are given below {      axisPointer: {          type: {'cross' | 'line' | 'shadow' | 'none'} types of cross-hair feature    } }
         */
        "tooltip"?: any;
        /**
          * xAxis stores the information about all the customized feature of xAxis, the minimum required value are given below  type: {'value' | 'category' | 'time' | 'log'}, type of axis  name: {'TITLE OF THE AXIS'}, title of the axis  nameLocation: { 'start' | 'middle' or 'center' | 'end' }, loaction of the title w.r.t to the axis  nameTextStyle:{      fontSize: {'Numeric Value'}, font size of the axis title      color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the axis name in different format   },  max: { '0.5' | '100' | '16' }, any integer value can be the max value of the axis  min: { '0.1' | '10' | '8' } any integer value can be the min value of the axis
         */
        "xAxis"?: any;
        /**
          * yAxis stores the information about all the customized feature of yAxis  type: {'value' | 'category' | 'time' | 'log'}, type of axis  name: {'TITLE OF THE AXIS'}, title of the axis  nameLocation: { 'start' | 'middle' or 'center' | 'end' }, loaction of the title w.r.t to the axis  nameTextStyle:{      fontSize: {'Numeric Value'}, font size of the axis title      color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the axis name in different format   },  max: { '0.5' | '100' | '16' }, any integer value can be the max value of the axis  min: { '0.1' | '10' | '8' } any integer value can be the min value of the axis
         */
        "yAxis"?: any;
    }
    interface TfGraphDatasource {
        "graphTitle"?: any;
        "lineType"?: any;
        "markerType"?: any;
        "toolbox"?: any;
        "traceType"?: string;
        "xAxisType"?: any;
        "yAxisType"?: any;
        "zoomType"?: any;
    }
    interface IntrinsicElements {
        "tf-graph": TfGraph;
        "tf-graph-datasource": TfGraphDatasource;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "tf-graph": LocalJSX.TfGraph & JSXBase.HTMLAttributes<HTMLTfGraphElement>;
            "tf-graph-datasource": LocalJSX.TfGraphDatasource & JSXBase.HTMLAttributes<HTMLTfGraphDatasourceElement>;
        }
    }
}
