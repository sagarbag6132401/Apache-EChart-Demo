import { Component, Prop, h, State, Watch, Event, EventEmitter, Listen, Element } from '@stencil/core';
import { GraphDimension, GraphGrid, LegendData, RenderType, TooltipDataTypes, DataZoomType, VisualMapData, AxisDataProperties, ContextMenuOptions, SubMenuInformation } from '../../modules/graphData-types'
import * as echarts from 'echarts';
import { EChartsOption, EChartsType, init, SeriesOption, TitleComponentOption, ToolboxComponentOption} from 'echarts';
import { ZoomType, ExportType } from '../../enum/graphControlEnum';
@Component({
    tag: 'tf-graph',
    styleUrl: 'tf-graph.scss',
    shadow: true,
})
export class TfGraph {

    /**
     * Graph container Element
     */
    graphContainerElement: HTMLElement;

    /**
     * Legend Container Element
     */
    legendContainerElement: HTMLElement;

    /**
     * Context menu container element
     */
    contextMenuContainerElement: HTMLElement

    /**
     * theme prop used to set the the background color of the graph whether it will be dark or white (white is default value)
     */
    @Prop() theme?: string | Object = 'white';

    /**
     * renderer prop used to visualisation mode of graph (svg is the default value)
     */
    @Prop() renderer: RenderType = 'svg';

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
    @Prop() graphTitle?: TitleComponentOption;

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
    @Prop() xAxis?: AxisDataProperties;

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
    @Prop() yAxis?: Array<AxisDataProperties>;

    /**
     * dataZoom stores the information about all the customized feature of zooming in graph control, the minimum required value are given below
     * {
     *      type: {'inside' | 'slider'} type of zooming feature
     * }
     *
     */
    @Prop() dataZoom?: Array<DataZoomType>;

    /**
     * tooltip stores the information about all the customized feature of tooltip, the minimum required value are given below
     * {
     *      axisPointer: {
     *          type: {'cross' | 'line' | 'shadow' | 'none'} types of cross-hair feature
     *    }
     * }
     */
    @Prop() tooltip?: TooltipDataTypes;

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
    @Prop() toolbox?: ToolboxComponentOption;

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
    @Prop() series?: Array<SeriesOption>;

    /**
     * it's stores the information for the width of the graph
     */
    @Prop() graphWidth?: number = 0;

    /**
     * it's stores the information for the height of the graph
     */
    @Prop() graphHeight?: number = 0;

    /**
     * it's stores the information for the padding from the parent container
     */
    @Prop() grid?: Array<GraphGrid> = [{ right: '2%', bottom: '15%', top:'14%', left: '7%'}]

    /**
     * Gets legend data
     */
    @Prop() legend?: LegendData[];

    /**
     * Gets the info to open or close the legend on load
     */
    @Prop() expandLegend: boolean = true

    /**
     *  visualMap is a type of properties for visual encoding, which maps the data to visual channels
     */
    @Prop() visualMap: VisualMapData | null; 

    /**
     * additionalContextOptions is used to send the context-menu options from the consumer end
     */
    @Prop() additionalContextOptions : ContextMenuOptions;

    /**
   * Emit chartfinished event after rendering the graph
   */
    @Event({ eventName: 'chartfinished', cancelable: false }) chartFinished: EventEmitter<any>;

    /**
     * htmlElement state used to store the reference of target element
     */
    @State() htmlElement: HTMLElement;

    /**
     * options state stores the information about all the properties to plot a graph
     */
    @State() options: EChartsOption;

    /**
     * draggable state of legend
     */
    @State() draggable: boolean;

    /**
     * Initial cursor x position on graph
     */
    @State() initialX: number;

    /**
     * Initial cursor y position on graph
     */
    @State() initialY: number;

    @State() contextMenuVisibility: boolean = false;

    @State() contextMenuHeight: number | string = 100;

    @State() contextMenuWidth: number | string = 100;

    @State() legendVisibility : boolean = true;

    @State() graphZoomType: string = "DragToZoom";


