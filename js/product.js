let displayMap = new Map();
let rmap = [];


//변경하기 버튼 클릭 시
function clickChangeBtn(product_id){

    
    sessionStorage.setItem('product_id', product_id);
    location.href = "/changeProduct.html";
}

function classifyType2(){

  
    const type = $(".classify-type2 option:selected").val();
  

    console.log(displayMap);
    
    if(type==="display"){

        $(".all-product-list").empty();

        displayMap.forEach(function(value, key) {
            
            $(".all-product-list").append(value);
          });

    }
    
    if(type ==="register"){

        $(".all-product-list").empty();

        for(let value of rmap){
            $(".all-product-list").append(displayMap.get(value));
        }

    }
    


}

//modal click 시 상품 이름 상단에 노출 
$("#productModal").on('show.bs.modal', function(event){

    const button = $(event.relatedTarget); // Button that triggered the modal
    const recipient = button.data('whatever'); // Extract info from data-* attributes
    const dataid = button.data('pids'); //삭제하기 위한 ID 

    const modal = $(this);
    modal.find('.modal-title').text(recipient);
    modal.find('.modal-footer .deleteBtn').attr("id", dataid);


});

//modal에서 삭제 버튼 클릭시 
$(".deleteBtn").on("click", function(event){

    const button = event.currentTarget;
    const dataid = button.id; //id 값이 삭제할 product_number , string 타입
    $.post("http://13.209.181.48:3000/product/delete", { _id : dataid }, function(data){
      
        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 

        }
    });




});

//Primoise object 
function getAllProductData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/product/list/admin' , function(response){
            resolve(response);
            console.log(response);
        });
    });

}

function init(){


   getAllProductData().then(function(dataset){

 
        
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

            $(".all-product-list").append(
                `<tr class="${item.product_type}" id=${item.product_id}>
                <th class="item_id" scope="row">${item.product_id}</th>
                <td><img src=${item.product_thumbnail === "exam" ? "/imgs/exam.png"  : item.product_thumbnail} class="rounded" style="width : 56px; height : 56px; margin-right : 8px;"/> ${item.product_name}</td>
                <td>${item.product_op}</td>
                <td>${item.product_sp}</td>
                <td>${item.product_count}</td>  
                <td style ="color : ${color};">${state}</td>
                <td><div class="row">
                    <button class="change_product" onclick="clickChangeBtn(${item.product_id})"><img src="/imgs/chage_btn.png"/></button> 
                    <button class="delete_product" data-pids="${item.product_id}" data-toggle="modal" data-target ="#productModal" data-whatever = "${item.product_name}"><img src="/imgs/delete_btn.png"/></button>
                </div></td>
              </tr>`
            );
            
        });
   
   
   
    }).then(function(){

        
        const rows = $("#product-table tbody tr").get();

        $.each(rows, function(index, row){
            
            const a = $(row).attr("id");
            displayMap.set(Number(a), row);

        });
        
        displayMap.forEach(function(value, key) {       
            rmap.push(key);
          
        });
        
        rmap.sort(compare);


        $(".all-product-list").empty();

        for(let value of rmap){
            $(".all-product-list").append(displayMap.get(value));
        }



    });


   

}

function compare ( a , b ) {   return a - b;   } 

$(document).ready(function() {
    // 모두 로딩되었을때
    init();
    
}); 

$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('#moveTop').fadeIn();
        } else {
            $('#moveTop').fadeOut();
        }
    });
    
    $("#moveTop").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
});
