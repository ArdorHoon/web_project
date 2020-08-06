

const logout = document.querySelector(".logout");

//session check
function checkSession(){

    if(sessionStorage.getItem("key") !== "ADB1245AD493943"){
            alert("잘못된 접근입니다.");
            history.back();
    }

}

//logout

$(".logout").click(function(){

    sessionStorage.clear();
    location.href = "index.html";

});


function init(){

    checkSession();


}


init();