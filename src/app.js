/**
 * Welcome to Pebble.js!
 * Test
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');
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

var main = new UI.Menu({
   sections:[{
     items: createItems()
  }]
});

main.show();


/*
 * var main = new UI.Card({
 *   title: 'Pebble.js',
 *     icon: 'images/menu_icon.png',
 *       subtitle: 'Hello World!',
 *         body: 'Press any button.'
 *         });
 */

/*
var main = new UI.Menu({
    sections: [{
        items: [{
            title: 'Add New Alarm',
            subtitle: 'New Alarm'
        }, {
            title: 'Other Item',
            subtitle: 'Try'
        }]
    }]
});

main.section(1);

main.show();
*/

main.on('click', 'up', function(e) {
    var menu = new UI.Menu({
        sections: [{
            items: [{
                title: 'Pebble.js',
                icon: 'images/menu_icon.png',
                subtitle: 'Can do Menus'
            }, {
                title: 'Second Item',
                subtitle: 'Subtitle Text'
            }]
        }]
    });
    menu.on('select', function(e) {
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
    });
    menu.show();
});

main.on('click', 'select', function(e) {
    if (new Date() == new Date()) {
        Vibe.vibrate('long');
    }
    var wind = new UI.Window();
    var time = new UI.TimeText();
    var textfield = new UI.TimeText({
        position: new Vector2(0, 50),
        size: new Vector2(144, 30),
        font: 'gothic-24-bold',
        text: '%M:%S, %a',
        textAlign: 'center'
    });
    wind.add(textfield);
    wind.show();
});

main.on('click', 'down', function(e) {
    var card = new UI.Card();
    card.title('A Card');
    card.subtitle('Is a Window');
    card.body('The simplest window type in Pebble.js.');
    card.show();
});
