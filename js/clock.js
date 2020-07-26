const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector(".js-title"); //js-clock class 안에 있는 Js-title 접근 

function getTime(){

    const date = new Date(); //Date는 class이다.
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    //innerText 객체 안에 텍스트 
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours }:${
        minutes < 10 ? `0${minutes}` : minutes 
    }:${seconds < 10 ? `0${seconds}` : seconds }`; //삼항 연산자 
    

}

function init(){
    
    getTime();
    setInterval(getTime, 1000); //반복 실행 (주의 : ()은 즉시 호출 )
  

}

init();