    @State() subMenuInfo:SubMenuInformation = {
        parentID:"",
        parentHeight:"",
        parentWidth:"",
    };
    @Element() _host!: HTMLElement;

    /**
     * used to detect the chartfinished event count
     */
    @State() chartFinishedEventCount: number = 0;

    /**
     * State to store the context menu options
     */
    @State() contextMenuOptions?:ContextMenuOptions = null;
    /**
     * to store the instance of chart
     */
    private chart?: EChartsType;

    /**
     * to store new ResizeObserver object
     */
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

    /**
     * @description On listening to chartfinished event this method will be in invkoing updateZoomType method to add the drag to zoom fetaure
     */
    @Listen('chartfinished')
    onChartFinished() {
        this.chartFinishedEventCount += 1;
        if(this.graphZoomType === ZoomType.DRAGTOZOOM){
            this.updateZoomType()
        }
        this.updateContextMenuOptions();
    }

    /**
     * @description if any changes occur in series data, we will be invoking updateOptions method to update the options data into the graph
     */
    @Watch('series')
    watchSeries() {
        this.updateOptions();
    }

    @Watch('graphZoomType')
    watchZoomType(){
        if(this.graphZoomType === ZoomType.MOUSEWHEEL){
            this.dataZoom = [
                {
                    type: 'inside'
                }
            ]
        } else if(this.graphZoomType === ZoomType.AXISDRAG){
            this.dataZoom = [{
                type: 'slider',
                orient: 'horizontal',
                show: true,
                bottom: '1%',
                height: 20
            }]
        }
         else{
            this.dataZoom = [];
        }
    }

    @Watch('dataZoom')
    watchDataZoom(){
        this.chartFinishedEventCount = 0;
        this.updateOptions();
    }

    /**
     * @description if any changes occur in xAxis data, we will be invoking updateOptions method to update the options data into the graph
     */
    @Watch('xAxis')
    watchXais() {
        this.updateOptions();
    }

    /**
     * @description if any changes occur in yAxis data, we will be invoking updateOptions method to update the options data into the graph
     */
    @Watch('yAxis')
    watchYaxis() {
        this.updateOptions();
    }


    componentDidLoad() {
        this.resizeObserver.observe(this.htmlElement);
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
        this.chart.dispose();
        this.chart = null;
      }

    /**
     * @description setOptions used to prepare options object which holds all the information to plot a graph
     * @returns {EChartsCoreOption}
     */
    setOptions(): echarts.EChartsCoreOption {
        const { graphTitle, dataZoom, tooltip, xAxis, yAxis, series, toolbox, grid, visualMap } = this
        let options: echarts.EChartsCoreOption = {
            title: graphTitle,
            dataZoom: dataZoom,
            tooltip: tooltip,
            xAxis: xAxis,
            yAxis: yAxis,
            series: series,
            toolbox: toolbox,
            grid: grid
        }
        if (visualMap) {
            {
                return { ...options, visualMap }
            }
        } else {
            return options
        }
    }

    /**
     * @description whenever any changes occur in the runtime, we will update options value and will be passing the updated data the setOptions
     */
    updateOptions(): void {
        const options = this.setOptions();
        options && this.chart.setOption(options);
    }

    /**
     * @description function to get the height, width and renderer type of graph
     * @returns {GraphDimension}
     */
    private getDimension(): GraphDimension {
        const { renderer, graphWidth, graphHeight } = this;
        let opts: GraphDimension = {
            renderer : renderer
        };
        if (graphWidth && graphHeight) {
            opts = {
                ...opts,
                height: graphHeight,
                width: graphWidth
            }
        }
        return opts;
    }

    /**
     * @description initChart method used to initialize the graph control
     */
    private initChart():void {
        this.chart?.dispose();
        this.chart = init(this.htmlElement, this.theme, this.getDimension())
        const options = this.setOptions();
        options && this.chart.setOption(options);
        for (const evEntry of Object.entries(this.getEventHandlers())) {
            this.chart.on(evEntry[0], evEntry[1] as any);
        }
    }

