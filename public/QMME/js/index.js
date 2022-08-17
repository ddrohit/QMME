//for rewriting location of app

let DownloadImage

if(window.location.href.split("/").slice(-1)[0]=="" ||
   window.location.href.split("/").slice(-1)[0]=="index.html");
else 	
 window.location.href="";

 let fonts=[],fontoptions="";
 var src="Times+New+Roman|Abel|Abril+Fatface|Acme|Alegreya|Alegreya+Sans|Anton|Archivo|Archivo+Black|Archivo+Narrow|Arimo|Arvo|Asap|Asap+Condensed|Bitter|Bowlby+One+SC|Bree+Serif|Cabin|Cairo|Catamaran|Crete+Round|Crimson+Text|Cuprum|Dancing+Script|Dosis|Droid+Sans|Droid+Serif|EB+Garamond|Exo|Exo+2|Faustina|Fira+Sans|Fjalla+One|Francois+One|Gloria+Hallelujah|Hind|Inconsolata|Indie+Flower|Josefin+Sans|Julee|Karla|Lato|Libre+Baskerville|Libre+Franklin|Lobster|Lora|Mada|Manuale|Maven+Pro|Merriweather|Merriweather+Sans|Montserrat|Montserrat+Subrayada|Mukta+Vaani|Muli|Noto+Sans|Noto+Serif|Nunito|Open+Sans|Open+Sans+Condensed:300|Oswald|Oxygen|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|Pacifico|Passion+One|Pathway+Gothic+One|Play|Playfair+Display|Poppins|Questrial|Quicksand|Raleway|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Ropa+Sans|Rubik|Saira|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Sedgwick+Ave|Sedgwick+Ave+Display|Shadows+Into+Light|Signika|Slabo+27px|Source+Code+Pro|Source+Sans+Pro|Spectral|Titillium+Web|Ubuntu|Ubuntu+Condensed|Varela+Round|Vollkorn|Work+Sans|Yanone+Kaffeesatz|Zilla+Slab|Zilla+Slab+Highlight";
	src.split("|").map(function(cr,i,ar){fonts.push(cr.split('+').join(' '))});
	console.log(fonts);
	for(var i=0;i<fonts.length;i++){
		fontoptions+=`<option value="${fonts[i]}">${fonts[i]}</option>`
	}

var rcanvas = document.getElementById("MainCanvas");
//setting canvas size
let excatwidth=window.innerWidth-4; // -4 For exception of borders
let excatheight=window.innerHeight-25-14-13; // -25 for menu -14 for padding -8 unknown

console.log(excatwidth+" "+excatheight)

var canvas = new fabric.Canvas('MainCanvas');
canvas.setDimensions({width:excatwidth, height:excatheight});
rcanvas.width = excatwidth;
rcanvas.height = excatheight;
canvas.calcOffset();
canvas.renderAll();

//while window resizing ..
window.onresize=function(e){
	excatwidth=window.innerWidth-4; // -4 For exception of borders
	excatheight=window.innerHeight-25-14-13; // -25 for menu -14 for padding -8 unknown
	rcanvas.width = excatwidth;
	rcanvas.height = excatheight;
	canvas.width = excatwidth;
	canvas.height = excatheight;
	canvas.setDimensions({width:excatwidth, height:excatheight});
	canvas.calcOffset();
	canvas.renderAll();
}

