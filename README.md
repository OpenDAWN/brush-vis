## Selection tool

> Selection layer based on the d3 generic brush component

Use this module to select `.selectable` items in a timeline.  
The module relies on a [timeline](https://github.com/Ircam-RnD/timeLine) instance.
###Demo

A woring demo for this module can be found [here](https://ircam-rnd.github.io/brush-vis)
### Usage

#### Creating a brush layer
```js
var brush = brushVis().name('bruce');
```

#### Handling the brush events
```js
// Brush interaction
brush.on('brush', function(extent) {
  // we loop trhough layers
  for (var ly in graph.layers) {
    var layer = graph.layers[ly];
    // call the layer's brushItem implementation and pass it in the extent
    if(layer.brushItem) layer.brushItem(extent);
  }
})
.on('brushend', function(){
  // on release we clear the brush region
  this.clear();
});
```

#### Creating the timeLine layout
```js
var graph = timeLine()
  .width(750)
  .height(150);
```

#### Adding the layer and drawing the graph
```js
// add the layer
graph.layer(brush);
// Draw the layer
d3.select('.timeline').call(graph.draw);
```
### Status

This library is under heavy development and subject to change.  
Evert new API breaking change we will be adding snapshots to the repository so you can always fetch a working copy.

For an in depth  explanation on the philosophy and usage of this library please refer to [this blog post](http://wave.ircam.fr/publications/visual-tools/).
## License
This module is released under the [BSD-3-Clause license](http://opensource.org/licenses/BSD-3-Clause).
## Acknowledgments
This code is part of the [WAVE project](http://wave.ircam.fr),  
funded by ANR (The French National Research Agency),  
_ContInt_ program,  
2012-2015.