let traceType = ['line', 'scatter', 'bar', 'lineWithErrorBar', 'scatterWithErrorBar'];

const graphControl = document.querySelector('#GraphControl');
// graphControl.graphTitle = {text:"Item Price graph"};
// graphControl.xAxisType = "Linear";
graphControl.yAxisType = 'Logarithmic';
// graphControl.traceType = "line";
// graphControl.lineType = "DashDotDot";
// graphControl.markerType = "Ellipse";
// graphControl.zoomType = "";

function updateTraceType(series_type) {
  graphControl.traceType = series_type;
}

/*---------Customization section------------*/
/*----------DOM references------------*/
/*---------Trace type dom refs-----------*/
const lineRadio = document.querySelector('#line');
const scatterRadio = document.querySelector('#scatter');
const barRadio = document.querySelector('#bar');
const lineWithErrorBarRadio = document.querySelector('#lineWithErrorBar');
const scatterWithErrorBarRadio = document.querySelector('#scatterWithErrorBar');
/*---------Trace type dom refs-----------*/
/*---------Marker type dom refs-----------*/
const crossRadio = document.querySelector('#cross');
const ellipseRadio = document.querySelector('#ellipse');
const squareRadio = document.querySelector('#square');
const triangleRadio = document.querySelector('#triangle');
const noneRadio = document.querySelector('#none');
/*---------Marker type dom refs-----------*/
const xAxisRadio = document.querySelector('#xAxis');
console.log('🚀 ~ file: graphControl.js ~ line 25 ~ xAxisRadio', xAxisRadio);
const yAxisRadio = document.querySelector('#yAxis');
const xAxisTypeCustomizationContainer = document.querySelector('#xAxisTypeCustomizationContainer');
const yAxisTypeCustomizationContainer = document.querySelector('#yAxisTypeCustomizationContainer');
let xLinearAxisTypeCheckbox = document.querySelector('#xLinear');
let xLogarithmicAxisTypeCheckbox = document.querySelector('#xLogarithmic');
let yLinearAxisTypeCheckbox = document.querySelector('#yLinear');
let yLogarithmicAxisTypeCheckbox = document.querySelector('#yLogarithmic');

/*----Line type dom refs------*/
const solidLineRadio = document.querySelector('#Solid');
const dotLineRadio = document.querySelector('#Dot');
const dashLineRadio = document.querySelector('#Dash');
const dashDotLineRadio = document.querySelector('#DashDot');
const dashDotDotLineRadio = document.querySelector('#DashDotDot');
const LongDashLineRadio = document.querySelector('#LongDash');
const LongDashDotLineRadio = document.querySelector('#LongDashDot');
const LongDashDotDotLineRadio = document.querySelector('#LongDashDotDot');

/*----Line type dom refs------*/
/*----------DOM references------------*/
/*----------State Variables------------*/
let customisedAxis = '';
let xAxisType = 'linear';
let yAxisType = 'linear';
/*----------State Variables------------*/
/*---------Functions-------------*/
const getSelectedAxis = () => {
  console.log('Inside the getSelectedAxis');
  // debugger;
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
  console.log('🚀 ~ file: graphControl.js ~ line 73 ~ getSelectedAxis ~ customisedAxis', customisedAxis);
};

const updateAxisType = () => {
  debugger;
  let selectedType = '';
  if (customisedAxis === 'xAxis') {
    if (xLinearAxisTypeCheckbox.checked) {
      xAxisType = 'linear';
    } else {
      xAxisType = 'logarithmic';
    }
    customiseGraphProperties('xAxisType', xAxisType);
  } else if (customisedAxis === 'yAxis') {
    if (yLinearAxisTypeCheckbox.checked) {
      // yAxisType = 'Linear';
      // customiseGraphProperties('yAxisType', 'Linear');
      graphControl.yAxisType = 'Linear';
    } else {
      // yAxisType = 'Logarithmic';
      // customiseGraphProperties('yAxisType', 'Logarithmic');
      graphControl.yAxisType = 'Logarithmic';
    }

    // customiseGraphProperties('yAxisType', yAxisType);
  }
  // customiseGraphProperties("")
};

const toggleDisplayForCustomizationContainer = (axis, displayProp) => {
  axis.style.display = displayProp;
};

const updateLineType = () => {
  if (dotLineRadio.checked) {
    graphControl.lineType = 'Dot';
  } else if (solidLineRadio.checked) {
    graphControl.lineType = 'Solid';
  } else if (dashLineRadio.checked) {
    graphControl.lineType = 'Dash';
  } else if (dashDotLineRadio.checked) {
    graphControl.lineType = 'DashDot';
  } else if (dashDotDotLineRadio.checked) {
    graphControl.lineType = 'DashDotDot';
  } else if (LongDashLineRadio.checked) {
    graphControl.lineType = 'LongDash';
  } else if (LongDashDotLineRadio.checked) {
    graphControl.lineType = 'LongDashDot';
  } else if (LongDashDotDotLineRadio.checked) {
    graphControl.lineType = 'LongDashDotDot';
  }
};

const updateMarkerType = marker_type => {
  graphControl.markerType = marker_type;
};

const customiseGraphProperties = (property, value) => {
  console.log('🚀 ~ file: graphControl.js ~ line 89 ~ customiseGraphProperties ~ property, value', property, value);
  if (graphControl.hasOwnProperty(property)) {
    graphControl[`${property}`] = value;
  }
};
/*---------Functions-------------*/
/*-----------Event Listener Register-------------*/
/*-----------Trace type Event Listener------------*/
lineRadio.addEventListener('click', () => updateTraceType('line'));
scatterRadio.addEventListener('click', () => updateTraceType('scatter'));
barRadio.addEventListener('click', () => updateTraceType('bar'));
lineWithErrorBarRadio.addEventListener('click', () => updateTraceType('lineWithErrorBar'));
scatterWithErrorBarRadio.addEventListener('click', () => updateTraceType('scatterWithErrorBar'));
/*-----------Trace type Event Listener------------*/
/*-----------Marker type Event Listener------------*/
crossRadio.addEventListener('click', () => updateMarkerType('Cross'));
ellipseRadio.addEventListener('click', () => updateMarkerType('Ellipse'));
squareRadio.addEventListener('click', () => updateMarkerType('Square'));
triangleRadio.addEventListener('click', () => updateMarkerType('Triangle'));
noneRadio.addEventListener('click', () => updateMarkerType('None'));
/*-----------Marker type Event Listener------------*/
xAxisRadio.addEventListener('click', getSelectedAxis);
yAxisRadio.addEventListener('click', getSelectedAxis);
xLinearAxisTypeCheckbox.addEventListener('click', updateAxisType);
xLogarithmicAxisTypeCheckbox.addEventListener('click', updateAxisType);
yLinearAxisTypeCheckbox.addEventListener('click', updateAxisType);
yLogarithmicAxisTypeCheckbox.addEventListener('click', updateAxisType);
/*-----------Line type event Listener-------------*/
solidLineRadio.addEventListener('click', updateLineType);
dotLineRadio.addEventListener('click', updateLineType);
dashLineRadio.addEventListener('click', updateLineType);
dashDotLineRadio.addEventListener('click', updateLineType);
dashDotDotLineRadio.addEventListener('click', updateLineType);
LongDashLineRadio.addEventListener('click', updateLineType);
LongDashDotLineRadio.addEventListener('click', updateLineType);
LongDashDotDotLineRadio.addEventListener('click', updateLineType);
/*-----------Line type event Listener-------------*/
/*-----------Event Listener Register-------------*/
/*---------Customization section------------*/
