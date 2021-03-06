/**
 * Welcome to Alarm48
 * 
 * The team :
 * Software Engineers : 
 * Joshua Pena
 * Tristan Iverson
 * 
 * Research :
 * Francisco Requena
 * Ceaser Bazua
 * 
 * Business :
 * Cody Li
 * Thomas Bryant
 */

// Calls in required stuff
var UI = require('ui');
var Vibe = require('ui/vibe');
var Settings = require('settings');
var Accel = require('ui/accel');
var date = new Date();

//var time = require('time.js');
var Vector2 = require('vector2');

// initialize
Accel.init();

/*
var hours = [];
for (var i = 0; i < 24; i++) {
    hours.push(i + 1);
}
var minutes = [];
for (var i = 0; i < 60; i++) {
    minutes.push(i);
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

var detectInGame = function() {

	for ( var i = 0; i < alarms.length; i++ ) {
	
		if ( !alarms[i].hour || !alarms[i].minute ) { break; }
		
		if ( alarms[i].inGame ) {
		
			return true;
		}
	}
	
	return false;
};

var checkEarlierAlarm = function( i ) {
    
    for (var j = 0; j < alarms.length; j++) {
        if (!alarms[j].hour || !alarms[j].minute) { break; }
        if (alarms[j].inGame && ((alarms[i].hour === alarms[j].hour && alarms[j].minute < alarms[i].minute) 
                                 || alarms[j].hour < alarms[i].hour) ) {
            return false;    
        }
    }
    
    return true;
}
var detectTimeLoop = function() {
    date = new Date();
    console.log('being called');
	for (var i = 0; i < alarms.length; i++) {
		//console.log("alarm " + alarms[i].hour + "h " + alarms[i].minute + "m");
		//console.log("actual " + date.getHours() + "h  " + date.getMinutes() + "m");
			
		// break if no longer valid alarm(s)
		if ( !alarms[i].hour || !alarms[i].minute ) { break; }
		
		if ( ( alarms[i].enabled && alarms[i].hour == date.getHours() && alarms[i].minute == date.getMinutes() ) ) {
			
            // this should stop alarms that go off after one is already inGame
            if (!checkEarlierAlarm( i )) {
                alarms[i].inGame = false;
                continue;
            }
            
            if (alarms[i].inGame) {
		    	Vibe.vibrate('long');
	    		//console.log(i + ": I vibrated");
            }
            // call only once
            if ( date.getSeconds() === 0 ) {
			
				alarms[i].inGame = true;
				
				var instructionsCard = new UI.Card();
				instructionsCard.title('Alarm');
				instructionsCard.subtitle('Is going off!');
				instructionsCard.body('Follow the instructions to turn it off.');
                main.hide();

                var commandCard = new UI.Card();
                commandCard.title('Do This');
                var action = {
                    value : Math.floor(Math.random() * 3)
                };
				var count = 0;
                switch(action.value) {
                    case 0:
                        commandCard.subtitle("Press the select button");
                        break;
                    case 1:
                        commandCard.subtitle("Press the up button");
                        break;
                    case 2:
                        commandCard.subtitle("Press the down button");
                        break;
                    case 3:
                        commandCard.subtitle("Shake the pebble");
                        break;
                    default:
                        commandCard.subtitle("error");
                        break;
                }
                commandCard.body((3 - count) + " more times");

                instructionsCard.show();
                setTimeout(function() {
                    instructionsCard.hide();
                    commandCard.show();
                }, 3000);

				var index = i;

                var checkDisable = function(response) {
                    console.log('responce : ' + response);
                    console.log('action : ' + action.value);
                    if (response === action.value) {
                        count++;
                    } else {
                        count = 0;
                    }
                    commandCard.title('Do This');
                    
                    action.value = Math.floor(Math.random() * 3);
                    switch(action.value) {
                        case 0:
                            commandCard.subtitle("Press the select button");
                            break;
                        case 1:
                            commandCard.subtitle("Press the up button");
                            break;
                        case 2:
                            commandCard.subtitle("Press the down button");
                            break;
                        case 3:
                            commandCard.subtitle("Shake the pebble");
                            break;
                        default:
                            commandCard.subtitle("error");
                            break;
                    }
                    commandCard.body((3 - count) + " more times");

                    console.log("old action : " + action.value);
                    console.log("new action : " + action.value);

                    if ( count >= 3 ) {
                        console.log("alarm has stopped");
                        alarms[index].inGame = false;
                        alarms[index].enabled = false;
                        console.log(index);
                        console.log(alarms[index]);
                        console.log(alarms[index].inGame);
                        commandCard.hide();
                        alarmItems = createAlarmItems(alarms);
                        main.section(0, section = {
                            items: alarmItems
                        });
                        main.show();
                    }
                    console.log("count : " + count);
                };
                
				commandCard.on('click', 'select', function(e) {
					checkDisable(0);
				});
				
				commandCard.on('click', 'up', function(e) {
					checkDisable(1);
				});
				
				commandCard.on('click', 'down', function(e) {
					checkDisable(2);
				});
				
				//commandCard.on('accelTap', function(e) {
				//	checkDisable(3);
                //    console.log("tap tap");
				//});
            }
            /*
		} else if ( alarms[i].hour !== date.getHours() && alarms[i].minute !== date.getMinutes() 
					|| ( alarms[i].hour === date.getHours() && alarms[i].minute !== date.getMinutes() )
					|| ( alarms[i].minute === date.getMinutes() && alarms[i].hour !== date.getHours() ) ) {
			// make sure to allow vibrations after alarm minute has passed..
			if ( !alarms[i].allowVib ) {
				alarms[i].allowVib = true;
			}
            */
		}
    }
	
	setTimeout(function() {
		detectTimeLoop();
	}, 1000);
};


