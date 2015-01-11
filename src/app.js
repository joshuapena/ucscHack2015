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

/*
var hours = [];
for (var i = 0; i < 24; i++) {
    hours.push(i + 1);
}
var minutes = [];
for (var i = 0; i < 60; i++) {
    minutes.push(i + 1);
}
*/

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
                subtitle: alarms[i].enabled
            });
            console.log(i);
        }
    }
    console.log("Created item list");
    return items;
};

/*
var createTimeItems = function(time) {
    var items = [];
    for (var i = 0; i < time.length; i++) {
        items.push({
            title : time[i]
        });
    }
    return items;
};
*/

var detectTimeLoop = function() {
    date = new Date();
	for (var i = 0; i < alarms.length; i++) {
        console.log(alarms[i].allowVib);
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
				
				card.on('click', 'select', function() {
					console.log('Alarm');
                    console.log(alarms);
                    console.log(index);
                    console.log(alarms[index]);
					alarms[index].allowVib = false;
					card.hide();
                    main.show();
				});
				
				card.on('accelTap', function(e) {
					console.log('Alarm');
					alarms[index].allowVib = false;
					card.hide();				
				});
			}
		} else {
			// else if not going off, make sure to allow vib for next time!
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

var createAlarm = function(callback) {

	date = new Date();
	
    alarms.push({
        time: formatTime( date.getHours(), date.getMinutes() + 1 ),
        hour: date.getHours(),
        minute: date.getMinutes() + 1,
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
        //var wind = new UI.Wind();

        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();
        //wind.show();

        // When click the middle button it makes an alarm
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
                    e.item.enabled = !e.item.enabled;
                    break;
                case 1:
                    // Edit the time of the alarm
                    break;
                case 2:
                    // Deletes the alarm
                    alarms.splice(e.itemIndex - 2, 1);
                    console.log("deleted at : " + e.itemIndex - 2);
                    break;
                default:
                    console.log("error");
                    break;
            }
            // Update the alarms and gets rid of the option menu
            console.log('before : ' + alarmItems);
            alarmItems = createAlarmItems(alarms);
            alarmOptions.hide();
            main.section(0, section = {
                items: alarmItems
            });
            //console.log('updated alarms');
            console.log('after : ' + alarmItems);
        });
    }
    // Choose an option to chnage alarm
});

