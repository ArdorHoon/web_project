
const canvas = document.querySelector(".js-canvas"),
      ctx = canvas.getContext("2d"),
      colors = document.querySelector("#jsColor"),
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



function handleSaveClick(){

    const image = canvas.toDataURL(); //이미지 나타내는 data-URL 반환
    const link = document.createElement("a");

    link.href = image;
    link.download = "MyPaint";
    link.click();


}


function init(){

    saveBtn.addEventListener("click", handleSaveClick);

}

init();