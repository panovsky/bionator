

// size of canvas and fullsreen
var canvasWidth = 400;
var mySize = 1;
var myWidth = 1280;
var myHeight = 720;
var fs = 1; //1-400, 2-1280, 0-покой

myWidth *=mySize;
myHeight *=mySize;

//preloader 
var text=null;
var prld=null;
var prld2 = null;

// sequence of image and nessesary information
var seq={};
  seq.img = [];
  seq.img[0] = null;
  seq.cfr = 1;
  seq.spd = 1;

// markers on object
var mrk = [];
var ppp;

// text
var lang = 'de';
var txts = []; 
var bubbleR = null;
var bubbleL = null;
var scrText = null;

// FRAME AND BUTTONS
var frame = null;
var btn = null;

// drag-rotate var's
var x0 = 0;
var x0f = false;

// main variable
var game = null;

// CANVAS perlace to AUTO, if problem in some browsers
game = new Phaser.Game(myWidth, myHeight, Phaser.CANVAS, 'bionator', {
  preload: preload,
  create: create,
  update: update,
  render: render
});



function preload() {

  //  preload images
  
  game.load.image('prld', 'assets/prld.png');
  game.load.image('prld24', 'assets/prld2.jpg');
   // TEXT LOADING
  if(lang == 'de'){
    $.get('assets/data.json', function(data) {
      for (var i in data.langs[2]) {
            txts[i]=(data.langs[2][i]);
            txts[i] = txts[i].toString();
           
        }
    });
  }

  
  

    
  //Size and debug info and nopause when focusOut
    game.scale.minWidth = canvasWidth;
    game.scale.minHeight = canvasWidth/myWidth * myHeight;
    game.scale.maxWidth = canvasWidth;
    game.scale.maxHeight = canvasWidth/myWidth * myHeight;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.updateLayout(true);
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    
    game.time.advancedTiming = true;
    
    game.stage.disableVisibilityChange = true;

  //preloader text
  text = game.add.text(myWidth * 0.47, myHeight * 0.75, "00", {
    font: "72px Arial",
    fill: "#aaaaaa",
    align: "center"
  });
  text.anchor.setTo(0.5, 0.5);
  text.scale.set(mySize);
  game.load.onFileComplete.add(updateProgressBar, this);


  //  get sequence files
  var ii = 0;
  var jj = '';
  var link = 'pan_000';
  var pathStat = 'assets/seq/';
  var path = pathStat + link + '.jpg';
  for(ii=1; ii<141; ii+=1){
    
    jj=ii.toString();
    
    link = link.substring(0, link.length - jj.length) + jj;
    path = pathStat + link + '.jpg';
    
    //console.log(path);

    game.load.image(link, path);
  }

  //  MARKER
  game.load.image('marker', 'assets/marker.png');

  // bubble
  game.load.image('bublR', 'assets/bRight.png');
  game.load.image('bublL', 'assets/bLeft.png');

  //  FRAME AND BUTTON
  game.load.image('frame', 'assets/frame.png');  
  game.load.image('btn', 'assets/btn.png');
  
}

//  CREATE OBJs
function create() {

  game.stage.backgroundColor = '#222222';
  
  text.destroy();
  

  //  SEQUENCE 
  var ii = 0;
  var jj = '';
  var link = 'pan_000';
  for(ii=1; ii<141; ii+=1){
    
    jj=ii.toString();
    
    link = link.substring(0, link.length - jj.length) + jj;

    seq.img.push(game.add.image(myWidth/2, myHeight/2, link));
    seq.img[seq.img.length-1].anchor.setTo(0.5, 0.5);
    seq.img[seq.img.length-1].visible=false;

    seq.img[seq.img.length-1].scale.set(mySize);
    
  }

  //  MARKERS
  
  mrk[0] = null; //firs marker is null just because this easily association with text

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 52, 92, 15, 175, 1140, 330, 370);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 48, 91, 10, 330, 985, 415, 440);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 52, 91, 10, 360, 953, 512, 550);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 12, 52, 116, 262, 1049, 397, 424);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 33, 69, 129, 370, 953, 420, 444);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 132, 18, 92, 450, 851, 150, 152);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 58, 48, 65, 395, 921, 396, 389);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 52, 43, 63, 395, 921, 386, 379);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 77, 120, 45, 370, 963, 392, 414); 

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 89, 122, 51, 250, 1045, 325, 356);

  newMarker('marker', myWidth/2, myHeight*2);
  attrMarker(mrk[mrk.length-1], 101, 1, 57, 260, 1046, 415, 445);

  // bubbles
  bubbleL = game.add.sprite(myWidth/2, myHeight/2, 'bublL');
  bubbleL.anchor.setTo(0.93, 1);
  bubbleL.width = bubbleL.width*1.5;
  bubbleL.height = bubbleL.height*1.2;
  bubbleL.visible = false;

  bubbleR = game.add.sprite(myWidth/2, myHeight/2, 'bublR');
  bubbleR.anchor.setTo(0.07, 1);
  bubbleR.width = bubbleR.width*1.5;
  bubbleR.height = bubbleR.height*1.2;
  bubbleR.visible = false;

  // TEXT in bubbles
  scrText = game.add.text(myWidth * 0.5, myHeight * 0.5, "00", {
    font: "18px Times",
    fill: "#333333",
    align: "left"
  });
  scrText.visible = false;


  //  BUTTON
  btn = game.add.button(myWidth * 0.955, myHeight * 0.055, 'btn', b1press, this, 0,0,0);
  btn.anchor.setTo(0.5, 0.5);
  btn.onInputOver.add(b1over, btn);
  btn.onInputOut.add(b1out, btn);
  btn.tint = 0xeeeeee;
  btn.scale.set(mySize);
  btn.visible = false;

  // FRAME
  frame = game.add.image(myWidth/2, myHeight/2, 'frame');
  frame.anchor.setTo(0.5, 0.5);
  frame.scale.set(mySize);

  game.time.events.loop(Phaser.Timer.SECOND * 0.03, updateCounter, this);

  game.input.onTap.add(onTap, this);



}



