/*
 * Notes : 
 * need to figure out if there is a way to continously check if
 * the alarms sets off.
 */

/**
 * Welcome to Pebble.js!
 * Test
 * This is where you write your app.
 */

// Calls in required stuff
var UI = require('ui');
var Vibe = require('ui/vibe');
var Settings = require('settings');
var date = new Date();

//var Vector2 = require('vector2');

// A for loop to make array of hours
var hours = [];
for (var i = 0; i < 24; i++) {
    hours.push(i + 1);
}

var alarms = Settings.data('alarms') || [];
var createAlarmItems = function(alarms) {
    var items = [];
    items.push({
        title: "Add New Alarm"
    });
    console.log("added new alarm");
    for (var i = 1; i < alarms.length + 1; i++) {
        items.push({
            title: alarms[i].time,
            subtitle: alarms[i].enabled
        });
        console.log(i);
    }
    console.log("Created item list");
    return items;
};

var detectTimeLoop = function() {

	for (var i = 1; i < alarms.length + 1; i++) {
		if ( alarms[i].hour == date.getHours() + 1 && alarms[i].minute == date.getMinutes() ) {
		
			// vibrates.. add 
			Vibe.vibrate('long');
		}
	}
	
	setTimeout(function() {
		detectTimeLoop();
	}, 1000);
};

detectTimeLoop();

<<<<<<< HEAD

/*
	Formats time from the 24-hour clock to 12-hour
*/

var formatTime = function( h, m ) {
	
	var hour = ( ( h % 12 != 0 ) ? ( h % 12 ): 12 )
	return hour + ":" + m + " " + ( ( h < 12 ) ? "AM" : "PM" )
=======
var formatTime = function() {
	var hour = ( ( date.getHours() % 12 != 0 ) ? date.getHours() % 12 : 12 )
	return date.getHours() + ":" + date.getMinutes() + " " + ( ( date.getHours() < 12 ) ? "AM" : "PM" )
>>>>>>> origin/master
}


// Sets up the alarms
var alarmItems = createAlarmItems(alarms);

/*
// Creates a loop to make an array of hours
var createHourItems = function() {
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

// The Splashscreen
var splashScreen = new UI.Card({
    title: 'Alarm',
    icon: 'images/menu_icon.png',
    subtitle: 'Welcome to Our App',
    body: 'This is the splash page'
    //banner (future plans)
});

// Makes a menu with New Alarms
var main = new UI.Menu({
    sections: [{
        items: alarmItems
        /*
            [{
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
        */
        //, createAlarmItems(alarms)
    }]
});

// Shows the spashscreen and goes to the menu after 400 ms
splashScreen.show();
setTimeout(function() {
    splashScreen.hide();
    main.show();
}, 400);

main.on('select', function(e) {
    // If it is on the "New Alarm Option"
    if (e.itemIndex === 0) {
        // Has a random card as a placeholder
        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();

        // When click the middle button it makes an alarm
        card.on('click', 'select', function() {
            Vibe.vibrate('long');
            alarms.push({
				time: formatTime( date.getHours(), date.getMinutes() ),
                hour: date.getHours() + 1,
                minute: date.getMinutes() + 2,
                enabled: true
            });
            //createAlarmItems(alarms);
            card.hide();
        });
    } else {
        // Otherwise the user selects an alarm
        // Creates the Menu for Alarm Options
        var alarmOptions = new UI.Menu({
            sections : [{
                items: [{
                    title: 'Disable'
                }, {
                    title: 'Edit'
                }, {
                    title: 'Delete'
                }]
            }]
        });
        alarmOptions.show();

        alarmOptions.on('select', function(e) {
            switch(e.itemIndex) {
                case 0:
                    // Disable or Enable the Alarm
                    if (e.item.enabled) {
                        e.item.enabled = false;
                    } else {
                        e.item.enabled = true;
                    }
                    break;
                case 1:
                    // Edit the time of the alarm
                    break;
                case 2:
                    // Deletes the alarm
                    alarms.splice(e.itemIndex, 1);
                    break;
                default:
                    console.log("error");
                    break;
            }
            // Update the alarms and gets rid of the option menu
            //createAlarmItems();
            //alarmOptions.hide();
            });
    }
    // Choose an option to chnage alarm
});


// Code from before, I don't currently remove it for reference
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
