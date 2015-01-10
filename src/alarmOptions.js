var alarmOptions = new UI.Menu({
    sections: [{
        items: [{
            title: 'Disable'
        }, {
            title: 'Edit'
        }, {
            title: 'Delete'
        }]
    }]
});

/*
var alarmOptions = function(e.) {
    this = new UI.Menu({
        sections: [{
            items: [{
                title: 'Disable'
            }, {
                title: 'Edit'
            }, {
                title: 'Delete'
            }]
        }]
    });
};
*/

alarmOptions.on('select', function(e) {
    switch(e.itemIndex) {
        case 0:
            // Disable or Enable the Alarm
            break;
        case 1:
            //Edit the time of the alarm
            break;
        case 2:
            // Deletes the alarm
            break;
        default:
            console.log("error");
            break;
    }
    // Update the alarms for
});