//  TICK
function update() {

  if(game.input.x >= myWidth/2){
    seq.spd = -1;
  } else if (game.input.x<myWidth/2){
    seq.spd = 1;
  }

  if(myWidth*0.1 < game.input.x && game.input.x < myWidth*0.9 && 135 < game.input.y && game.input.y < myHeight*0.8){
    seq.spd = 0;


    //  ДРАГ КАДРОВ
    //if have problem on mobile - replace to game.input.onHold || onDown
    if(game.input.activePointer.leftButton.isDown) {

      if(!x0f){
        x0 = game.input.x;
        x0f = true;
      }

      var xx = game.input.x - x0;

      if( Math.abs(xx) >= 1){
        seq.spd = Math.abs(xx)/xx * -2;
        updateCounter();
        seq.spd = 0;
        x0f = false;
      } 
    }

  }

  // exit from fullscreen on press ESC or anyElse
  if(!game.scale.isFullScreen && fs ==2) {
        game.scale.maxWidth = canvasWidth;
        game.scale.maxHeight = canvasWidth/myWidth * myHeight;
        
        game.scale.refresh();

        btn.visible = false;
        fs =1;

      } 
}


// DEBUG INFORMATION
function render() {  
  // game.debug.text('fps: ' + game.time.fps, myWidth*0.01, myHeight*0.05);
  // game.debug.text('frame: ' + seq.cfr, myWidth*0.01, myHeight*0.1);
  // game.debug.text('x: ' + game.input.x + ' px;' + '  y: ' + game.input.y + ' px;', myWidth*0.01, myHeight*0.15);
  // game.debug.text('ppp: ' + ppp, myWidth*0.01, myHeight*0.2); 

}



///////////////////////////////////////////////
//     subFunctions
///////////////////////////////////////////////


//  preloader
function updateProgressBar() {

  // Another file has just loaded, so update the size of my progress bar graphic here
 if(game.cache.checkImageKey('prld24') && prld2 == null){
     //console.log('prld24');
    prld2 = game.add.image(myWidth/2, myHeight/2, 'prld24');
    prld2.anchor.setTo(0.5, 0.5);
    prld2.scale.set(mySize*3.2);
  }
  
   if(game.cache.checkImageKey('prld') && prld == null){
       //console.log('prld');
    prld = game.add.image(myWidth/2, myHeight/2, 'prld');
    prld.anchor.setTo(0.5, 0.5);
    prld.scale.set(mySize/0.3125);
    game.world.bringToTop(prld);
  }
  
  game.world.bringToTop(prld);
  
  text.setText(game.load.progress + ' of 100%');
  text.anchor.setTo(0.5, 0.5);
  text.x = myWidth *0.5;
  
  game.world.bringToTop(text);


}

//  FRAME RENDER ~30fps 
function updateCounter(){
  seq.img[seq.cfr].visible = false;

  seq.cfr += seq.spd;
  
  if(seq.cfr >= 141 && seq.spd > 0){
    seq.cfr = 1;
  } 

  if(seq.cfr <= 0 && seq.spd < 0){
    seq.cfr = 140;
  }

  seq.img[seq.cfr].visible = true;


  for(var jj=1; jj<mrk.length; jj+=1){
    posMarker(mrk[jj], mrk[jj].frCenter, mrk[jj].frStart, mrk[jj].frEnd, mrk[jj].posStart, mrk[jj].posEnd, mrk[jj].yUp, mrk[jj].yDn);
  }
  

}



