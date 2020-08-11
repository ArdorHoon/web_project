function getCustomerInfo(event){

const user_id = event.currentTarget.getAttribute('id');
console.log(user_id);

sessionStorage.setItem("user_id", user_id);

location.href = "/customerInfo.html";

}
function getAllUserData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/user/list' , function(response){
            resolve(response);
        });
    });

}

function init(){


    getAllUserData().then(function(dataset){

        console.log(dataset);
        $.each(dataset, function(index, item){

            
            $(".all-user-list").append(
                
            `
           
            <tr  id = ${item.user_id} onclick = "getCustomerInfo(event)" style ="cursor : pointer;" >
                <td>${item.user_name}</td>
                <td>${item.user_id}</td>
                <td>${item.user_phone}</td>
                <td>${item.user_point}</td>
                <td>${item.user_total}</td>
                <td>${item.user_totalprice}</td>
              </tr> `
            );

            
        });
   });



}


init();


