/**
 * Welcome to Pebble.js!
 * Test
 * This is where you write your app.
 */

// Calls in required stuff
var UI = require('ui');
var Vibe = require('ui/vibe');
//var Vector2 = require('vector2');

// A for loop to make array of hours
var hours = [];
for (var i = 0; i < 24; i++) {
    hours.push(i + 1);
}

// Creates a loop to make an array of hours
/*
var createItems = function() {
  var items = [];
  for (var i = 0; i < hours.length; i++) {
    items.push({
      title: hours[i]
    });
  }
  return items;
};
*/

/*
var main = new UI.Menu({
   sections:[{
     items: createItems()
  }]
});

main.show();
*/


/*
 * var main = new UI.Card({
 *   title: 'Pebble.js',
 *     icon: 'images/menu_icon.png',
 *       subtitle: 'Hello World!',
 *         body: 'Press any button.'
 *         });
 */

// Makes a menu with New Alarms
var main = new UI.Menu({
    sections: [{
        items: [{
            title: 'Add New Alarm',
            subtitle: 'New Alarm'
        }, {
            // Dr. Seuss
            title: 'One Alarm'
        }, {
            title: 'Two Alarm'
        }, {
            title: 'Red Alarm'
        }, {
            title: 'Blue Alarm'
        }]
    }]
});


main.show();

main.on('select', function(e) {
    if (e.itemIndex === 0) {
        Vibe.vibrate('long');
        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();
    }
});

/*
// Try but doesn't work
main.on('click', 'select', function(e) {
    var item = this.items(0);
    if (item.title == "Add New Alarm") {
        Vibe.vibrate('long');
        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();
    }
});
*/

/*
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
*/

// When click middle button
/*
main.on('click', 'up', function(e) {
    //test vibrqtion and date fubction
    console.log("foo");
    if (new Date() == new Date()) {
        Vibe.vibrate('long');
    }
    var wind = new UI.Window();
    //var time = new UI.TimeText();
    // Time in Text form
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
*/

/*
main.on('click', 'down', function(e) {
    var card = new UI.Card();
    card.title('A Card');
    card.subtitle('Is a Window');
    card.body('The simplest window type in Pebble.js.');
    card.show();
});
*/