fabric.Object.prototype.set({
    transparentCorners: false,
	borderColor: 'black',
    cornerColor: '#343a40',
    cornerSize:10,
	padding: 10
});
/*
rcanvas.width=screen.width-4; // -4 For exception of borders
rcanvas.height=screen.height-25-14-13; // -25 for menu -14 for padding -8 unknown
*/
/*Events Setting*/
//Adding Event on selected or selection updated
let updateselection=function(e) {
	console.log("object selected");
	document.getElementById("sidebar").style.display="none";
	document.getElementById("sidebar1").style.display="none";
	document.getElementById("sidebar2").style.display="none";
	document.getElementById("sidebar3").style.display="none";
	document.getElementById("sidebar4").style.display="none";
	if(e.target.get('type')=="text"||e.target.get('type')=="textbox"){
	 document.getElementById("sidebar").style.display="block";
	 document.getElementById("sidebar1").style.display="block";
	}
	if(e.target.get('type')=="image"){
		document.getElementById("sidebar").style.display="block";
		document.getElementById("sidebar4").style.display="block";
	   }
    console.log("object selected "+e.target.get('type'));
}
canvas.on('selection:updated',updateselection);
canvas.on('object:selected',updateselection);

canvas.on('selection:cleared', function(event) {
	document.getElementById("sidebar3").style.display="none";
    document.getElementById("sidebar").style.display="none";
    console.log("object deselected");
});

canvas.on('object:moving', function(event) {
	document.getElementById("sidebar").style.display="none";
});

canvas.on('object:moved', function(e) {
	 document.getElementById("sidebar").style.display="block";
    console.log("object:droped");
});
canvas.on('object:scaling', function (event) {
	Al = new Algorithm(document.getElementById("MainCanvas").height,document.getElementById("MainCanvas").width,canvas);
	console.log(Al.getnearestjoint());
 });
//Events Ending.
//Adding Text
function AddText(){
    var text = new fabric.Textbox("Text", { left: 100, top: 100,fontsize: 50});
    canvas.add(text);
    canvas.requestRenderAll();
    canvas.setActiveObject(text);
}

function updatetext(val){
	canvas.getActiveObject().text=val;
	canvas.renderAll();
	canvas.setActiveObject(canvas.getActiveObject());
}

function initilizetexteditor(){
	document.getElementById("texteditortext").value=canvas.getActiveObject().text;
}
//Adding Images
var i=0,imgInstance = new Array();
function Loadimage(input) {
	i++;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
            var x = document.createElement("IMG");
			x.setAttribute("src", e.target.result);
            x.setAttribute("id",i);
            x.setAttribute("onload","loaded("+i+")");
            document.getElementById("hiddenarea").appendChild(x);
            input.value="";
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function loaded(val){
    imgInstance[i] = new fabric.Image(document.getElementById(i), {
	left: 0,
	top: 0,
	angle: 0,
	opacity: 1
	});
	console.log(imgInstance[i]);
	if(imgInstance[i].width>screen.width-8){
		let scale = 300 / imgInstance[i].width;
		imgInstance[i].set({
		    scaleX: scale,
		    scaleY: scale
		});
	}
	canvas.add(imgInstance[i]);
	i++;
}

//download the image

var preview = function(){
	Al = new Algorithm(canvas.width,canvas.height,canvas);
	console.log(Al.getboundaries());
	canvas.discardActiveObject();
  	canvas.requestRenderAll();
  	setTimeout(function(){

	//for removing all the unwanted datasets
	let boundaries = Al.getboundaries();  
	var tempcanvas = document.createElement('canvas');
	tempcanvas.setAttribute("width",boundaries.width);
	tempcanvas.setAttribute("height",boundaries.height);
	// Create an ImageData object from it
	var imagedata = canvas.getContext('2d').getImageData(boundaries.point1.x, boundaries.point1.y, boundaries.width,boundaries.height);
	// use the putImageData function that illustrates how putImageData works
	tempcanvas.getContext('2d').putImageData(imagedata, 0, 0);

	if(false)
	var data = document.getElementById('MainCanvas').toDataURL();
	else{
		var data = tempcanvas.toDataURL();
	}
	
  	document.getElementById("dimenssions").innerHTML=boundaries.width+" * "+boundaries.height;

  	DownloadImage = document.createElement("IMG");
  	DownloadImage.width = boundaries.width;
  	DownloadImage.height = boundaries.height;
  	DownloadImage.src=data;

  	var Maxx = parseInt(document.getElementById("previewcontainer").offsetWidth)-45,
  		Maxy = parseInt(document.getElementById("previewcontainer").offsetHeight)-30;

  	var ratio1 = boundaries.width/boundaries.height;
  	var ratio2 = boundaries.height/boundaries.width;
  	console.log(Maxx+" "+Maxy)
  	if(boundaries.width > Maxx)
  	{
  		var diff = boundaries.width - Maxx;
  		boundaries.width = Maxx;
  		boundaries.height-=diff*ratio2;
  	}
  	if(boundaries.height > Maxy)
  	{
  		var diff = boundaries.height - Maxy;
  		boundaries.height = Maxy;
  		boundaries.width-=diff*ratio1;
  	}

  	document.getElementById("preview").width=boundaries.width;
  	document.getElementById("preview").height=boundaries.height;
  	document.getElementById("preview").src=data;
  },100);
}

var download = function(){
  canvas.discardActiveObject();
  canvas.requestRenderAll();
  var link = document.createElement('a');
  var filename=document.getElementById("downloadname").value,
  	  ext=document.getElementById("ext").value;
  link.download = filename+""+ext;
  link.href = DownloadImage.src;
  link.click();
}

//

function checkimage(){
	let url=document.getElementById("imageurl");
	let urlvalue = url.value;
	let loadimage = document.getElementById("loadedimagepreview");
	var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
	   alert("image loaded");
	   document.getElementById("loadedimagepreview").innerHTML="";
	   document.getElementById("loadedimagepreview").appendChild(img);
	   document.getElementById("loadurlimage").innerHTML=`<button onclick='LoadImageUrl(${i})'>Add image</button>`;
    };

	img.onerror = function () {
		alert("Error in loading the image "+urlvalue);
	};

	img.src = urlvalue;
	img.id=i;
	img.style.width="100%";
}

