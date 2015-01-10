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

alarmOptions.on('select', function(e) {
    switch(e.itemIndex) {
        case 1:
            // Disable or Enable the Alarm
            break;
        case 2:
            //Edit the time of the alarm
            break;
        case 3:
            // Deletes the alarm
            break;
        default:
            console.log("error");
            break;
    }
});
