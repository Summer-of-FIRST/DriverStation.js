var events = require('events');

function States() {
  this.enabled = false;
  this.currentTab = "operation";

  this.triggerHook();
  this.tabSwitchHook();

  this.communications = false;
  this.robotCode = false;
  this.joysticks = false;
  this.ready = false;
  this.estop = false;

  this.event = new events.EventEmitter();
}

States.prototype.isEnabled = function() {
  return this.enabled;
};

States.prototype.currentTab = function() {
  return this.currentTab;
};

States.prototype.triggerHook = function() {
  var self = this;

  $("#trigger").click(function() {
    if (self.ready === false) {
      return;
    }
    if(!self.estop) { //E-Stop, RESTART ROBOT AND SOFTWARE!
      if (!self.enabled) {
        self.setEnabled();
      } else {
        self.setDisabled();
      }
    }
  });
};

States.prototype.setEnabled = function() {
  if(!this.estop) { //E-Stop, RESTART ROBOT AND SOFTWARE!
    $("#trigger").attr("enabled", "true");
    $("#trigger").text("Disable");
    this.event.emit("enable");
    this.enabled = true;
  }
};

States.prototype.setDisabled = function() {
  if(!this.estop) { //E-Stop, RESTART ROBOT AND SOFTWARE!
    $("#trigger").removeAttr("enabled");
    $("#trigger").text("Enable");
    this.event.emit("disable");
    this.enabled = false;
  }
};

States.prototype.setEStop = function() {
  $("#trigger").attr("enabled", "true");
  $("#trigger").text("E-STOP");
  this.event.emit("estop");
  this.estop = true;
};

States.prototype.tabSwitchHook = function() {
  var self = this;

  $("#tab_operation").click(function() {
    self.tabSwitch("operation");
  });
  $("#tab_diagnostics").click(function() {
    self.tabSwitch("diagnostics");
  });
  $("#tab_setup").click(function() {
    self.tabSwitch("setup");
  });
  $("#tab_io").click(function() {
    self.tabSwitch("io");
  });
  $("#tab_charts").click(function() {
    self.tabSwitch("charts");
  });
  $("#tab_about").click(function() {
    self.tabSwitch("about");
  });
};

States.prototype.tabSwitch = function(tab) {
  $("#" + this.currentTab).addClass("hidden");
  $("#tab_" + this.currentTab).removeAttr("selected");

  $("#" + tab).removeClass("hidden");
  $("#tab_" + tab).attr("selected", "true");
  this.currentTab = tab;
};

States.prototype.enableTrigger = function() {
  $('#trigger').attr("ready", true);
  this.ready = true;
};

States.prototype.disableTrigger = function() {
  $('#trigger').removeAttr("ready");
  this.ready = false;
  this.setDisabled();
};

States.prototype.enableCommunicationsLED = function() {
  $('#communications').attr("on", true);
  this.communications = true;
};

States.prototype.enableRobotCodeLED = function() {
  $('#robot-code').attr("on", true);
  this.robotCode = true;
};

States.prototype.enableJoysticksLED = function() {
  $('#joysticks').attr("on", true);
  this.joysticks = true;
};

States.prototype.disableCommunicationsLED = function() {
  $('#communications').removeAttr("on");
  this.communications = false;
};

States.prototype.disableRobotCodeLED = function() {
  $('#robot-code').removeAttr("on");
  this.robotCode = false;
};

States.prototype.disableJoysticksLED = function() {
  $('#joysticks').removeAttr("on");
  this.joysticks = false;
};
