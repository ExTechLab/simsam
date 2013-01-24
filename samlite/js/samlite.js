// variables 
var canvas, ctx;
var image;
var iMouseX, iMouseY = 1;
var theSelection;

// define Selection constructor
function Selection(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.px = x;
    this.py = y;
    
    this.csize = 6;
    this.csizeh = 10;

    this.bHow = [false, false, false, false];
    this.iCSize = [this.csize, this.csize, this.csize, this.csize];
    this.bDrag = [false, false, false, false];
    this.bDragAll = false;
}

function drawScene(){
    // code from http://www.script-tutorials.com/html5-image-crop-tool/
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    theSelection.draw();
}

function getResults() {
    // code from http://www.script-tutorials.com/html5-image-crop-tool/
    var temp_ctx, temp_canvas;
    temp_canvas = document.createElement('canvas');
    temp_ctx = temp_canvas.getContext('2d');
    temp_canvas.width = theSelection.w;
    temp_canvas.height = theSelection.h;
    temp_ctx.drawImage(image, theSelection.x, theSelection.y, theSelection.w, theSelection.h, 0, 0, theSelection.w, theSelection.h);
    var vData = temp_canvas.toDataURL();
    $('#crop_result').attr('src', vData);
    $('#results h2').text('Well done.');
    deleteRect();
}

function deleteRect(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    $('#canvas').unbind('mousemove');
}
    

