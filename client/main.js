import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



Meteor.startup(function(){
Push.Configure({
  android: {
    senderID: 448932643096,
    alert: true,
    badge: true,
    sound: true,
    vibrate: true,
    clearNotifications: true
    // icon: '',
    // iconColor: ''
  },
  ios: {
    alert: true,
    badge: true,
    sound: true
  }
});

// Internal events
Push.addListener('token', function(token) {
// Token is { apn: 'xxxx' } or { gcm: 'xxxx' }
alert(JSON.stringify(token));
// console.log(token);
});

Push.addListener('error', function(err) {
if (err.type == 'apn.cordova') {
console.log(err.error);
}
});

Push.addListener('register', function(evt) {
// Platform specific event - not really used
alert(JSON.stringify(evt));
});

Push.addListener('alert', function(notification) {
// Called when message got a message in forground
alert(JSON.stringify(notification));
// alert("Tu Orden esta lista");
});

Push.addListener('sound', function(notification) {
// Called when message got a sound
alert(JSON.stringify(notification));
});

Push.addListener('badge', function(notification) {
// Called when message got a badge
alert(JSON.stringify(notification));
});

Push.addListener('startup', function(notification) {
// Called when message recieved on startup (cold+warm)
alert(JSON.stringify(notification));
});


  Push.addListener('message', function(notification) {
    alert(notification.message, alertDismissed, notification.payload.title, "Ok");
  });



});



Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call('serverNotifications',"aaa","afdfdf");
  },
});