detectTimeLoop();


/*
	Used in add/edit time
*/

var hours = [];
for (var i = 0; i < 24; i++) {
    hours.push(i + 1);
}
var minutes = [];
for (var i = 0; i < 60; i++) {
    minutes.push(i + 1);
}

/*
	Formats time from the 24-hour clock to 12-hour
*/
var formatTime = function( h, m ) {
	var hour = ( h % 12 !== 0 ? h % 12 : 12 );
    var minute = m < 10 ? "0" + m : m;
	return hour + ":" + minute + " " + ( ( h < 12 ) ? "AM" : "PM" );
};

var formatHour = function( h ) {
	return h % 12 != 0 ? h % 12 : 12;
};

var formatMinute = function( m ) {

	return m < 10 ? "0" + m : m;
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
    title: 'Alarm48',
    icon: 'images/menu_icon.png',
    subtitle: 'The Alarm Built in 48 Hours',
    body: 'UCSC Hack 2015'
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
}, 3000);

var createAlarm = function( timeStuff, callback ) {
    var success = true;
    for (var i = 0; i < alarms.length; i++) {
        if (alarms[i].hour == timeStuff[0] && alarms[i].minute == timeStuff[1]) {
            alarms[i].enabled = true;
            success = false;
        }
    }

    if (success) {
	var finalHour = timeStuff[0];
    alarms.push({
        time: formatTime( finalHour, timeStuff[1] ),
        hour: finalHour,
        minute: timeStuff[1],
        enabled: true,
		inGame: false
    });
    console.log("hour : " + date.getHours() + " minute : " + date.getMinutes());
    console.log("time : " + formatTime( date.getHours(), date.getMinutes() ));
    callback();
};

var updateAlarm = function(timeStuff, index, callback) {
    var finalHour = timeStuff[2] === "AM" ? timeStuff[0] : timeStuff[0] + 12;
    console.log("in updateAlarm, the index is : " + index);
    alarms[index] = {
        time : formatTime( finalHour, timeStuff[1] ),
        hour : finalHour,
        minute : timeStuff[1],
        enabled : true,
        inGame : false
    };
    }
  
    callback();
};

