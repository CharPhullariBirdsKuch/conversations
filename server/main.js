import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup


  
  Push.debug = true;
  Push.Configure({
  gcm: {
    apiKey: 'AIzaSyAFAr37deN7Z9LuRPiWF2W09zve8v3JMDU',
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});

});


Meteor.methods({
	'serverNotifications':function(title, text) {
		    Push.send({
		      title,
		      text,
		      from: 'server',
		      badge: 1,
		      query: {}
		    });
		}
	});