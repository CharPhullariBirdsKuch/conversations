import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { UserInfo }  from './../../import/collections/insert.js';





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

Session.setPersistent("userToken",token.gcm);
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

 Session.setPersistent("nammaval",1);
Tracker.autorun(function() {
   Session.setPersistent("check_onlyonce",0);
//Session.setPersistent("nammaval",1);

  if(Meteor.user()){
    if(Session.get("nammaval")==1){
    nammaa();
    Session.setPersistent("nammaval",0);
  }
   // alert("calling namma");
   }
});

function nammaa(){
// alert('nanananana');
var show12 = Meteor.user(); 
// alert(show12);
console.log(show12);
if(show12){

var source = Session.get("check_source");  
// alert(source);
check_login(source);
// alert("Ander" + show12);
console.log(show12);
// $('#login_with_facebook').click();
 
 }

}

Template.login.events({
  'submit #login-form': function(event){
  event.preventDefault();
  // alert('signup');
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password1').val();  
  
//  alert(name+' '+email+' '+phone+' '+password);
  var name = username.trim(); 
  var email = email.trim().toLowerCase(); 
  var password = password.trim();

if(password < 6)
{
  alert("Password should be of 6 digits at least");
  return false;
}
if(name > 20)
{
  alert('Cant enter more then 20 digits in Name');
  return false;
}

c =UserInfo.find({email: email}).count();
//alert(c);
if(c > 0){
  alert('email already exist!');
  return false; 
} 

  
   name =  name.charAt(0).toUpperCase()+ name.slice(1);
var userID = 'user_'+Math.floor((Math.random() * 2465789) + 1);
  //  UserInfo.insert({
  //   user_id:userID,
  //   name: name,
  //   email: email,
  //   email_status: 0,
  //   password: password,
  //   createdAt: new Date() 
  // });
   //new
      Meteor.call('save_user',userID,name,password,email,function(error,result){
              if(error){
                alert("Some error occure.");
              
              }else{
                Session.setPersistent("userId",userID);

                  // Session.set("Cropped","");
                  // Session.setPersistent("imageUploaded","");
                  // Session.setPersistent("imagePath","");
                  Session.setPersistent("userEmail",email);
                  Router.go('/email');
          
                 
              }
          });
   //new
// Session.setPersistent("userId",userID);

// Session.setPersistent("userEmail",email);
// Router.go('/email');
  }
});

Template.toplog.events({
  'click #login_submit':function(event){
      // alert('inside login');
      event.preventDefault();
      var login_email = $('#login_email').val();         
      var login_password = $('#login_password').val();         

       if(login_email == null || login_email == "")
        {
          $('#login_email').addClass('emptyfield').focus();
          return false; 
        }
        else{
          $('#login_email').removeClass('emptyfield');
        }

         if(login_password == null || login_password == "")
        {
          $('#login_password').addClass('emptyfield').focus();
          return false; 
        }
        else{
          $('#login_password').removeClass('emptyfield');
        }
     // alert('hide');
      // db.user_info.find({email: login_email, password: login_password});      
      var count = UserInfo.find({email: login_email, password: login_password}).fetch();      
      // var count2 = UserInfo.find({email: login_email, password: login_password}).count();\
      var length = count.length;      
      if(length == 1){
          var userId = count[0].user_id;
         // alert('session set to '+userId);
          Session.setPersistent("userId",userId);
          Session.set("coming_from_login","true");
          $('.form_reset').trigger('reset');
         var login_status = 1;
         var userId = Session.get("userId");
         Meteor.call("update_login_status",login_status,userId,function(error,result){
              if(error){
                //alert('user login status updation error');
                console.log('error');
              }
              else{
                //alert('user is now online');
                 console.log('result');
              }

            });


        var users =UserInfo.find({"user_id":userId}).fetch();
          console.log(users);

           if(users[0]){
              if(users[0].email_status==0){
                Router.go('/email');
              }else if(!users[0].location){
                alert("location empty");
                   Session.set("emptyField","location");
              }else if(!users[0].phone){
                alert("phone empty");
                   Session.set("emptyField","phone"); 
              }else if(!users[0].disablities){
                alert("speech empty");
                      Session.set("emptyField","speech");
              }else if(!users[0].profile_pic){
                    alert("profile pic empty");
                       Session.set("emptyField","profile_pic");                       
              }else if(!users[0].headline){
                   Session.set("emptyField","headline");
              }
            Router.go('/signup');
          }
      }else{
        alert('Wrong email or Password');
        // $('#login_email').addClass('emptyfield').focus();
        return false;
      }
}
});


