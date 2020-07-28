
const canvas = document.querySelector(".js-canvas"),
      ctx = canvas.getContext("2d"),
      colors = document.querySelectorAll(".jsColor"),
      range = document.querySelector("#jsRange"),
      mode = document.querySelector("#jsMode"),
      saveBtn = document.querySelector("#jsSave");


const INITIAL_COLOR = "2c2c2c"; 
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //브러쉬 두께 

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


let painting = false; //그리고 있는지 판단
let filling = false ; //채우기 위해서

canvas.addEventListener("mousemove",e => {

    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }


});

canvas.addEventListener("mousedown",e => {

    painting = true;

});


canvas.addEventListener("mouseup",e => {

    painting = false;

});

canvas.addEventListener("mouseleave",e => {

    painting = false;

});

//배경색 채우기
canvas.addEventListener("click",e => {

    if(filling){

        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);   
    }

});

//마우스 오른쪽 버튼 클릭 시
canvas.addEventListener("contextmenu",e => {
    e.preventDefault();
});


function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
     
    } else {
      filling = true;
      mode.innerText = "Paint";
     
    }

}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    const cursorColor = event.target.id;
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    canvas.style.cursor = `url(/img/${cursorColor}.png), auto`;
    

}


Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
    //Array.from(배열) 배열의 요소를 하나씩 꺼낸다. 
  );

function handleRangeChange(event) {

    const size = event.target.value;
    ctx.lineWidth = size;

}

function handleSaveClick(){

    const image = canvas.toDataURL(); //이미지 나타내는 data-URL 반환
    const link = document.createElement("a");

    link.href = image;
    link.download = "myPaint"; //download file name
    link.click();

}



function init(){

    saveBtn.addEventListener("click", handleSaveClick); //save 시
    range.addEventListener("input", handleRangeChange); //range 변경 시 
    mode.addEventListener("click", handleModeClick); //fill모드 선택 시 

}

init();