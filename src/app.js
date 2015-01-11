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
var Accel = require('ui/accel');
var date = new Date();

//var time = require('time.js');
//var Vector2 = require('vector2');

// initialize
Accel.init();

var hours = [];
for (var i = 0; i < 12; i++) {
    hours.push(i + 1);
}
var minutes = [];
for (var i = 0; i < 60; i++) {
    minutes.push(i + 1);
}

var createTimeItems = function(time) {
    var items = [];
    for (var i = 0; i < time.length; i++) {
        items.push({
            title : time[i]
        });
    }
    return items;
};

var alarms = Settings.data('alarms') || [];
var createAlarmItems = function(alarms) {
    var items = [];
    items.push({
        title: "Add New Alarm"
    });
    console.log("alarm length : " + alarms.length);
    if (alarms.length > 0) {
        for (var i = 0; i < alarms.length; i++) {
            items.push({
                title: alarms[i].time,
                subtitle: alarms[i].enabled ? "Enabled" : "Disabled"
            });
            console.log(i);
        }
    }
    console.log("created item list");
    Settings.data('alarms', alarms);
    console.log('saved item list');
    return items;
};


var detectTimeLoop = function() {
    date = new Date();
	for (var i = 0; i < alarms.length; i++) {
		//console.log("alarm " + alarms[i].hour + "h " + alarms[i].minute + "m");
		//console.log("actual " + date.getHours() + "h  " + date.getMinutes() + "m");
			
		// break if no longer valid alarm(s)
		if ( !alarms[i].hour || !alarms[i].minute ) { break; }
		
		if ( alarms[i].enabled && alarms[i].allowVib && alarms[i].hour == date.getHours() && alarms[i].minute == date.getMinutes() ) {
			
			Vibe.vibrate('long');
			console.log(i + ": I vibrated");
			
            if ( date.getSeconds() === 0 ) {
			
				var card = new UI.Card();
				card.title('Alarm');
				card.subtitle('Is going off!');
				card.body('Press \'select\' to turn it off.');
                main.hide();
				card.show();
				
				var index = i;
				var count = 0;
				
				
				/*
					Increments the count, disables alarm if 4 combinations detected
				*/
				
				var checkDisable = function() {
				
					count++;
					
					if ( count >= 4 ) {
                        console.log("alarm has stopped");
						alarms[index].allowVib = false;
						card.hide();
						main.show();
					}
                    console.log("count : " + count);
				}
				
				
				card.on('click', 'select', function(e) {
					checkDisable();
				});
				
				card.on('click', 'up', function(e) {
					checkDisable();
				});
				
				card.on('click', 'down', function(e) {
					checkDisable();
				});
				
				card.on('accelTap', function(e) {
					checkDisable();
                    console.log("tap tap");
				});
            }
		} else if ( alarms[i].hour !== date.getHours() && alarms[i].minute !== date.getMinutes() 
					|| ( alarms[i].hour === date.getHours() && alarms[i].minute !== date.getMinutes() )
					|| ( alarms[i].minute === date.getMinutes() && alarms[i].hour !== date.getHours() ) ) {
			// make sure to allow vibrations after alarm minute has passed..
			if ( !alarms[i].allowVib ) {
				alarms[i].allowVib = true;
			}
		}
    }
	
	setTimeout(function() {
		detectTimeLoop();
	}, 1000);
};

detectTimeLoop();

/*
	Formats time from the 24-hour clock to 12-hour
*/
var formatTime = function( h, m ) {
	var hour = ( h % 12 !== 0 ? h % 12 : 12 );
    var minute = m < 10 ? "0" + m : m;
	return hour + ":" + minute + " " + ( ( h < 12 ) ? "AM" : "PM" );
};


// Sets up the alarms
var alarmItems = createAlarmItems(alarms);

