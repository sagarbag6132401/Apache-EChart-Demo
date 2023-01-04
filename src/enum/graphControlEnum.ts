export const MarkerType = ["None","Cross","Ellipse","Square","Triangle"]
export const defaultMarkerType = ["none","rect","triangle"]

// 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'


    // None = 0,
    // 1 = Cross,
    //     Ellipse,
    //     Square,
    //     Triangle,
    // 0: "None,"

    // MarkerTypre = Ellipse, Cross ==>> Not available

export const LineType = ["Solid","Dot","Dash","DashDot","DashDotDot","LongDash","LongDashDot","LongDashDotDot"]
export const defaultLineType = ["solid","dotted","dashed"]
// Solid = 0,
        // Dot,
        // Dash,
        // DashDot,
        // DashDotDot,
        // LongDash,
        // LongDashDot,
        // LongDashDotDot,

// LineType = DashDot, DashDotDot, DashDotDot, LongDash, LongDashDot, LongDashDotDot ==>> Not available

// 'solid'
// 'dashed'
// 'dotted'

export const TraceType = ["Line","Scatter","LineWithErrorBars","ScatterWithErrorBars","bar"]
// "line","scatter","bar"

// TraceType = ScatterWithErrorBars, LineWithErrorBars ==>> Not available

// public enum TraceType
//     {
//         Line = 0,
//         Scatter,
//         LineWithErrorBars,
//         ScatterWithErrorBars,
//         Bar
//     }

export const AxisType = ["Linear","Logarithmic"]
// "value","category","time","log"

// public enum AxisType
//     {
//         Linear = 0,
//         Logarithmic
//     }

export const xAxisDataType = ["value","time"]
// "value","category","time","log"

// public enum AxisDataType
//     {
//         Numeric = 0,
//         DateTime
//     }

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

// Any = 0,
//         TopRight = 1,
//         TopLeft = 2,
//         BottomLeft = 3,
//         BottomRight = 4, 

