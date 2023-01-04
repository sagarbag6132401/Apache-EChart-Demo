export interface TooltipData {
  graphName?: string;
  rowIndexFinder?: string;
  tooltipParams: Array<string | number>;
  tooltipMessage?: string;
  xEnd: number;
  xStart: number;
  yEnd: number;
  yStart: number;
}

export interface TraceDataTypes {
    data?: Array<Array<number> | number | string>,
    errorData?: Array<Array<number>>,
    lineType?: string,
    lineWidth?: number,
    markerFill?: boolean | undefined,
    markerHeight?: number,
    markerThickness?: number,
    markerType?: string,
    markerWidth?: number,
    traceColor?: string,
    traceID?: string,
    traceType?: string,
    renderItem?: any,
    yAxisIndex?: number
}

export type RenderType = 'canvas' | 'svg';

export interface GraphDimension {
  renderer?: RenderType;
  height?: number;
  width?: number;
}

export interface GraphGrid {
  right?: string;
  bottom?: string;
  top?: string;
  left?: string;
}

export interface AxisPointerType {
  type: string;
}

export interface TooltipDataTypes {
  axisPointer: AxisPointerType;
  formatter?: any;
}

export interface AxisDataTypes {
    min?: number,
    max?: number,
    name?: string,
    data?: Array<string | number> | null
    nameTextStyle?: any,
    nameLocation?: string,
    nameGap?: number,
    nameRotate?: number | string,
    axisLabel?: any,
    axisLine?: {
        show?: boolean,
        onZero?: boolean
    },
    alignTicks?: boolean,
    offset?: number | string,
    position?: string,
    axisTick?: AxisTick
}

export interface AxisDataResponseTypes extends AxisDataTypes{
    type: number
}

export interface AxisDataProperties extends AxisDataTypes{
    type: string
}

export interface GraphTitleDataTypes {
  text?: string;
  textStyle?: any;
}

export interface AxisTick{
    alignWithLabel: boolean;
  }

interface shape {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface customTraceChildren {
  type: string;
  transition: Array<string>;
  shape: shape;
  style: any;
}

export interface CustomErrorTrace {
  type: string;
  children: Array<customTraceChildren>;
}

export interface LegendData {
  traceId: number;
  color: string;
  text: string;
}

export interface VisualMapData {
  type: string;
  min: number;
  max: number;
  inRange: {
    color: string[];
  };
  show?: boolean;
  calculable?: boolean;
  orient?: string;
  left?: string;
  bottom?: string;
}
export interface DataZoomType {
  orient?: string;
  show?: boolean;
  bottom?: string;
  right?: string;
  height?: string | number;
  type?: string;
}

export interface ContextMenuOptions {
  [title: string]: ContextMenuOptions | null | Function;
}

export interface SubMenuInformation {
  parentID: string;
  parentHeight: string;
  parentWidth: string;
}
