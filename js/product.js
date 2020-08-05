
const change_btn = document.querySelector(".change_product"),
     delete_btn = document.querySelector(".delete_product"),
     allProductList = document.querySelector(".all-product-list");

//변경하기 버튼 클릭 시
function clickChangeBtn(){

    console.log("chage_btn");

}

//삭제 버튼 클릭 시
function clickDeleteBtn(){

    console.log("delete_btn");
}


function getAllProductData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/product/list' , function(response){
            resolve(response);
        });
    });

}

function init(){

   getAllProductData().then(function(dataset){

        console.log(dataset);
        $.each(dataset, function(index, item){

            let state;
            let color = "#883EFF";

            if(item.product_state === "sale")
                state = "판매 중";
            else if(item.product_state === "stop"){
                state = "판매 중지";
                color = "black";
            }
            else{

                state = "품절";
                color = "#BE1717";
            }

            $(allProductList).append(
                `<tr>
                <th scope="row">${item.product_id}</th>
                <td>${item.product_name}</td>
                <td>${item.product_op}</td>
                <td>${item.product_sp}</td>
                <td style ="color : ${color};">${state}</td>
                <td><div class="row">
                    <button class="change_product" onclick="clickChangeBtn()"><img src="/imgs/chage_btn.png"></button> 
                    <button class="delete_product" onclick="clickDeleteBtn()"><img src="/imgs/delete_btn.png"/></button>
                </div></td>
              </tr>`
            );
     
            
        });
   });




}

init();

