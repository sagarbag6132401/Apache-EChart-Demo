export enum MarkerType {
    NONE = "None",
    CROSS = "Cross",
    ELLIPSE = "Ellipse",
    SQUARE = "Square",
    TRIANGLE = "Triangle"
}

export enum LineType {
    SOLID = "Solid",
    DOT = "Dot",
    DASH = "Dash",
    DASH_DOT = "DashDot",
    DASH_DOT_DOT = "DashDotDot",
    LONG_DASH = "LongDash",
    LONG_DASH_DOT = "LongDashDot",
    LONG_DASH_DOT_DOT = "LongDashDotDot"
}

export enum TraceType {
    LINE = "Line",
    SCATTER = "Scatter",
    LINE_WITH_ERROR_BARS = "LineWithErrorBars",
    SCATTER_WITH_ERROR_BARS = "ScatterWithErrorBars",
    BAR = "Bar"
}


export enum EmptyMarker{
    EMPTYRECT = "emptyRect",
    EMPTYTRIANGLE = "emptyTriangle"
}

export enum ChartType{
    HEATMAP = 'heatmap',
}

export enum OrientType{
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ZoomType{
    AXISDRAG = 'AxisDrag',
    DRAGTOZOOM = 'DragToZoom',
    MOUSEWHEEL = 'MouseWheel'
}

export enum ExportType{
    JPEG = 'jpeg',
    PNG = 'png',
    SVG = 'svg'
}

export const LegendLocation = ["",{
    top:"left",
    left:"left",
},
{
    top:"left",
    left:"right",
},
{
    bottom:"left",
    left:"left",
},
{
    bottom:"left",
    left:"right",
}
]

/*------------------Below types are the inbuilt types which are supported by the apache echart----------------*/
/*-------------------------START----------------------*/
export enum InbuiltMarkerType {
    NONE = "none",
    SQUARE = "rect",
    TRIANGLE = "triangle"
}

export enum InbuiltLineType {
    SOLID = "solid",
    DOTTED = "dotted",
    DASHED = "dashed"
}

export enum InbuiltTraceType {
    LINE = "line",
    SCATTER = "scatter",
    BAR = "bar"
}

export enum InbuiltAxisType{
    VALUE = "value",
    CATEGORY = "category",
    TIME = "time",
    LOG = "log"
}
/*-------------------------END----------------------*/
