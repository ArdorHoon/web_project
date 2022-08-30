const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; //toDolist 저장하는 목록 


function deleteToDo(event){

   const btn = event.target; 
   const li = btn.parentNode;
   toDoList.removeChild(li);

   const cleanToDos = toDos.filter(function(toDo){

        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();

}


function saveToDos(){ //save localstorage 

    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //js object를 string으로 변환 
}
//local storage에서는 js의 data를 저장할 수가 없다.

function paintToDo(text){

    const li = document.createElement("li");
    const delBtn = document.createElement("input");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.type = "image";
    delBtn.name = "button";
    delBtn.src = "/img/delete.png";
    delBtn.className = "img-button";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = `${text}  `;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    
    const toDoObj = {
        text : text,
        id : newId
    };

    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event){

    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); 
    toDoInput.value = "";

}

function loadToDos(){

    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){

        const parseToDos = JSON.parse(loadedToDos); //string -> object [{}, {}, {}]
        parseToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });


    } else {


    }
}


function init(){

    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}


init();