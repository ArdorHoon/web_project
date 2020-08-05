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
                if ((xhr.status === 200 || xhr.status === 201) && result.result !== "failed") 
                {
                    //로그인 성공 시
                    sessionStorage.setItem("key", "ADB1245AD493943");
                    location.href="admin.html";
            
                } else {
                    //로그인 실패 시
                    alert("잘못된 정보입니다.");
                    
                    login.querySelector("#admin-id").value ="";
                    login.querySelector("#admin-password").value="";
                    login.querySelector("#admin-id").focus();
                }
            }
        }
    
        xhr.open("POST", "http://13.209.181.48:3000/user/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("_id="+id+"&_pass="+password);
    });


}


function init(){
    
    login_admin();
}


init();