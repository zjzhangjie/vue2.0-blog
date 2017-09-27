//time表示三角形起始点时间（具体是左下角那个点）
//画实心三角形和时间方法，x/y，起始点（顶点的坐标）,text表示输入的文本
function drawTriangle(ctx, time, y, text) {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var x = DateDiff(time)
	ctx.beginPath();
	ctx.moveTo(x + 45, y - 15);
	ctx.lineTo(x + 50, y - 5);
	ctx.lineTo(x + 40, y - 5);
	ctx.strokeStyle = "blue";
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.fillText(text, x + 30, y - 18);
}
//time1表示起始点的时间，time2表示结束点的时间，输入格式为2006-12-18
//画带箭头的线条,(x1,y)表示线条的起始坐标，x2表示线条延伸多长（到的位置的横坐标）
function drawSolid(ctx, time1, time2, y) {
	var x1 = DateDiff(time1)
	var x2 = DateDiff(time2)
	ctx.beginPath();
	//绘制箭头
	ctx.moveTo(x2 + 32, y - 5);
	ctx.lineTo(x2 + 42, y);
	ctx.lineTo(x2 + 32, y + 5);
	//绘制线条
	ctx.strokeStyle = "black";
	ctx.moveTo(x1 + 44, y);
	ctx.lineTo(x2 + 42, y);
	//绘制圆点
	ctx.arc(x1 + 44, y, 3, 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}

//time表示五角星中心点的起始时间
//五角星和时间方法,xy，五角星的中心坐标,
function drawStar(cxt, time, y, text) {
	var x = DateDiff(time)
	cxt.beginPath();

	for(var i = 0; i < 5; i++) {
		cxt.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * 6 + x + 45, -Math.sin((18 + i * 72) / 180 * Math.PI) * 6 + y + 10);
		cxt.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 3 + x + 45, -Math.sin((54 + i * 72) / 180 * Math.PI) * 3 + y + 10);
	}
	ctx.strokeStyle = "red";
	ctx.fillStyle = "red";
	ctx.fill();
	cxt.closePath();
	cxt.stroke();
	ctx.fillStyle = "black";
	ctx.fillText(text, x + 30, y + 25);
}

//画虚线的方法，（x,y1）表示线条起始点的坐标，y2表示线条延伸到的位置（纵坐标）
function drawDashed(ctx, time) {
	var x = DateDiff(time)
	ctx.beginPath();
	ctx.setLineDash([6, 6]);
	ctx.strokeStyle = "green";
	ctx.moveTo(x + 42, 0);
	ctx.lineTo(x + 42, 840);
	ctx.stroke();
}
//计算天数差的函数，通用  
function DateDiff(sDate) { //sDate1和sDate2是2006-12-18格式  
	var aDate, oDate1, oDate2, iDays
	sDate1 = "2016-12-30"
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式  
	aDate = sDate.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
	return iDays * 1.6438356
}