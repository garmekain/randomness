var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var w = window.innerWidth,
	h = window.innerHeight;

var width = 640,
	height = 640;


var pts = [],
	drawn = 0;


function resizeCanvas() {
	w = window.innerWidth;
	h = window.innerHeight;

	if(w > 640 && h > 640) {
		canvas.width = width;
		canvas.height = height;
	} else {
		if(w < h) {
			width = w;
			height = w;
		} else if(w > h) {
			width = h;
			height = h;
		}
		canvas.width = width;
		canvas.height = height;
	}
}

function positionCanvas() {
	canvas.style.left = ((w-width)/2) + "px";
	canvas.style.top = ((h-height)/2) + "px";
}

function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 3, 0, 2*Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
}

function getMousePos(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function redrawPoints() {
	document.getElementById("completed").style.display = "none";
	pts = [];
	drawn = 0;
	refreshCanvas();
}

addPoint = function(e) {
	if(drawn < 10) {
		var mousePos = getMousePos(canvas, e);
		pts.push([(mousePos.x / width).toFixed(3), (mousePos.y / height).toFixed(3)]);
		refreshCanvas();
		drawn++;
	}
	if(drawn == 10) {
		document.getElementById("completed").style.display = "inline";
	}
}



function refreshCanvas() {
	canvas.width = canvas.width;
	for(i = 0; i<pts.length; i++) {
		drawCircle(pts[i][0] * width, pts[i][1] * height);
	}
}









window.onload = function() {
	resizeCanvas();
	positionCanvas();
}
window.onresize = function() {
	resizeCanvas();
	positionCanvas();
	refreshCanvas();
}






canvas.addEventListener('mousedown', addPoint, false);
document.getElementById('toStart').addEventListener('mousedown', function(){document.getElementById('toStart').style.display = "none";});






function sendMail() {
    var link = "mailto:study.randomness@gmail.com?"
             + "&subject=" + "RANDOMNESS"
             + "&body=" + "{" + pts + "}"
    ;

    window.location.href = link;
}