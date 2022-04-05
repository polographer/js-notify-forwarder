var dbus = require('dbus-next')
const bus = dbus.sessionBus();

bus.getProxyObject('org.freedesktop.DBus', '/org/freedesktop/DBus').then((obj) => {
  let monitor = obj.getInterface('org.freedesktop.DBus.Monitoring');

  monitor.BecomeMonitor([
    "type='signal',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
    "type='method_call',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
    "type='method_return',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
    "type='error',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'"
  ], 0);


  bus.on('message', (msg) => {
    console.log(msg);
  });

});