var UI = require ('ui');
var Accel = require ('ui/accel');
var wind = new UI.Window();
var Vector2 = require('vector2');
Accel.init();
var x = 72;
var y =84 ;
var Size = 10;
//var accelX;
var ball = new UI.Rect({
  position: new Vector2(x,y),
  size: new Vector2(Size,Size),
  backgroundColor: 'black'
                         });
var background = new UI.Rect({
  size: new Vector2(144,168),
  backgroundColor: 'white',
  borderColor: 'white'
});
/*
Accel.on('data', function(e)
        {
          accelX =  e.accel.x;
          return accelX;
        });
console.log('accelX = ' + accelX);
var inc = 1;
if (accelX <= 0){
  if (x !== 0){
    x = x - inc;
  }
}
if (accelX > 0){
  if (x !== 144){
    x = x + inc;
  }
}*/

wind.add(ball);
wind.add(background);
wind.show();