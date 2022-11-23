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
}
window.addEventListener("click", function () {
  let series_type = document.querySelector("input[type='radio'][name=series_type]:checked")?.value;
  if (traceType.includes(series_type)) {
    updateTraceType(series_type);
  }
});
















/*---------Customization section------------*/
/*----------DOM references------------*/
const xAxisRadio = document.querySelector('#xAxis');
const yAxisRadio = document.querySelector('#yAxis');
const xAxisTypeCustomizationContainer = document.querySelector('#xAxisTypeCustomizationContainer');
const yAxisTypeCustomizationContainer = document.querySelector('#yAxisTypeCustomizationContainer');
let xLinearAxisTypeCheckbox = document.querySelector('#xLinear');
let xLogarithmicAxisTypeCheckbox = document.querySelector('#xLogarithmic');
let yLinearAxisTypeCheckbox = document.querySelector('#yLinear');
let yLogarithmicAxisTypeCheckbox = document.querySelector('#yLogarithmic');
/*----------DOM references------------*/
/*----------State Variables------------*/
let customisedAxis = '';
let xAxisType = 'linear';
let yAxisType = 'linear';
/*----------State Variables------------*/
/*---------Functions-------------*/
const getSelectedAxis = () => {
  let selectedAxis = '';
  // customisedAxis = selectedAxis;
  // axisTypeCustomizationContainer.style.display = 'block';
  if (xAxisRadio.checked) {
    // yAxisTypeCustomizationContainer.style.display = 'none';
    toggleDisplayForCustomizationContainer(yAxisTypeCustomizationContainer, 'none');
    selectedAxis = 'xAxis';
    toggleDisplayForCustomizationContainer(xAxisTypeCustomizationContainer, 'block');
  } else if (yAxisRadio.checked) {
    toggleDisplayForCustomizationContainer(xAxisTypeCustomizationContainer, 'none');
    selectedAxis = 'yAxis';
    toggleDisplayForCustomizationContainer(yAxisTypeCustomizationContainer, 'block');
  } else {
    toggleDisplayForCustomizationContainer(yAxisTypeCustomizationContainer, 'none');
    toggleDisplayForCustomizationContainer(xAxisTypeCustomizationContainer, 'none');
  }
  customisedAxis = selectedAxis;
  console.log("🚀 ~ file: graphControl.js ~ line 73 ~ getSelectedAxis ~ customisedAxis", customisedAxis)
};

const updateAxisType = () => {
  let selectedType = '';
  if (customisedAxis === 'xAxis') {
    if (xLinearAxisTypeCheckbox.checked) {
      xAxisType = 'linear';
    } else {
      xAxisType = 'logarithmic';
    }
  } else if (customisedAxis === 'yAxis') {
    if (yLinearAxisTypeCheckbox.checked) {
      yAxisType = 'linear';
    } else {
      yAxisType = 'logarithmic';
    }
  }
  console.log("xAxisType==>>",xAxisType,"yAxisType==>>",yAxisType);
};

const toggleDisplayForCustomizationContainer = (axis, displayProp) => {
  axis.style.display = displayProp;
};
/*---------Functions-------------*/
/*-----------Event Listener Register-------------*/
xAxisRadio.addEventListener('click', getSelectedAxis);
yAxisRadio.addEventListener('click', getSelectedAxis);
xLinearAxisTypeCheckbox.addEventListener('click', updateAxisType);
xLogarithmicAxisTypeCheckbox.addEventListener('click', updateAxisType);
yLinearAxisTypeCheckbox.addEventListener('click', updateAxisType);
yLogarithmicAxisTypeCheckbox.addEventListener('click', updateAxisType);
/*-----------Event Listener Register-------------*/
/*---------Customization section------------*/