Template.log.events({
    'click #login_with_googleplus': function(e) {
        e.preventDefault();
        Meteor.loginWithGoogle();
        // Meteor.loginWithFacebook();
    },
    'click #login_with_linkdin': function(e) {
        e.preventDefault();
      // Meteor.loginWithLinkedin();
        // Meteor.loginWithFacebook();
         Meteor.loginWithLinkedIn({
          requestPermissions: ['r_basicprofile','r_emailaddress']
          }, function(err){
            if(err){
              console.log('error with login is: ', err);
            }
        });
    
    },

   'click #login_with_facebook': function(e) {
        e.preventDefault();
        // Meteor.loginWithGoogle();
        Meteor.loginWithFacebook();
        document.getElementById("login_with_fb2").click();
    },
});

Template.log.events({
'click #login_with_googleplus': function(){

// $('#login_with_googleplus').click();
var show12 = Meteor.user(); 

var source = 'Google'; 
// alert(source);
Session.setPersistent("check_source",source); 

if(show12){  
check_login(source);
 }
 // else{
 //   $('#login_with_googleplus').click();
 // }
    },    
})
Template.log.events({
'click #login_with_linkdin': function(){

// $('#login_with_googleplus').click();
var show12 = Meteor.user(); 

var source = 'Linkedin'; 
// alert(source);
Session.setPersistent("check_source",source); 

if(show12){  
check_login(source);
 }
 // else{
 //   $('#login_with_googleplus').click();
 // }
    },    
})

Template.log.events({
'click #login_with_fb2': function(){
  // $('#login_with_facebook').click();
  // alert('fb');
var show12 = Meteor.user(); 
// alert(show12);
console.log(show12);
var source = 'Facebook';
// alert(source);
Session.setPersistent("check_source",source); 
if(show12){
 
check_login(source);
// alert("Ander" + show12);
console.log(show12);
// $('#login_with_facebook').click();
 }

 //  else{
 //   // document.('#login_with_facebook').click();
 //   document.getElementById("login_with_facebook").click();
 // }
    },    
});


function check_login(source){

        // Session.clear("check_source");
       
        var source = source;
        var show12 = Meteor.user();
      if(show12){  
        if(source=="Google"){
      var name  = show12.services.google.name;
      var email = show12.services.google.email;
      var picture = show12.services.google.picture;      
      var check_existance = UserInfo.find({email: email}).count();     
        }else if(source == "Facebook"){
           var name  = show12.services.facebook.name;
      var email = show12.services.facebook.email; 
      //var email = show12.services.facebook.picture;      
      var check_existance = UserInfo.find({email: email}).count();
       var picture = "http://graph.facebook.com/" + show12.services.facebook.id + "/picture/?type=large";
        //alert(picture);return false;
      //var picture = show12.services.google.picture;  
        }else{
         
         var name  = show12.services.linkedin.firstName+' '+show12.services.linkedin.lastName;
      var email = show12.services.linkedin.emailAddress;      
      var check_existance = UserInfo.find({email: email}).count();  
      if(check_existance>0)
      {
        Session.setPersistent("nammaval",1);
      }
      var picture = show12.services.linkedin.pictureUrl; 
           //alert(email);
        }
           }
     // console.log(show12);return false;
       // alert(show12);      
      if(check_existance == 0){
         var userID = 'user_'+Math.floor((Math.random() * 2465789) + 1);  
         Session.setPersistent("userId",userID);
 
      Meteor.call("create_user",userID,source,name,email,picture,function(error,result){
        if(error){
          alert('failure');
        }
        else{
          if(Meteor.isCordova()){
            Meteor.call("update_user_token",Session.get("userToken"),userID,function(error,result){
              if(error){
                alert("Token not updated");
              }else{
                alert("Token updated");
              }
            });
          }
          //alert('succesfully gmail login');
            Session.setPersistent("userEmail",email);
         Router.go('/signup');
        }
      });    
      }
      else{
        // return false;
        var existing_user = UserInfo.find({email: email}).fetch();
        var userID = existing_user[0].user_id;
        console.log(existing_user);
        //alert(userID);

        if(userID){
        Session.setPersistent("userId",userID);
        //alert("ye doosra hai");
        Router.go('/signup');
        }
        else{
          return false;
        }
      }
}


