let traceType = ['line', 'scatter', 'bar', 'lineWithErrorBar', 'scatterWithErrorBar'];
const graphControl = document.querySelector('#GraphControl');
graphControl.toolbox = {
  orient   : 'vertical',
  itemSize : 13,
  top      : 15,
  right    : -6,
  feature  : {
    dataZoom : {
      icon        : {
          zoom : 'path://',
          back : 'path://',
      },
  },
  },
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

/*---------Axis type dom refs-----------*/
const xLinearAxis = document.querySelector('#xLinear');
const xLogarithmicAxis = document.querySelector('#xLogarithmic');
const yLinearAxis = document.querySelector('#yLinear');
const yLogarithmicAxis = document.querySelector('#yLogarithmic');
/*---------Axis type dom refs-----------*/

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
/*---------Functions-------------*/
const updateTraceType = (series_type) => {
  graphControl.traceType = series_type;
}

const updateXaxisType = (axisType) => {
    graphControl.xAxisType = axisType;
};

const updateYaxisType = (axisType) => {
  graphControl.yAxisType = axisType;
}

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

/*-----------Axis type Event Listener------------*/
xLinearAxis.addEventListener('click', ()=> updateXaxisType('Linear'));
xLogarithmicAxis.addEventListener('click',()=> updateXaxisType('Logarithmic'));
yLinearAxis.addEventListener('click',()=> updateYaxisType('Linear'));
yLogarithmicAxis.addEventListener('click',()=> updateYaxisType('Logarithmic'));
/*-----------Axis type Event Listener------------*/

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