main.on('select', function(e) {
	console.log('setWindow');
	
    console.log(e.sectionIndex);
    // If it is on the "New Alarm Option"
    if (e.itemIndex === 0) {
        // Has a random card as a placeholder
        //var wind = new UI.Wind();
		
        var wind = new UI.Window({ backgroundColor: 'black'});
		var timeText = new UI.Text({
			text: formatTime( date.getHours(), date.getMinutes() ),
			font: 'gothic-28-bold',
			color: 'white',
            position: new Vector2(0, 0),
            size: new Vector2(144, 168),
			//backgroundColor: 'black',
			textAlign: 'center'
		});
		
        wind.show();
        console.log('window loaded');
        wind.add( timeText );
        console.log('added the text');
		
		// 
		var time = [ date.getHours(), date.getMinutes(), date.getHours() < 12 ? 'AM' : 'PM' ];
		var stage = 1;
		
		wind.on('click', 'select', function(e) {
		console.log('select clicked; stage complete');
			stage++;
			
			// done
			if ( stage > 3 ) {
				createAlarm(time,  function() {
					alarmItems = createAlarmItems(alarms);
					console.log('Items done');
					console.log(alarmItems);
					wind.hide();
                    main.section(0, section = {
						items: alarmItems
					});
					console.log("success");
				});
				main.show();
			}
		});
		
		wind.on('click', 'up', function(e) {
            console.log("up clicked");
            console.log( "stage: " + stage );
			if ( stage === 1 ) {
				
				time[0] = ( time[0] + 1 ) % 24;
			} else if ( stage === 2 ) {
				
				time[1] = ( time[1] + 1 ) % 60;
			} else {
			
				time[2] = ( time[2] === 'PM' ? 'AM' : 'PM' );
			}
			timeText.text( formatHour( time[0] ) + ":" + formatMinute( time[1] ) + " " + time[2] );
		});
		
		wind.on('click', 'down', function(e) {
            console.log('down clicked');
            console.log( "stage: " + stage );
			if ( stage === 1 ) {
				
                time[0] = ( time[0] - 1 ) % 24;
                if (time[0] < 0)
                    time[0] = 23;
			} else if ( stage === 2 ) {
                time[1] = ( time[1] - 1 ) % 60;
                if (time[1] < 0)
					time[1] = 59;
			} else {
			
				time[2] = ( time[2] === 'PM' ? 'AM' : 'PM' );
			}
            console.log(time[0]);
			timeText.text( formatHour( time[0] ) + ":" + formatMinute( time[1] ) + " " + time[2] );
		});
		
		
		/*
        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();*/
        //wind.show();

        // When click the middle button it makes an alarm
        /*card.on('click', 'select', function() {
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
        });*/
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
            var indexOfAlarm = e.itemIndex;
            console.log('index of alarm : ' + indexOfAlarm);
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
                    var initalTimeValues = {
                        hour : alarms[e.itemIndex - 1].hour,
                        minute : alarms[e.itemIndex - 1].minute
                    };
                    
                    // Edit the time of the alarm
                    var wind = new UI.Window({ backgroundColor: 'black'});
                    var timeText = new UI.Text({
                        text: formatTime( initalTimeValues.hour, initalTimeValues.minute ),
                        font: 'gothic-28-bold',
                        color: 'white',
                        position: new Vector2(0, 0),
                        size: new Vector2(144, 168),
                        //backgroundColor: 'black',
                        textAlign: 'center'
                    });
                    
                    wind.show();
                    console.log('window loaded');
                    wind.add( timeText );
                    console.log('added the text');
                    
                    var time = [ initalTimeValues.hour, initalTimeValues.minute, initalTimeValues.hour < 12 ? 'AM' : 'PM' ];
                    var stage = 1;
                    
                    wind.on('click', 'select', function(f) {
                        console.log('select clicked; stage complete');
                        stage++;
                        
                        // done
                        if ( stage > 3 ) {
                            console.log('calling updateAlarm\nindex : ' + (e.itemIndex - 1));
                            updateAlarm( time, e.itemIndex - 1,function() {
                                alarmItems = createAlarmItems(alarms);
                                console.log('Items done');
                                console.log(alarmItems);
                                wind.hide();
                                alarmOptions.hide();
                                main.section(0, section = {
                                    items: alarmItems
                                });
                                console.log("success");
                            });
                        }
                    });
                    
                    wind.on('click', 'up', function(e) {
                        console.log("up clicked");
                        console.log( "stage: " + stage );
                        if ( stage === 1 ) {
                            time[0] = ( time[0] + 1 ) % 24;
                        } else if ( stage === 2 ) {
                            time[1] = ( time[1] + 1 ) % 60;
                        } else {
                            time[2] = ( time[2] === 'PM' ? 'AM' : 'PM' );
                        }
                        
                        console.log(time[0]);
                        timeText.text( formatHour( time[0] ) + ":" + formatMinute( time[1] ) + " " + time[2] );
                    });
                    
                    wind.on('click', 'down', function(e) {
                        console.log('down clicked');
                        console.log( "stage: " + stage );
                        if ( stage === 1 ) {
                            time[0] = ( time[0] - 1 ) % 24;
                            if (time[0] < 0) {
                                time[0] = 23;
                            }
                        } else if ( stage === 2 ) {
                            time[1] = ( time[1] - 1 ) % 60;
                            if (time[1] < 0) {
                                time[1] = 59;
                            }
                        } else {
                            time[2] = ( time[2] === 'PM' ? 'AM' : 'PM' );
                        }
      
                        console.log(time[0]);
                        timeText.text( formatHour( time[0] ) + ":" + formatMinute( time[1] ) + " " + time[2] );
                    });
                    break;
                case 2:
                    // Deletes the alarm/ 
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