    /**
     * @description function to register the finished events
     */
    private getEventHandlers() {
        return {
            finished: (event: CustomEvent) => this.chartFinished.emit(event)
        };
    }

    /**
     * @description setRoot method used invoke initChart method once we have the target element for rendering graph control
     * @param {HTMLElement | undefined} targetElement it provides the info for target element where we will be rendering the graph control
     */
    private setRoot = (targetElement: HTMLElement | undefined):void => {
        this.htmlElement = targetElement;
        if (targetElement) {
            this.initChart();
        } else {
            this.chart?.dispose();
            this.chart = null;
          }
    };

    /**
     * @description function to dispatch action for drag to zoom
     */
    private updateZoomType():void {
        if(this.chartFinishedEventCount===1){
            this.chart.dispatchAction({
                type: 'takeGlobalCursor',
                key: 'dataZoomSelect',
                dataZoomSelectActive: true
            })
        }
    }

    /**
     * @description function to add cursor type default into the the entire graph
     * @param {MouseEvent} event it provides the info of mouse w.r.t the hovered element
     */
    private onMouseHover(event : MouseEvent): void {
        (event.target as HTMLElement).style.cursor = "default";
    }

    /**
     * @descripton Removes the draggable state for the legend
     * @param {MouseEvent} event
     */
    @Listen('mouseup', { target: 'document',passive:false }, )
    onMouseUp(event: MouseEvent) {
        event.preventDefault();
        this.draggable = false;
    }

    @Listen('click', { target: 'window', capture: true })
    onWindowClick(event){
        let hostElement = event.composedPath().filter(item => item.id == this._host.id);
        if(!hostElement.includes(this.contextMenuContainerElement)){
            this.resetSubMenuInfo();
            this.contextMenuVisibility = false;
        }
    }

    /**
     * @description function to dispatch action for get back to it's initial state after double click while drag to zoom
     */
    private resetZoom():void {
        this.chart.dispatchAction({
            type: 'restore'
        });
        this.chartFinishedEventCount = 0;
    }
    /**
     * @description This function is used to hide the context menu when a user clicks anywhere outside of the context menu.
     */
    private hideContextMenu():void{
        this.contextMenuVisibility = false;
    }

    /**
     * @description function to download the images of graph at it's current state
     * @param {string} exportType it's holds the image type which is selected by the user from context-menu
     */
    private async exportGraph(exportType: string):Promise<void>{
        let graphUrl = await this.chart.getConnectedDataURL({type: 'svg',pixelRatio: 5,backgroundColor: '#fff',excludeComponents:['toolbox','dataZoom']})
        let fileName = this.graphTitle?.text ? this.graphTitle.text : 'Sample Chart';
            const graphAnchorElement = document.createElement('a');
            graphAnchorElement.download = `${fileName}.${exportType}`;
            graphAnchorElement.target = '_blank';
            graphAnchorElement.href = graphUrl;
            const evt = new MouseEvent('click', {
                view: document.defaultView,
                bubbles: true,
                cancelable: false
            });
            graphAnchorElement.dispatchEvent(evt);
    }

    /**
     * @description Function to update the state responsible for context menu/ sub menu with the default options and options passed from consumer through the prop additionalContextOptions
     */
    private updateContextMenuOptions():void {
        this.contextMenuOptions = {
          ...this.additionalContextOptions,
          ZOOM: {
            'AXIS DRAG': () => {
              this.graphZoomType = ZoomType.AXISDRAG;
            },
            'DRAG TO ZOOM': () => {
              this.graphZoomType = ZoomType.DRAGTOZOOM;
            },
            'MOUSE WHEEL ZOOM': () => {
              this.graphZoomType = ZoomType.MOUSEWHEEL;
            },
          },
          LEGEND: {
            SHOW: () => {
              this.expandLegend = true;
            },
            HiDE: () => {
              this.expandLegend = false;
            },
          },
          'EXPORT GRAPH': () => {
            this.exportGraph(ExportType.SVG)
        }
        };
    }
    
