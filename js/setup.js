var util = require("util");
var events = require("events");

function Setup() {
  events.EventEmitter.call(this);

  this.appendTeamID();
  this.hookTeamID();
  this.hookJoystickSetup();

  //Default teamID to blank
  if (!localStorage.teamID) {
    localStorage.teamID = "";
  }
}

util.inherits(Setup, events.EventEmitter);

/**
 * Add the last teamID back on startup
 */
Setup.prototype.appendTeamID = function() {
  if (localStorage.teamID) {
    $('#setup_teamID').val(localStorage.teamID);
  }
};

Setup.prototype.hookTeamID = function() {
  var self = this;

  $('#setup_teamID').keypress(function(e) {
    if (e.charCode < 48 | e.charCode > 57) {
      // We only want numbers
      e.preventDefault();
    }
    if ($('#setup_teamID').val().length == 4) {
      // Team numbers can't be greater than 4 digits
      e.preventDefault();
    }
    if (e.charCode == 13) {
      // Enter was pressed
      $('#setup_teamID').blur(); // remove focus
      self.setTeamID($('#setup_teamID').val());
    }
  });

  $('#setup_teamID').focusout(function() {
    self.setTeamID($('#setup_teamID').val());
  });
};

Setup.prototype.setTeamID = function(teamID) {
  if (localStorage.teamID === Number(teamID)) {
    return;
  }

  localStorage.teamID = teamID;
  this.emit('teamID_change', Number(teamID));
};

Setup.prototype.hookJoystickSetup = function() {
  var self = this;
  $('#joystick_setup_0').change(function(e) {
    console.log(e);
    if(e.currentTarget.value == "null") {
      var value = null;
    } else {
      var value = Number(e.currentTarget.value);
    }
    self.emit('joystick_change', Number(e.currentTarget.name), value);
  });

  $('#joystick_setup_1').change(function(e) {
    console.log(e);
    if(e.currentTarget.value == "null") {
      var value = null;
    } else {
      var value = Number(e.currentTarget.value);
    }
    self.emit('joystick_change', Number(e.currentTarget.name), value);
  });
  $('#joystick_setup_2').change(function(e) {
    console.log(e);
    if(e.currentTarget.value == "null") {
      var value = null;
    } else {
      var value = Number(e.currentTarget.value);
    }
    self.emit('joystick_change', Number(e.currentTarget.name), value);
  });
  $('#joystick_setup_3').change(function(e) {
    console.log(e);
    if(e.currentTarget.value == "null") {
      var value = null;
    } else {
      var value = Number(e.currentTarget.value);
    }
    self.emit('joystick_change', Number(e.currentTarget.name), value);
  });
};

Setup.prototype.generateJSSelect = function(data) {
  var html = ["","","",""];
  for(var i = 0; i < html.length; i++) {
    html[i]+= "<option  value=\"null\"></option>";
    for(var j = 0; j < data.length; j++) {
      html[i]+= "<option "+((data[j].joystickID == i)? "selected=\"selected\"" : "")+" value=\""+data[j].deviceID+"\" >"+data[j].description+"</option>"
    }
    $("#joystick_setup_"+i).html(html[i]);
  }
};