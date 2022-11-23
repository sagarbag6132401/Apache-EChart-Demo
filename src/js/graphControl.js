let traceType = ["line","scatter","bar","lineWithErrorBar","scatterWithErrorBar"];

const graphControl = document.querySelector('#GraphControl');
// graphControl.graphTitle = {text:"Item Price graph"};
// graphControl.xAxisType = "Linear";
// graphControl.yAxisType = "Linear";
// graphControl.traceType = "line";
// graphControl.lineType = "DashDotDot";
// graphControl.markerType = "Ellipse";
// graphControl.zoomType = "";

function updateTraceType(series_type){
  graphControl.traceType = series_type;
  graphControl.xAxisType = "Logarithmic";
}
window.addEventListener("click", function () {
  let series_type = document.querySelector("input[type='radio'][name=series_type]:checked")?.value;
  if (traceType.includes(series_type)) {
    updateTraceType(series_type);
  }
});