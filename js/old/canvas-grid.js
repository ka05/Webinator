var canvas = new fabric.Canvas('c', { selection: false });
var grid = 20;

// create grid

for (var i = 0; i < (1000 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
}

// add objects

canvas.add(new fabric.Rect({ 
  left: 20, 
  top: 30, 
  width: 900, 
  height: 50, 
  fill: '#faa', 
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
}));

// canvas.add(new fabric.Circle({ 
//   left: 300, 
//   top: 300, 
//   radius: 50, 
//   fill: '#9f9', 
//   originX: 'left', 
//   originY: 'top',
//   centeredRotation: true
// }));

// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});