/*
// Creates a loop to make an array of hours
var createHourItems = function() {
  var items = [];
  for (var i = 0; i hideurs.length; i++) {
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
}, 800);

var createAlarm = function(dateItems, callback) {

	date = new Date();
	
    alarms.push({
        time: formatTime( dateItems.hour, dateItems.minute ),
        hour: dateItems.hour,
        minute: dateItems.minute,
        timeOfDay: dateItems.timeOfDay,
        enabled: true,
		allowVib: true
    });
    console.log("hour : " + date.getHours());
    console.log("minute : " + date.getMinutes());
    console.log("time : " + formatTime( date.getHours(), date.getMinutes() ));
    callback();
};

main.on('select', function(e) {
    console.log(e.sectionIndex);
    // If it is on the "New Alarm Option"
    if (e.itemIndex === 0) {
        // Has a random card as a placeholder
        /*
        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();
        */

        var hourItems = createTimeItems(hours);
        var minuteItems = createTimeItems(minutes);
        var timeHolder = {
            hour : null,
            minute : null,
            timeOfDay: null
        };
        var hourMenu = new UI.Menu({
            title: "Hour",
            sections: [{
                items: hourItems
            }]
        });
        var minuteMenu = new UI.Menu({
            title: "Minute",
            sections: [{
                items: minuteItems
            }]
        });
        var timeOfDayMenu = new UI.Menu({
            title: "Time Of Day",
            sections: [{
                items: [{
                    title: "AM"
                }, {
                    title: "PM"
                }]
            }]
        });

        hourMenu.show();
        console.log("loaded hourMenu");

        hourMenu.on('select', function(e) {
            console.log("i have been clicked : " + (e.itemIndex + 1));
            timeHolder.hour = e.itemIndex + 1;
            minuteMenu.show();
        });
        minuteMenu.on('select', function(f) {
            console.log("you have chosen : " + (f.itemIndex + 1) + " m");
            timeHolder.minute = f.itemIndex + 1;
            timeOfDayMenu.show();
        });
        timeOfDayMenu.on('select', function(g) {
            console.log("you have chosen : " + g.item.title);
            timeHolder.timeOfDay = g.item.title;
            console.log('Alarm set at : ' + formatTime(timeHolder.hour, timeHolder.minute) + " " + timeHolder.timeOfDay);
            createAlarm(timeHolder, function() {
                alarmItems = createAlarmItems(alarms);
                console.log('Items done');

                hourMenu.hide();
                minuteMenu.hide();
                timeOfDayMenu.hide();
                main.section(0, section = {
                    items: alarmItems
                });
            });
        });

        // When click the middle button it makes an alarm
        /*
        card.on('click', 'select', function() {
            createAlarm(function() {
                alarmItems = createAlarmItems(alarms);
                console.log('Items done');
                console.log(alarmItems);
                card.hide();
                main.section(0, section = {
                    items: alarmItems
                });
                console.log("success");
                //hourChange = new time.hourChange();
                //time.hourChange.show();
            });
        });
        */
    } else {
        // Otherwise the user selects an alarm
        // Creates the Menu for Alarm Options
        var alarmOptions = new UI.Menu({
            sections : [{
                items: [{
                    title: alarms[e.itemIndex - 1].enabled ? 'Disable' : 'Enable'
                }, {
                    title: 'Edit'
                }, {
                    title: 'Delete'
                }]
            }]
        });
        alarmOptions.show();

        alarmOptions.on('select', function(f) {
            switch(f.itemIndex) {
                case 0:
                    // Disable or Enable the Alarm
                    for (var i = 0; i < alarms.length; i++) {
                        console.log(i + " : " + alarms[i].enabled);
                        console.log(e.itemIndex - 1 + " : " + alarms[e.itemIndex - 1].enabled);
                    }
                    alarms[e.itemIndex - 1].enabled = !alarms[e.itemIndex - 1].enabled;
                    break;
                case 1:
                    // Edit the time of the alarm
                    break;
                case 2:
                    // Deletes the alarm
                    alarms.splice(e.itemIndex - 1, 1);
                    console.log("deleted at : " + e.itemIndex - 1);
                    break;
                default:
                    console.log("error");
                    break;
            }
            // Update the alarms and gets rid of the option menu
            alarmOptions.hide();
            alarmItems = createAlarmItems(alarms);
            main.section(0, section = {
                items: alarmItems
            });
            //console.log('updated alarms');
        });
    }
    // Choose an option to chnage alarm
});
