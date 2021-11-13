/* 	PLAYER PARAMS

audioContext - AudioContext
** target - a node to connect to, for example audioContext.destination
** preset - variable with the instrument preset
** when - when to play, audioContext.currentTime or 0 to play now, audioContext.currentTime + 3 to play after 3 seconds
** pitch - note pitch from 0 to 127, for example 2+12*4 to play D of fourth octave (use MIDI key for drums)
** duration - note duration in seconds, for example 4 to play 4 seconds
** volume - 0.0 <=1.0 volume (0 is 'no value', 'no value' is 1)
** slides - array of pitch bends 
*/

	  /*  CHORDS
    
    (0+12*4) C
	  (1+12*4) C#
	  (2+12*4) D
	  (3+12*4) D#
	  (4+12*4) E
	  (5+12*4) F
	  (6+12*4) F#
	  (7+12*4) G
	  (8+12*4) G#
	  (9+12*4) A
	  (10+12*4) A#
	  (11+12*4) B */

var mouseDown = 0;
var stop1 = 0;
var stop2 = 0;
var stop3 = 0;
var stop4 = 0;


function myMoveFunction(){
  document.onmousedown = function() { 
    mouseDown = 1;
  }
  document.onmouseup = function() {
      mouseDown = 0;
  }
}

var selectedPreset = _tone_0240_SoundBlasterOld_sf2;
			var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
			var audioContext = new AudioContextFunc();
			var player = new WebAudioFontPlayer();
			
			var C = 0+12*5;
      var C_ = 1+12*5;
      var E = 4+12*5;
      var G = 7+12*5;
      var A = 9+12*5;
      var A_ = 10+12*5;
      var F = 5+12*5;
      var F_ = 6+12*5;
      var B = 11+12*5;
      var G_ = 8+12*5;
      var D = 2+12*5;
      var D_ = 3+12*5;
      var notes = [A, E, C, G];

      // CHORDS 
      function changeFingerPosition(arr){
        $('#finger-p-1').css('left', arr[0]);
        $('#finger-p-2').css('left', arr[1]);
        $('#finger-p-3').css('left', arr[2]);
        $('#finger-p-4').css('left', arr[3]);
      }

      $('.change-chord').on('change', function(){
        var selected_chord = $(this).attr('id');
        switch(selected_chord) {
          case 'Am': notes = [A, E, C, A]; changeFingerPosition([178, 178, 178, 222]); break;
          case 'A': notes = [A, E, C_, A]; changeFingerPosition([178, 178, 195, 222]); break;  
          case 'Dm': notes = [A, F, D, A]; changeFingerPosition([178, 195, 195, 221]); break;
          case 'D': notes = [A, F_, D, A]; changeFingerPosition([178, 221, 221, 221]); break;  
          case 'E': notes = [B, E, E, G_]; changeFingerPosition([221, 268, 268, 197]); break;
          case 'Em': notes = [B, G, E, G]; changeFingerPosition([221, 245, 268, 178]); break;  
          case 'G': notes = [B, G, D, G]; changeFingerPosition([221, 245, 222, 178]); break;
          case 'Gm': notes = [A_, G, D, G]; changeFingerPosition([196, 245, 222, 178]); break;
          case 'C': notes = [C, E, C, G]; changeFingerPosition([245, 178, 178, 178]); break; 
          case 'Cm': notes = [C, G, D_, G]; changeFingerPosition([245, 245, 245, 178]); break;
          case 'B': notes = [B, F_, D_, B]; changeFingerPosition([222, 222, 245, 268]); break;
          case 'Bm': notes = [B, F_, D, B]; changeFingerPosition([222, 222, 222, 268]); break;
          case 'F': notes = [A, F, C, A]; changeFingerPosition([178, 195, 178, 222]); break;
          case 'Fm': notes = [C, F, C, G_]; changeFingerPosition([245, 195, 178, 195]); break;
          default: notes = [A, E, C, G]; changeFingerPosition([178, 178, 178, 178]); break;
        }
     });