function LoadImageUrl(val){
	loaded(val);
	document.getElementById("loadedimagepreview").innerHTML="";
	window.location="#";
}

//Change font size

function ChangeFontSize(size){
	size = parseInt(size);
	if(size==null||size+""=="NaN"||size==undefined) alert("Got Uncorrect Input")
	else{
		document.getElementById("sidefontvalue").innerHTML=""+size;
		canvas.getActiveObject().set("fontSize", ""+size);
		canvas.renderAll(); 
	}
}

function ToggelFontSizer(){
	if(document.getElementById("sidebar2").style.display=="none"){
		document.getElementById("sidebar2").style.display="block";
		document.getElementById("fontslider").value=canvas.getActiveObject().fontSize;
		document.getElementById("sidefontvalue").innerHTML=canvas.getActiveObject().fontSize;
		document.getElementById("sidebar1").style.display="none";
	}
	else{
		document.getElementById("sidebar2").style.display="none";
		document.getElementById("sidebar1").style.display="block";
	}
}	

//chainging color of text

function changecolor(val){
    try{
        canvas.getActiveObject().setColor(val);
        canvas.requestRenderAll();
    }
    catch(err){
        alert("Please Select the Object for which you Want to change the color");
    }
}
function bgchangecolor(val){
    try{
        canvas.getActiveObject().set('backgroundColor', val);
        canvas.requestRenderAll();
    }
    catch(err){
        alert("Please Select the Object for which you Want to change the color");
    }
}

//togglefullscreen
function togglefullscreen(){
	var elem = document.documentElement;
	if(!document.fullscreen){
	if (elem.requestFullscreen) {
	   elem.requestFullscreen();
	  } else if (elem.mozRequestFullScreen) { /* Firefox */
	    elem.mozRequestFullScreen();
	  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
	    elem.webkitRequestFullscreen();
	  } else if (elem.msRequestFullscreen) { /* IE/Edge */
	    elem.msRequestFullscreen();
	  }
  }
  else{
	  if (document.exitFullscreen) {
	    document.exitFullscreen();
	  } else if (document.mozCancelFullScreen) {
	    document.mozCancelFullScreen();
	  } else if (document.webkitExitFullscreen) {
	    document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) {
	    document.msExitFullscreen();
	  }
	}
}

