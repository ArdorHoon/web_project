const login = document.querySelector(".form-signin");
  


function login_admin() {

    login.addEventListener("submit", e=>{

        e.preventDefault();
        const id = login.querySelector("#admin-id").value;
        const password = login.querySelector("#admin-password").value;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            const result = JSON.parse(xhr.responseText);
                if (xhr.status === 200 || xhr.status === 201) 
                {
                    //로그인 성공 시
                    //console.log(result);
            
                } else {
                    //로그인 실패 시
                    alert("잘못된 정보입니다.");
                    id = "";
                    password = "";
                    login.querySelector("#admin-id").focus();
                }
            }
        }
    
        xhr.open("POST", "http://13.209.181.48:3000/user/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("_id="+id+"&_pass="+pass);
    });


}


function init(){
    
    login_admin();
}


init();