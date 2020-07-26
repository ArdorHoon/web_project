const body = document.querySelector("body");

// const IMG_NUMBER = 3; //이미지 갯수 


function handleImgLoad(){

    console.log("finish loading");
}


function paintImage(){
 
    const image = new Image();
    image.src = `https://source.unsplash.com/featured/?dark`; //물/산 위주로 출력
    image.classList.add("bgImage");
    body.prepend(image);
    image.addEventListener("loadend", handleImgLoad);


}

function genRandom(){

    const number = Math.floor(Math.random()*IMG_NUMBER) ;
    return number;
}

function init(){

    //const randomNumber = genRandom();
    paintImage();

}

init();