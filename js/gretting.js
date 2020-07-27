const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings")

//querySelector은 찾은 1번째 꺼 querySelectorAll는 모든 것

const USER_LS = "currentUser",
      SHOWING_CN = "showing";

//save name in local Storage
function saveName(text){

    localStorage.setItem(USER_LS, text);
}

//handle of submit event
function handleSubmit(event){

    event.preventDefault(); // event의 가본 동작을 막는다. evnet가 documet노드까지 가고 난 후 새로고침이 되어져 버림
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);

}

function askForName(){

    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){


    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);

    if(dateType ===1){
        greeting.innerText = `Good morning, ${text}!`;
    }else if (dateType ===2){
        greeting.innerText = `Good afternoon, ${text}!`;
    } else if(dateType ===3) {
        greeting.innerText = `Good evening, ${text}!`;
    }
    else {
        greeting.innerText = `Good night, ${text}!`;
    }
    

}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //no user
       askForName(); 

    } else {
        //user is here 
        paintGreeting(currentUser);

    }
}

function init(){

    loadName();
    

}

init();