$('#play-chord').on('click', function(){
  playChord(notes);
});
$('#stop-chord').on('click', function(){
  stopChord(notes);
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: stopChord(notes);
        break;

        case 38: playUp(notes);
        break;

        case 39: stopChord(notes);
        break;

        case 40: playDown(notes)
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

	player.loader.decodeAfterLoading(audioContext, '_tone_0240_SoundBlasterOld_sf2');

function playnote(note) {
	//player.cancelQueue(audioContext);
 var cc =	player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, audioContext.currentTime + 0, note, 0.6, 0.5);
}

function playUp(chord){
	player.cancelQueue(audioContext);
  player.queueStrumUp(audioContext, audioContext.destination, selectedPreset, 0, chord, 1.5);
}

function playDown(chord){
	player.cancelQueue(audioContext);
	player.queueStrumDown(audioContext, audioContext.destination, selectedPreset, 0, chord, 1.5);
}

function playChord(chord){
	player.cancelQueue(audioContext);
  player.queueChord(audioContext, audioContext.destination, selectedPreset, 0, chord, 1.5);
}

function stopChord(chord){
  player.cancelQueue(audioContext);
  player.queueSnap(audioContext, audioContext.destination, selectedPreset, 0, chord, 1.5);
}

// 
// CANVAS START
// 

function String(id, startPoint, endPoint) {
	//ctor
	this.canvas = document.getElementById(id);
	this.ctx = this.canvas.getContext('2d');
    
    // console.dir(this.canvas);
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

	this.startPoint = startPoint;
	this.endPoint = endPoint;
	this.controlPoint = new Point(0,0);
	this.lastMouseX = this.controlPoint.x;
  this.lastMouseY = this.controlPoint.y;
  this.count = 0;
  this.damping = 0.95;

	this.finishWave = false;
	//add event listener
	var self = this;
  

  
	//this.canvas.addEventListener('mousemove',  function(pos) { 
	this.canvas.addEventListener('mousemove',  function(pos) { 
      

    if (mouseDown == 1) {
      self.mouseMove(self, pos);
      
      
      //SOUND SCRIPT HERE
      var stringid = self.canvas.id;
      
      // FIRST STRING
      
      if(stringid == 'string-1'){
        var note = notes[0];
        if(stop1 == 0){
          stop1 = 1;
          playnote(notes[0]);
          setTimeout(function(){
          stop1 = 0;
        },400);
        }
      }
      
      // SECOND STRING
      
      if(stringid == 'string-2'){
        var note = notes[1];
        if(stop2 == 0){
          stop2 = 1;
          playnote(notes[1]);
          setTimeout(function(){
          stop2 = 0;
        },400);
        }
      }
      
      if(stringid == 'string-3'){
        var note = notes[2];
        if(stop3 == 0){
          stop3 = 1;
          playnote(notes[2]);
          setTimeout(function(){
          stop3 = 0;
        },400);
        }
      }
      
      if(stringid == 'string-4'){
        var note = notes[3];
        if(stop4 == 0){
          stop4 = 1;
          playnote(notes[3]);
          setTimeout(function(){
          stop4 = 0;
        },400);
        }
      }
      
    }
		
	}, false);
}

String.prototype.drawArc = function(startPoint, thirdPoint, endPoint, ctx){
    var ctx = ctx;
    ctx.lineWidth=1.5;
    ctx.strokeStyle = '#fff';
    var dy1 = thirdPoint.y - startPoint.y;
    var dx1 = thirdPoint.x - startPoint.x;
    var dy2 = endPoint.y - thirdPoint.y;
    var dx2 = endPoint.x - thirdPoint.x;

    var aSlope = dy1/dx1;
    var bSlope = dy2/dx2;  


    var centerX = (aSlope*bSlope*(startPoint.y - endPoint.y) + bSlope*(startPoint.x + thirdPoint.x)
        - aSlope*(thirdPoint.x+endPoint.x) )/( 2* (bSlope-aSlope) );
    var centerY = -1*(centerX - (startPoint.x+thirdPoint.x)/2)/aSlope +  (startPoint.y+thirdPoint.y)/2;
    
    var r = dist(centerX, centerY, startPoint.x, startPoint.y)

    var angle = Math.atan2(centerX-startPoint.x, centerY-startPoint.y);

    // console.log(angle);
    if (!angle || this.finishWave){
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
      
    } else if (!this.finishWave){
    	if( angle > Math.PI/2) {
	        ctx.beginPath();
	        ctx.arc(centerX, centerY, r, Math.PI * 1.5-angle, Math.PI * 1.5 + angle, true);
  
	    } else {
	        ctx.beginPath();
	        ctx.arc(centerX, centerY, r, Math.PI * 1.5-angle, Math.PI * 1.5 + angle, false);
       
	    }
      
    }

    ctx.stroke();

}
String.prototype.draw = function(){
	
	// draw stuff
    var r = circleCenter(	new Point(this.startPoint.x, this.startPoint.y), 
    						new Point(this.controlPoint.x, this.controlPoint.y), 
    						new Point(this.endPoint.x, this.endPoint.y) ).r;

    if( r > 7000 
    	&& this.controlPoint.x > this.startPoint.x
    	&& this.controlPoint.x < this.endPoint.x ){
        // console.log(r);
        this.drawArc(this.startPoint, this.controlPoint, this.endPoint, this.ctx);
        this.lastMouseX = this.controlPoint.x;
        this.lastMouseY = this.controlPoint.y;
        this.count = 0;
    	this.finishWave = false;
      
    } else {
    	var x = this.lastMouseX;
    	var y = this.startPoint.y+(this.lastMouseY-this.startPoint.y)
    		*Math.cos(this.count/5*Math.PI)*Math.pow(this.damping, this.count);
      
    	if ( Math.pow(this.damping, this.count) < .0901) {
    		this.finishWave = true;
    	}
    	var wavePoint = new Point(x, y);
        this.drawArc(this.startPoint, wavePoint, this.endPoint, this.ctx);
        this.count++; 
    }
};

String.prototype.clear = function(){
	// clear
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


String.prototype.update = function(){
};

String.prototype.mouseMove = function(self, pos){
	self.controlPoint.x = pos.layerX;
	self.controlPoint.y = pos.layerY;	
  
};

var dist = function(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

var circleCenter = function(startPoint, thirdPoint, endPoint){
    var dy1 = thirdPoint.y - startPoint.y;
    var dx1 = thirdPoint.x - startPoint.x;
    var dy2 = endPoint.y - thirdPoint.y;
    var dx2 = endPoint.x - thirdPoint.x;

    var aSlope = dy1/dx1;
    var bSlope = dy2/dx2;  


    var centerX = (aSlope*bSlope*(startPoint.y - endPoint.y) + bSlope*(startPoint.x + thirdPoint.x)
        - aSlope*(thirdPoint.x+endPoint.x) )/( 2* (bSlope-aSlope) );
    var centerY = -1*(centerX - (startPoint.x+thirdPoint.x)/2)/aSlope +  (startPoint.y+thirdPoint.y)/2;
    var r = dist(centerX, centerY, startPoint.x, startPoint.y)

    return {
        x: centerX,
        y: centerY,
        r: r
    };
}

var Point = function (x,y){
    this.x=x;
    this.y=y;
}


window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
	  window.setTimeout(callback, 500 / 60);
    
	};
})();

var string4 = new String('string-4', new Point(20, 10.5), new Point(510, 10.5));
var string3 = new String('string-3', new Point(20, 10.5), new Point(510, 10.5));
var string2 = new String('string-2', new Point(20, 10.5), new Point(510, 10.5));
var string1 = new String('string-1', new Point(20, 10.5), new Point(510, 10.5));
(function animate() {	

	string4.update();
  string4.clear();
  string4.draw();

	string3.update();
  string3.clear();
  string3.draw();
  
  string2.update();
  string2.clear();
  string2.draw();
  
  string1.update();
  string1.clear();
  string1.draw();

	requestAnimFrame(function() {
	  animate();
	});
})()

