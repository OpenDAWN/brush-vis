/* globals d3 */

"use strict";

var getSet = require('get-set');

var segDesc = {

  dname: { writable: true },
  xBaseDomain: { writable: true },
  xScale: { writable: true },
  yScale: { writable: true },
  base: { writable: true },
  g: { writable: true },
  dbrush: { writable: true },
 
  // handler width
  hdWidth: { writable: true },

  // "inherit" events,
  // on: { enumerable: true, writable: true},
  trigger: {writable: true},
  
  init: {
    value: function() {

      // getters(setters) to be added
      getSet(this)('name');
      
      // defaults
      this.dbrush = d3.svg.brush();

      return this;
    }
  },

  load: {
    enumerable: true, configurable: true, value: function(base){
      this.base = base; // bind the baseTimeLine
    }
  },

  bind: {
    value: function(g) {
      this.g = g;
      this.update();
    }
  },

  on: {
    enumerable: true, value: function(type, cb) {
      var that = this;
      switch(type){

        case 'brushstart':
          this.dbrush.on(type, cb);
          break;

        case 'brush':
          this.dbrush.on(type, function(evt) {
            that.base.brushing(true);
            cb.call(that, d3.event.target.extent());
          });
          break;

        case 'brushend':
          this.dbrush.on(type, function(evt) {
            that.base.brushing(false);
            cb.call(that, d3.event.target.extent());
          });
          break;

      }

      return this;
    }
  },

  update: {
    enumerable: true, value: function() {
      
      var that = this;
      var base = this.base;
      var brushEl = d3.select('.' + this.name());

      // var svg = base.svg;
      // var fullWidth = parseInt(svg.attr('width'), 10);
      // var fullHeigt = parseInt(svg.attr('height'), 10);

      var brush = this.dbrush;
      brush.x(base.xScale).y(base.yScale);

      brushEl.call(brush);
    }
  },

  clear: {
    enumerable: true, value: function(val){
      this.dbrush.clear();
      d3.select('.' + this.name()).call(this.dbrush);
    }
  }

};

module.exports = function createBaseTimeline(options){
  var segmenter = Object.create({}, segDesc);
  return segmenter.init();
};