

//변경하기 버튼 클릭 시
function clickChangeBtn(product_id){

    console.log(product_id);

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
    console.log(dataid);
    $.post("http://13.209.181.48:3000/product/delete", { _id : dataid }, function(data){
        console.log(data);

        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 

        }
    });




});

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

            $(".all-product-list").append(
                `<tr>
                <th class="item_id" scope="row">${item.product_id}</th>
                <td>${item.product_name}</td>
                <td>${item.product_op}</td>
                <td>${item.product_sp}</td>
                <td style ="color : ${color};">${state}</td>
                <td><div class="row">
                    <button class="change_product" onclick="clickChangeBtn(${item.product_id})"><img src="/imgs/chage_btn.png"/></button> 
                    <button class="delete_product" data-pids="${item.product_id}" data-toggle="modal" data-target ="#productModal" data-whatever = "${item.product_name}"><img src="/imgs/delete_btn.png"/></button>
                </div></td>
              </tr>`
            );
            
        });
   });




}

init();