/*

function showPopup(url, callback, dimensions) {
    // default dimensions that worked well for facebook and google
    var popup = openCenteredPopup(
        url,
        (dimensions && dimensions.width) || 650,
        (dimensions && dimensions.height) || 331
    );

    var checkPopupOpen = setInterval(function() {
        try {
            var popupClosed = popup.closed || popup.closed === undefined;
        } catch (e) {
            return;
        }

        if (popupClosed) {
            var url = popup.document.URL;
            if(url.toLowerCase().indexOf('code') !== -1){
                var array1 = url.split('code=');
                var array2 =array1[1].split('&');
                Session.set('authCode',array2[0]);
                clearInterval(checkPopupOpen);
                callback();
            }
            else{
                clearInterval(checkPopupOpen);
            }
        }
    }, 50);
}

function openCenteredPopup(url, width, height) {
    var screenX = typeof window.screenX !== 'undefined'
        ? window.screenX : window.screenLeft;
    var screenY = typeof window.screenY !== 'undefined'
        ? window.screenY : window.screenTop;
    var outerWidth = typeof window.outerWidth !== 'undefined'
        ? window.outerWidth : document.body.clientWidth;
    var outerHeight = typeof window.outerHeight !== 'undefined'
        ? window.outerHeight : (document.body.clientHeight - 22);
    var left = screenX + (outerWidth - width) / 2;
    var top = screenY + (outerHeight - height) / 2;
    var features = ('width=' + width + ',height=' + height +
    ',left=' + left + ',top=' + top + ',scrollbars=yes');

    var newwindow = window.open(url, 'Login', features);
    if (newwindow.focus)
        newwindow.focus();
    return newwindow;
}



function fetch(method, resource, body = '') {
   var authToken = Session.get("authCode");
  alert("Calling get" + authToken);
  
  var params = [];
params["oauth2_access_token"] =  authToken;
params["format"] = "json";
  
  // Need to use HTTPS
  var url = 'https://api.linkedin.com' + resource + '?' + http_build_query(params);
  // Tell streams to make a (GET, POST, PUT, or DELETE) request
  var method = [];
   method['method']=method;

   var httpContext= [];
    httpContext["http"]=method;
  var context = stream_context_create(httpContext);
  // Hocus Pocus
  response = file_get_contents(url, false, context);
  // Native PHP object, please
  alert(response)
  return json_decode($response);
}
*/



    /*e.preventDefault();
        // Meteor.loginWithGoogle();
        Meteor.loginWithLinkedin();
*/
/*Session.set('authCode',null);
Session.set('profile',null);


   // var redirect_uri = encodeURIComponent(Meteor.absoluteUrl('userAuthComplete'));
   var redirect_uri = "http://localhost:3000/_oauth/linkedin?close";
        var client_id='78eqh4qk0yx7y7';
        var state = 'AAAAAA';
        var scope = ['r_basicprofile','r_emailaddress'];
        var url = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+client_id+"&redirect_uri="+redirect_uri+"&state="+state+"&scope="+scope;

        showPopup(url,function(err){
            if(err){
                console.log("Cancelled "+err);
            }
            else{
              var authCode= Session.get('authCode');
              alert(authCode);
                Meteor.call('getAccessToken',Session.get('authCode'),function(err,res){
                    if(res){
                        console.log(res);
                        Session.set('profile',res);
                        // $user = fetch('GET', '/v1/people/~:(firstName,lastName)');
                        alert(res);
                    }
                });
                Session.set('authCode',null);
            }
        });*/

