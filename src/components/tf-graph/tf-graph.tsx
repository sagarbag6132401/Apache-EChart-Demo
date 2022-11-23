import { Component, Prop, h, State, Watch } from '@stencil/core';
import * as echarts from 'echarts';
@Component({
    tag: 'tf-graph',
    styleUrl: 'tf-graph.scss',
    shadow: true,
})
export class TfGraph {

    /**
     * theme prop used to set the the background color of the graph whether it will be dark or white (white is default value)
     */
    @Prop() theme?: string | Object;

    /**
     * renderer prop used to visualisation mode of graph (canvas is the default value)
     */
    @Prop() renderer: 'canvas' | 'svg';

    /**
     * graphTitle prop stores the information of graph main title, the minimum required value are given below
    {
        text: { 'name' } text content for the title of the graph,
        top: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the top side of the graph
        left: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the left side of the graph
        padding: { ['10','10','10','10'] }, any numeric value of paadding from the respective places in this format [top,right,bottom,left]
        textStyle: {
            fontSize: { '10' }, font size of the graph title in the numeric value format
            color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the graph title in different format 
        }
    }
     */
    @Prop() graphTitle?: echarts.TitleComponentOption;

    /**
     * xAxis stores the information about all the customized feature of xAxis, the minimum required value are given below
        type: {'value' | 'category' | 'time' | 'log'}, type of axis
        name: {'TITLE OF THE AXIS'}, title of the axis
        nameLocation: { 'start' | 'middle' or 'center' | 'end' }, loaction of the title w.r.t to the axis
        nameTextStyle:{
            fontSize: {'Numeric Value'}, font size of the axis title
            color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the axis name in different format 
        },
        max: { '0.5' | '100' | '16' }, any integer value can be the max value of the axis
        min: { '0.1' | '10' | '8' } any integer value can be the min value of the axis
     */
    @Prop() xAxis?: any;

    /**
     * yAxis stores the information about all the customized feature of yAxis
        type: {'value' | 'category' | 'time' | 'log'}, type of axis
        name: {'TITLE OF THE AXIS'}, title of the axis
        nameLocation: { 'start' | 'middle' or 'center' | 'end' }, loaction of the title w.r.t to the axis
        nameTextStyle:{
            fontSize: {'Numeric Value'}, font size of the axis title
            color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the axis name in different format 
        },
        max: { '0.5' | '100' | '16' }, any integer value can be the max value of the axis
        min: { '0.1' | '10' | '8' } any integer value can be the min value of the axis
     */
    @Prop() yAxis?: any;

    /**
     * dataZoom stores the information about all the customized feature of zooming in graph control, the minimum required value are given below
     * {
     *      type: {'inside' | 'slider'} type of zooming feature
     * }
     * 
     */
    @Prop() dataZoom?: echarts.DataZoomComponentOption;

    /**
     * tooltip stores the information about all the customized feature of tooltip, the minimum required value are given below
     * {
     *      axisPointer: {
     *          type: {'cross' | 'line' | 'shadow' | 'none'} types of cross-hair feature
     *    }
     * }
     */
    @Prop() tooltip?: any;

    /**
     * toolbox stores the information about position of rubberband zooming icon
     * { 
     *    orient: { 'horizontal' | 'vertical'}, sequence of the toolbox icon
     *    top: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' }, position from the top side of the graph
     *    right: { 'top' | 'bottom' | 'middle' or 'center' | 'left' | 'right' | 20 | 20% }, position from the left side of the graph can be in pixel, percent also
     *    feature:
     *    {
     *      dataZoom:{
     *              icon: {
     *                  zoom: { 'path://' }, to hide zoom icon
     *                  back: { 'path://' }, to hide zoom reset icon
     *                 }
     *            }
     *    }
     */
    @Prop() toolbox?: echarts.ToolboxComponentOption;

    /**
     * series stores the information all the traces and their properties
     * {
        name: {'NAME OF THE TRACES'}, name of the traces which will be showing into legend data
        id: {'SERIES_1'}, id of the series 
        data: { '[[10, 20],[30, 40]]' | '[[1.5, 2.5],[3.5, 4.5]]'}, data-points for the graph
        type: {'line' | 'bar' | 'pie' | 'scatter' | 'bar' ...} type of traces
        symbol: { 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'}, types of coordinates symbol
        symbolSize: { [3,3] }, size of the coordinates symbol numeric format ['width','height'] 
        lineStyle:{
        type: { 'solid' | 'dashed' | 'dotted' }, if the traces type is line then type line should mention here
        color: { 'black' | 'rgb(255,255,255)' | '#fff' }, set the color of the line traces
        width: { 10 | 2 }, set the width of the line in numeric value
            }
        }
     */
    @Prop() series?: echarts.SeriesOption;

    /**
     * legend stores the information regarding customizing legend features
     * legend:{
        padding: { ['10','10','10','10'] }, to place the legend in some particular position padding can be used in this format [top,right,bottom,left]
        }
     */
    @Prop() legend?: echarts.LegendComponentOption;

    /**
     * htmlElement state used to store the reference of target element 
     */
    @State() htmlElement: HTMLElement;

    /**
     * options state stores the information about all the properties to plot a graph
     */
    @State() options: echarts.EChartsOption;

    private chart?: echarts.EChartsType;
    private resizeObserver: ResizeObserver;

    /**
     * creating instance of the resizeObserver and invoking resize method
     */
    constructor() {
        this.resizeObserver = new ResizeObserver(() => {
            if (this.htmlElement && this.chart) {
                this.chart.resize();
            }
        });
    }
    
    componentDidLoad() {
        this.resizeObserver.observe(this.htmlElement);
    }

    @Watch('series')
    watchSeries() {
        this.updateOptions();
    }

    /**
     * setOptions used to prepare options object which holds all the information to plot a graph
     */
    setOptions() {
        const options = {
            title: this.graphTitle,
            dataZoom: this.dataZoom,
            tooltip: this.tooltip,
            legend: this.legend,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            series: this.series,
            toolbox: this.toolbox
        }
        return options;
    }

    /**
     * to update the options in the runtime
     */
    private updateOptions () {
        const options = this.setOptions();
        console.log("🚀 ~ file: tf-graph.tsx ~ line 192 ~ TfGraph ~ initChart ~ options", options)
        options && this.chart.setOption(options,{notMerge:true});
    }

    /**
     * initChart method used to initialize the graph control
     */
    private initChart() {
        this.chart = echarts.init(this.htmlElement, this.theme, {
            renderer: this.renderer,
        })
        const options = this.setOptions();
        options && this.chart.setOption(options);
    }

    /**
     * setRoot method used invoke initChart method once we have the target element for rendering graph control
     * @param el {HTMLElement | undefined}
     */
    private setRoot = (el: HTMLElement | undefined) => {
        this.htmlElement = el;
        if (el) {
            this.initChart();
        }
    };

    render() {
        return (
            <span
                ref={this.setRoot}
                class="root"
            />
        )
    }
}