    /**
     * @description Function to turn on the visibility of the context menu on right mouse button click
     * @param {MouseEvent} event 
     */
    private showContextMenu(event:any):void{
        console.log("inside showContextMenu=>");
        this.contextMenuVisibility = true;
        event.preventDefault();
        event.stopPropagation()
        this.contextMenuWidth = event.layerX + 'px';
        this.contextMenuHeight = event.layerY + 'px';
    }

    /**
     * @description This function clears the submenu's parent height and parent width, as well as the parent ID.
     */
    private resetSubMenuInfo():void {
        this.subMenuInfo = {
            parentID: '',
            parentHeight: '',
            parentWidth: '',
        };
    }

    /**
     * @description function to hide the context menu and invoke the callback function provided with the menu/submenu action
     * @param {Function} cb
     */
    private invokeActionCallback(cb:Function):void{
        this.resetSubMenuInfo();
        this.hideContextMenu();
        cb();
    }

    /**
     * @description Reset/Update the subMenuInfo state based on whether same menu icon clicked or new subMenu trying to be opened
     * @param {string} newSubMenuID 
     * @param {MouseEvent} event 
     */
    private updateSubMenuInfo(newSubMenuID:string, event:MouseEvent):void {
        let oldSubMenuInfo = {...this.subMenuInfo};
        //if user clicks on the icon of the already opened context menu then the sub menu will be closed
        if(oldSubMenuInfo.parentID.length && oldSubMenuInfo.parentID === newSubMenuID) {
            this.resetSubMenuInfo()
            return;
        };
        //set the new parent ID and appropriate height and width for the subMenu
        this.subMenuInfo = {
            parentID: newSubMenuID,
            parentHeight: event.clientY + 2 + "px",
            parentWidth: event.clientX + 12 + "px",
        }
    }
    /**
     * @description Function to generate the DOM tree of the context menu(it is also used to generate the sub menu tree)
     * @param {ContextMenuOptions} contextOptions 
     * @param {null | {}} event 
     * @returns {HTMLElement} JSX for the context menu/sub menu
     */
    private generateContextMenu(contextOptions: ContextMenuOptions=this.contextMenuOptions, event: null | {} = null):HTMLElement {
        console.log("inside generateContextMenu==>>");
      return (
        <div
          ref={el => (event ? 'context_submenu' : (this.contextMenuContainerElement = el as HTMLElement))}
          class={'graph-context-menu'}
          style={{ left: `${event ? 0 : this.contextMenuWidth}`, top: `${event ? 0 : this.contextMenuHeight}` }}
        >
          {contextOptions &&
            Object.entries(contextOptions).map((listItem, index) => {
              return (
                <div onClick={()=>{typeof listItem[1] === "function" && this.invokeActionCallback(listItem[1])}} class="graph-list-item" key={index} id={listItem[0]}>
                  <div>{listItem[0]}
                  {/* TODO:Add tooltip icon for additional information about the option */}
                  </div>
                  {listItem[1] && typeof listItem[1] !== "function" && Object.keys(listItem[1]).length ? (
                    <span>
                      <span>
                        <i class="arrow right" onClick={event => this.updateSubMenuInfo(listItem[0], event)} />
                      </span>
                      <div
                        class={this.subMenuInfo.parentID === listItem[0] ? 'visible' : 'invisible'}
                        style={{ position: 'fixed', top: this.subMenuInfo.parentHeight, left: this.subMenuInfo.parentWidth, zIndex: '13' }}
                      >
                        {this.generateContextMenu(listItem[1], {})}
                      </div>
                    </span>
                  ) : null}
                </div>
              );
            })}
        </div>
      );
    }

    render() {
        return (
            <div
                class="graph-container"
            >
                <span
                    ref={this.setRoot}
                    class="root"
                    onDblClick={() => this.resetZoom()}
                    onMouseOver={(event) => this.onMouseHover(event)}
                    onClick={()=>this.hideContextMenu()}
                    onContextMenu={(event)=>this.showContextMenu(event)}
                />
                {this.contextMenuVisibility && this.generateContextMenu()}
            </div>
        )
    }
}
