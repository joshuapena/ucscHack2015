/**
 * Welcome to Pebble.js!
 * Test
 * This is where you write your app.
 */

var UI = require('ui');
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

var createItems = function() {
  var items = [];
  for (var i = 0; i < hours.length; i++) {
    items.push({
      title: hours[i]
    });
  }
  return items;
};

var menu = new UI.Menu({
   sections:[{
     items: createItems()
  }]
});

menu.show();