//  click || tap Fullscreen mode on
function onTap(){


  if (!game.scale.isFullScreen && fs ==1) {
        btn.visible = true;

        game.scale.maxWidth = myWidth/mySize;
        game.scale.maxHeight = myHeight/mySize;
        
        game.scale.startFullScreen();
        
        game.scale.refresh();

        fs = 2;

      }

}



/////////////////
//  fullScreenExit button
//////////////

//button press
function b1press(){
  if (fs==2) {
    game.scale.maxWidth = canvasWidth;
    game.scale.maxHeight = canvasWidth/myWidth * myHeight;
    
    game.scale.stopFullScreen();

    game.scale.refresh();

    btn.visible = false;

    fs=1;
  } 
}

//button over
function b1over(){
  this.scale.set(1.1*mySize);
  this.tint = 0xffffff; 
}

//button out
function b1out(){
  this.scale.set(mySize);
  this.tint = 0xfcfcfc;
}

/////////////////
//  Markers 
////////////////

function newMarker(bt, btx, bty){
  mrk.push(game.add.button(btx, bty, bt, mrkPress, this, 0,0,0));
  mrk[mrk.length-1].anchor.setTo(0.5, 0.5);
  mrk[mrk.length-1].onInputOver.add(mrkOver, mrk[mrk.length-1]);
  mrk[mrk.length-1].onInputOut.add(mrkOut, mrk[mrk.length-1]);
  mrk[mrk.length-1].tint = 0xeeeeee;
  mrk[mrk.length-1].scale.set(mySize);
  mrk[mrk.length-1].indx = (mrk.length-1).toString();

}

// press to marker 
function mrkPress(){

}

//cursor overMarker
function mrkOver(){
  //this.indx == json.**.txt.index
  //this.buble.setext = json.**[this.indx];
  this.scale.set(mySize*1.1);

  //console.log(mrk.indexOf(this));
  var tt = 't' + mrk.indexOf(this);
  scrText.setText(txts[tt]);
  
  scrText.y = this.y-120;
  scrText.visible = true;
  scrText.align = 'center';
  //scrText.font
  scrText.anchor.setTo(0.5, 0.5);

  if(this.x<myWidth/2){
    bubbleR.x = this.x - 15;
    bubbleR.y = this.y - 10;
    bubbleR.visible = true;

    scrText.x = bubbleR.x+bubbleR.width * 0.43;
  } else {
    bubbleL.x = this.x + 15;
    bubbleL.y = this.y - 10;
    bubbleL.visible = true;

    scrText.x = bubbleL.x-bubbleL.width * 0.43;
  }

}

//cursor outMarker
function mrkOut(){
  this.scale.set(mySize);

  scrText.visible = false;
  bubbleR.visible = false;
  bubbleL.visible = false;

}

// SET MARKER additional attributes
function attrMarker(cMarker, frCenter, frStart, frEnd, posStart, posEnd, yUp, yDn){
  cMarker.frCenter = frCenter;
  cMarker.frStart = frStart;
  cMarker.frEnd = frEnd;
  cMarker.posStart = posStart;
  cMarker.posEnd = posEnd;
  cMarker.yUp = yUp;
  cMarker.yDn = yDn;
  cMarker.indx = mrk[mrk.length-1];
}

// SET MARKERs POSITIONs
function posMarker(cMarker, frCenter, frStart, frEnd, posStart, posEnd, yUp, yDn){
  
  var frmeDelta = seq.cfr - frCenter;
  if(frmeDelta<1){
    frmeDelta += 140;
  }

  var posDelta = Math.PI * (70 - frmeDelta)/70;
  cMarker.x = (posEnd - posStart)/2 * Math.sin(posDelta) + (posEnd - posStart)/2 + posStart;

  var posDelta = Math.PI * (35 - frmeDelta)/35;
  cMarker.y = (yUp - yDn)/2 * Math.cos(posDelta) + (yDn - yUp)/2 + yUp;

  ppp = (35 - frmeDelta)/35;

  if(frStart>frEnd){
    if(seq.cfr>frStart || seq.cfr<frEnd){
      cMarker.visible = true;
    } else {
      cMarker.visible = false;
    }
  } else {
    if(seq.cfr>frStart && seq.cfr<frEnd){
      cMarker.visible = true;
    } else {
      cMarker.visible = false;
    }
  }
}