// Generated by CoffeeScript 1.3.3
(function() {
  var cameraOff, cameraOn, cameraSwitch, capture, clearPlayback, frameBack, frameBeginning, frameEnd, frameForward, frameRegistry, makeUnselectable, overlayClass, pause, placeFrame, playbackClass, playbackFrames, playbackTimeouts, rescanThumbnails, saveCanvas, thumbnailScaleFactor, toggleCamera, trash, updateIndexView;

  Selection.prototype.draw = function(){
      // code from http://www.script-tutorials.com/html5-image-crop-tool/
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.w, this.h);

      if (this.w > 0 && this.h > 0) {
	  ctx.drawImage(image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
      }
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x - this.iCSize[0], this.y - this.iCSize[0], this.iCSize[0] * 2, this.iCSize[0] * 2);
      ctx.fillRect(this.x + this.w - this.iCSize[1], this.y - this.iCSize[1], this.iCSize[1] * 2, this.iCSize[1] * 2);
      ctx.fillRect(this.x + this.w - this.iCSize[2], this.y + this.h - this.iCSize[2], this.iCSize[2] * 2, this.iCSize[2] * 2);
      ctx.fillRect(this.x - this.iCSize[3], this.y + this.h - this.iCSize[3], this.iCSize[3] * 2, this.iCSize[3] * 2);
  }

  cropCanvas = function() { 
      // code from http://www.script-tutorials.com/html5-image-crop-tool/
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      image = new Image();
      image.onload = function() {
      }
      image.src = canvas.toDataURL();
      theSelection = new Selection(200, 200, 200, 200);
            
      $('#canvas').bind('mousemove', function(e) { // binding mouse move event
	  var canvasOffset = $(canvas).offset();
	  iMouseX = Math.floor(e.pageX - canvasOffset.left);
	  iMouseY = Math.floor(e.pageY - canvasOffset.top);

	  // in case of drag of whole selector
	  if (theSelection.bDragAll) {
	      theSelection.x = iMouseX - theSelection.px;
	      theSelection.y = iMouseY - theSelection.py;
	  }
	  for (i = 0; i < 4; i++) {
	      theSelection.bHow[i] = false;
	      theSelection.iCSize[i] = theSelection.csize;
          }
		
	  // hovering over resize cubes
	  if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh && iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {
	      theSelection.bHow[0] = true;
	      theSelection.iCSize[0] = theSelection.csizeh;
	  }
	  if (iMouseX > theSelection.x + theSelection.w - theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh && iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {
	      theSelection.bHow[1] = true;
	      theSelection.iCSize[1] = theSelection.csizeh;
	  }
	  if (iMouseX > theSelection.x + theSelection.w-theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh && iMouseY > theSelection.y + theSelection.h-theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {
	      theSelection.bHow[2] = true;
	      theSelection.iCSize[2] = theSelection.csizeh;
       	  }
	  if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh && iMouseY > theSelection.y + theSelection.h-theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {
	      theSelection.bHow[3] = true;
	      theSelection.iCSize[3] = theSelection.csizeh;
	  }

	  // in case of dragging resize cubes
	  var iFW, iFH;
	  if (theSelection.bDrag[0]) {
	      var iFX = iMouseX - theSelection.px;
	      var iFY = iMouseY - theSelection.py;
	      iFW = theSelection.w + theSelection.x - iFX;
	      iFH = theSelection.h + theSelection.y - iFY;
	  }
	  if (theSelection.bDrag[1]) {
	      var iFX = theSelection.x;
	      var iFY = iMouseY - theSelection.py;
	      iFW = iMouseX - theSelection.px - iFX;
	      iFH = theSelection.h + theSelection.y - iFY;
	  }
	  if (theSelection.bDrag[2]) {
	      var iFX = theSelection.x;
	      var iFY = theSelection.y;
	      iFW = iMouseX - theSelection.px - iFX;
	      iFH = iMouseY - theSelection.py - iFY;
	  }
	  if (theSelection.bDrag[3]) {
	      var iFX = iMouseX - theSelection.px;
	      var iFY = theSelection.y;
   	      iFW = theSelection.w + theSelection.x - iFX;
	      iFH = iMouseY - theSelection.py - iFY;
	  }

	  if (iFW > theSelection.csizeh * 2 && iFH > theSelection.csizeh * 2) {
	      theSelection.w = iFW;
	      theSelection.h = iFH;
		    
	      theSelection.x = iFX;
	      theSelection.y = iFY;
	  }
		
	  drawScene();
      });

      $('#canvas').mousedown(function(e) { // binding mousedown event
	  var canvasOffset = $(canvas).offset();
	  iMouseX = Math.floor(e.pageX - canvasOffset.left);
	  iMouseY = Math.floor(e.pageY - canvasOffset.top);
		
	  theSelection.px = iMouseX - theSelection.x;
	  theSelection.py = iMouseY - theSelection.y;

	  if (theSelection.bHow[0]){
	      theSelection.px = iMouseX - theSelection.x;
	      theSelection.py = iMouseY - theSelection.y;
	  }
	  if (theSelection.bHow[1]){
	      theSelection.px = iMouseX - theSelection.x - theSelection.w;
	      theSelection.py = iMouseY - theSelection.y;
	  }
	  if (theSelection.bHow[2]){
	      theSelection.px = iMouseX - theSelection.x - theSelection.w;
	      theSelection.py = iMouseY - theSelection.y - theSelection.h;
	  }
	   if (theSelection.bHow[3]){
	      theSelection.px = iMouseX - theSelection.x;
	      theSelection.py = iMouseY - theSelection.y - theSelection.h;
	  }

  	  if (iMouseX > theSelection.x + theSelection.csizeh && iMouseX < theSelection.x+theSelection.w - theSelection.csizeh && iMouseY > theSelection.y + theSelection.csizeh && iMouseY < theSelection.y+theSelection.h - theSelection.csizeh) {
	      theSelection.bDragAll = true;
	  }
		
	  for (i = 0; i < 4; i++) {
	      if (theSelection.bHow[i]) {
	  	  theSelection.bDrag[i] = true;
	      }
	  }
      });
	    
      $('#canvas').mouseup(function(e) { // binding mouseup event
  	  theSelection.bDragAll = false;
		
	  for (i = 0; i < 4; i++) {
	      theSelection.bDrag[i] = false;
	  }
	  theSelection.px = 0;
	  theSelection.py = 0;
      });
      drawScene();
  }


  thumbnailScaleFactor = 0.25;

  cameraSwitch = {};

  playbackFrames = [];

  frameRegistry = {};

  playbackTimeouts = [];

  overlayClass = "overlay-frame";

  playbackClass = "playback-frame";

  window.isPlaying = false;

  window.playbackIndex = 0;

  window.debug = false;

  $(document).ready(function() {
    var constraints, failure, success;
    window.camera = $("#camera").get(0);
    window.buttons = {
      shoot: $("#shoot_button").get(0),
      beginning: $("#beginning_button").get(0),
      frameBack: $("#frame_back_button").get(0),
      play: $("#play_button").get(0),
      pause: $("#pause_button").get(0),
      frameForward: $("#frame_forward_button").get(0),
      end: $("#end_button").get(0)
    };
    constraints = {
      audio: true,
      video: true
    };
    if (html5support.getUserMedia()) {
      success = function(stream) {
        camera.src = stream;
        return camera.play();
      };
      failure = function(error) {
        return alert(JSON.stringify(error));
      };
      navigator.getUserMedia(constraints, success, failure);
    } else {
      alert("Your browser does not support getUserMedia()");
    }
    $(buttons.shoot).click(shoot);
    $(buttons.play).click(play);
    $(buttons.pause).click(pause);
    $(buttons.frameBack).click(frameBack);
    $(buttons.frameForward).click(frameForward);
    $(buttons.beginning).click(frameBeginning);
    $(buttons.end).click(frameEnd);
    $(buttons.shoot).button();
    $("#output").sortable().bind('sortupdate', rescanThumbnails);
    $("#crop_output").sortable().bind('sortupdate', rescanThumbnails); //added this
    $("#trash").sortable({
      connectWith: "#output"
    }).bind('receive', trash);
    $("#fps_slider").slider({
      value: 10,
      min: 1,
      max: 50,
      step: 1,
      slide: function(event, ui) {
        return $("#fps").val(ui.value);
      }
    });
    cameraSwitch = $("#camera_onoff").iphoneStyle({
      onChange: toggleCamera
    });
    return makeUnselectable($(document.body).get(0));
  });

  makeUnselectable = function(node) {
    var child, _results;
    if (node.nodeType === 1) {
      node.setAttribute("unselectable", "on");
    }
    child = node.firstChild;
    _results = [];
    while (child) {
      makeUnselectable(child);
      _results.push(child = child.nextSibling);
    }
    return _results;
  };

  toggleCamera = function() {
    clearPlayback();
    if (cameraSwitch.is(':checked')) {
      if (window.debug) {
        console.log("toggle camera off");
      }
      return $(camera).css("display", "block");
    } else {
      if (window.debug) {
        console.log("toggle camera off");
      }
      return $(camera).css("display", "none");
    }
  };

  cameraOn = function() {
    if (window.debug) {
      console.log("camera on");
    }
    return cameraSwitch.prop("checked", true).iphoneStyle("refresh");
  };

  cameraOff = function() {
    if (window.debug) {
      console.log("camera off");
    }
    return cameraSwitch.prop("checked", false).iphoneStyle("refresh");
  };

  capture = function(video, scaleFactor) {
    var canvas, ctx, h, w;
    if (!scaleFactor) {
      scaleFactor = 1;
    }
    w = video.videoWidth * scaleFactor;
    h = video.videoHeight * scaleFactor;
    canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
  };

  window.shoot = function() {
    var frame, frameId, frameIndex, frameOrdinal, output, thumbnail, video;
    pause();
    clearPlayback();
    cameraOn();
    video = $("#camera").get(0);
    output = $("#output").get(0);
    frame = capture(video, 1);
    frameOrdinal = playbackFrames.push(frame);
    thumbnail = capture(video, thumbnailScaleFactor);
    frameId = frameIndex = frameOrdinal - 1;
    $(thumbnail).attr("data-frame-id", frameId);
    $(frame).attr("data-frame-id", frameId);
    frameRegistry[frameId] = frame;
    output.appendChild(thumbnail);
    $("#output").sortable("refresh");
    rescanThumbnails();
    placeFrame(frameIndex, overlayClass);
    return saveCanvas(frame, frameId);
  };

  saveCanvas = function(canvas, tempId) {
    var ajaxOptions, done, imageString, imageStringRaw;
    imageStringRaw = canvas.toDataURL("image/jpeg");
    imageString = imageStringRaw.replace("data:image/jpeg;base64,", "");
    ajaxOptions = {
      url: "save_frame",
      type: "POST",
      data: {
        image_string: imageString
      },
      dataType: "json"
    };
    done = function(response) {
      var frame;
      console.log("save canvas ajax response", response);
      if (response.success) {
        frame = frameRegistry[tempId];
        delete frameRegistry[tempId];
        frameRegistry[response.id] = frame;
        $(frame).attr("data-frame-id", response.id);
        return $("#output canvas[data-frame-id='" + tempId + "']").attr("data-frame-id", response.id);
      }
    };
    return $.ajax(ajaxOptions).done(done);
  };

  clearPlayback = function() {
    if (window.debug) {
      console.log("clearPlayback");
    }
    return $("#playback_container *").removeClass().remove();
  };

  placeFrame = function(frameIndex, className) {
    var frame;
    if (className == null) {
      className = "";
    }
    if (window.debug) {
      console.log("placeFrame");
    }
    clearPlayback();
    frame = playbackFrames[frameIndex];
    $(frame).addClass(className);
    frame.id = "canvas";
    return $("#playback_container").append(frame);
  };

  rescanThumbnails = function() {
    if (window.debug) {
      console.log("rescanThumbnails");
    }
    playbackFrames = [];
    $("#output *").each(function(index, thumbnail) {
      var frameId;
      frameId = $(thumbnail).attr("data-frame-id");
      playbackFrames.push(frameRegistry[frameId]);
      return $(thumbnail).unbind("click").click(function() {
        pause();
        clearPlayback();
        cameraOn();
        placeFrame(index, overlayClass);
        window.playbackIndex = index;
        return updateIndexView();
      });
    });
    return updateIndexView();
  };

  trash = function(event) {
    if (window.debug) {
      console.log("trash");
    }
    $("#trash canvas").remove();
    $("#trash .sortable-placeholder").remove();
    rescanThumbnails();
    if (window.playbackIndex >= playbackFrames.length) {
      return frameEnd();
    }
  };

  window.play = function() {
    var beginningIndex, container, frame, index, interval, _i, _len;
    if (window.debug) {
      console.log("play");
    }
    if (window.isPlaying) {
      if (window.debug) {
        console.log("already playing, doing nothing");
      }
      return;
    }
    if (window.debug) {
      console.log("getting ready to play. length:", playbackFrames.length, "playback index", window.playbackIndex);
    }
    if (playbackFrames.length === window.playbackIndex + 1) {
      if (window.debug) {
        console.log("resetting to zero");
      }
      window.playbackIndex = 0;
      updateIndexView();
    }
    window.isPlaying = true;
    cameraOff();
    container = $("#video_container");
    interval = 1 / $("#fps").val() * 1000;
    beginningIndex = window.playbackIndex;
    for (index = _i = 0, _len = playbackFrames.length; _i < _len; index = ++_i) {
      frame = playbackFrames[index];
      if (index >= window.playbackIndex) {
        (function(frame, index) {
          var callback, delay;
          callback = function() {
            if (window.debug) {
              console.log("playback callback, index:", index);
            }
            if (window.debug) {
              console.log("play loop, index:", index, "delay:", delay);
            }
            placeFrame(index, playbackClass);
	    if (playbackFrames.length === index + 1) {
              window.isPlaying = false;
            } else {
              window.playbackIndex = index + 1;
            }
            return updateIndexView();
          };
          delay = interval * (index - beginningIndex);
          playbackTimeouts[index] = setTimeout(callback, delay);
          if (window.debug) {
            return console.log("play loop, index:", index, "delay:", delay);
          }
        })(frame, index);
      }
    }
  
    if (playbackFrames.length === 0) {
      window.isPlaying = false;
      return $("#playback_container").append("<div class='frametext'>Empty</div>");
    }
  };

  pause = function() {
    var timeout, _i, _len, _results;
    if (!window.isPlaying) {
      return;
    }
    window.isPlaying = false;
    _results = [];
    for (_i = 0, _len = playbackTimeouts.length; _i < _len; _i++) {
      timeout = playbackTimeouts[_i];
      _results.push(clearTimeout(timeout));
    }
    return _results;
  };

  frameBack = function() {
    pause();
    if (window.playbackIndex === 0) {
      return;
    } else {
      window.playbackIndex -= 1;
    }
    placeFrame(window.playbackIndex, playbackClass);
    return updateIndexView();
  };

  frameForward = function() {
    var max;
    pause();
    max = playbackFrames.length - 1;
    if (window.playbackIndex === max) {
      return;
    } else {
      window.playbackIndex += 1;
    }
    placeFrame(window.playbackIndex, playbackClass);
    return updateIndexView();
  };

  frameBeginning = function() {
    pause();
    window.playbackIndex = 0;
    placeFrame(0, playbackClass);
    return updateIndexView();
  };

  frameEnd = function() {
    var max;
    pause();
    max = playbackFrames.length - 1;
    window.playbackIndex = max;
    placeFrame(max, playbackClass);
    return updateIndexView();
  };

  updateIndexView = function() {
    return $("#playback_index").get(0).value = window.playbackIndex;
  };

}).call(this);
