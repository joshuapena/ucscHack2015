var UI = require('ui');

var hours = [];
for (var i = 0; i < 24; i++) {
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

ar hourItems = createTimeItems(hours);
var minutesItems = createTimeItems(minutes);

var minutesChange = new UI.Menu({
    section : [{
        items : minutesItems
    }]

    minuteChange.on('select', function(e) {
        minuteChange.hide();
    });
});

var hourChange = new UI.Menu({
    section : [{
        items : hourItems
    }];

    hourChange.on('select', function(e) {
        hourChange.hide();
        minuteChange.show();
    });
});
