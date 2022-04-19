let dbus = require('dbus-next');
const axios = require('axios').default;
require('dotenv').config();

console.log("starting js-notify-forwarder");
console.log("Pushover token: " + process.env['PUSHOVER_API_KEY']);

var bus;
var obj;
var monitor;
var skip = false;
var last_message = ""
var handler = true;

async function setup(){
  bus = dbus.sessionBus();

  obj = await bus.getProxyObject('org.freedesktop.DBus', '/org/freedesktop/DBus');
  monitor = obj.getInterface('org.freedesktop.DBus.Monitoring');
  monitor.BecomeMonitor([
        "type='method_call',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
      ], 0);
  if(handler){
    bus.on('message', parseAndSend);
    handler = false;
  }
}

function parseAndSend(msg){
  if( msg.member && msg.member == 'Notify' ) {
    var app = msg.body[0];
    var summary = msg.body[3];
    var body = msg.body[4];
    body = body ? body.replace(/\n/g, " ") : "";
    if(last_message != body){
      skip = false;
      sendPushoverMessage(app, summary, body);
    }
    last_message = body;
    console.log(summary);
  }
}

async function sendPushoverMessage(app, summary, body) {
  axios.post('https://api.pushover.net/1/messages.json', {
    token: process.env['PUSHOVER_API_KEY'],
    user: process.env['PUSHOVER_USER_KEY'],
    title: "(" + app +") "+ summary,
    message: body,
    html: 1
  })
  .then(function (response) {
    console.log("message sent");
  })
  .catch(function (error) {
    console.log("error sending pushover message");
    console.log(error);
  });
}

async function main(){
  if(!skip){
    console.log( "setup done... ", await setup());
    skip=true;
  }
}

//main();
setInterval(main, 100);