function ToogleSlide(element1,element2){
	var element1=document.getElementById(element1),
		element2=document.getElementById(element2);
	if(element1.style.display=="none"){
		element1.style.display="block";
		element2.style.display="none";
	}
	else{
	    element1.style.display="none";
	    element2.style.display="block";
	}
		
}

//change the z-index
function changeindex(to){
	if(to=="front")
		canvas.bringToFront(canvas.getActiveObject())
	else
		canvas.sendToBack(canvas.getActiveObject())
}

//change normal bold italic fonts
function changenbistyle(val){
	var tooglevalues=["normalimage.png","boldimage.png","italicimage.png","bolditalicimage.png"],
		index=tooglevalues.indexOf(val.src.split("/").slice(-1)[0]);
	val.src="img/"+tooglevalues[(++index)%4];
	switch(index){
		case 1:
			canvas.getActiveObject().fontWeight = "bold";
			break;
		case 2:
			canvas.getActiveObject().fontWeight = "normal";
			canvas.getActiveObject().fontStyle = "italic";
			break;
		case 3:
			canvas.getActiveObject().fontWeight = "bold";
			break;
		default:
			canvas.getActiveObject().fontWeight = "normal";
			canvas.getActiveObject().fontStyle = "";
			break;
	}
	canvas.renderAll();
}

function showallobjs(){
	var objscontainer=document.getElementById("objscontainer"),
		objs=canvas.getObjects();
		objscontainer.innerHTML="",
		i=0;
	objs.forEach((obj=>{
			console.log(obj);
			objscontainer.innerHTML=objscontainer.innerHTML+
			`
				<a href="#MainCanvas" onclick="setactiveobj(${i})">
					<div>${obj.type} (${Math.floor(obj.left)},${Math.floor(obj.top)})</div>
				</a>
			`;
			i++;
	}))
}

function setactiveobj(value){
	var obj=fabric.util.object.clone(canvas.getObjects()[value]);
	obj.left=50;
	obj.top=50;
	canvas.setActiveObject(obj);
	canvas.remove(canvas.getObjects()[value]);
	canvas.add(obj);
	canvas.renderAll();
}

function changefontfamily(value)
{
	var font = new FontFaceObserver(value);

	if(value!="Times New Roman")
	font.load().then(function () {
	//alert('Font is available');
	document.getElementById("FontFamily-Preview").style.fontFamily = value;
	canvas.getActiveObject().set("fontFamily", value);
    canvas.requestRenderAll();
	}, function () {
	alert('Font is not available');
	});
	else{
		document.getElementById("FontFamily-Preview").style.fontFamily = value;
		canvas.getActiveObject().set("fontFamily", value);
    	canvas.requestRenderAll();
	}
}

function Automate()
{
	i++;
	var x = document.createElement("IMG");
	x.setAttribute("src", "https://i.paste.pics/e7a300d3cc449d162e1a40556c51c22a.png");
    x.setAttribute("id",i);
	x.setAttribute("onload","loaded("+i+")");
	document.getElementById("hiddenarea").appendChild(x);
	setTimeout(function(){
		var text = new fabric.Text(`10 AUG`, { left: 100, top: 100,fontsize: 50,fontWeight: '1000'});
    	canvas.add(text);
		canvas.requestRenderAll();
	},1000)
}

function lockx(obj){
	obj.lockMovementX = true;
	canvas.requestRenderAll();
}

function unlockx(obj){
	obj.lockMovementX = false;
	canvas.requestRenderAll();
}

function locky(obj){
	obj.lockMovementY = true;
	canvas.requestRenderAll();
}

function unlocky(obj){
	obj.lockMovementY = false;
	canvas.requestRenderAll();
}

image =[];
