
//카테고리 생성
$(".categoryCreateBtn").on("click", function(event){

    const name = $("#AddcategoryName").val();

    $.post("http://13.209.181.48:3000/category/apply", { _category : name }, function(data){
      
        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 

        }
    });


});

//카테고리 변경
$(".categoryChagneBtn").on("click", function(event){

    const name = $("#changeCategoryName").val();
   
    const button = event.currentTarget;
    const dataid = button.id; //id 값이 삭제할 product_number , string 타입

    $.post("http://13.209.181.48:3000/category/modify", { _id : dataid, _category : name }, function(data){
      
        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 

        }
    });


});


//modal click 시 상품 이름 상단에 노출 
$("#categorydeleteModal").on('show.bs.modal', function(event){

    const button = $(event.relatedTarget); // Button that triggered the modal
    const recipient = button.data('whatever'); // Extract info from data-* attributes
    const dataid = button.data('pids'); //삭제하기 위한 ID 

    const modal = $(this);
    modal.find('.modal-title').text(recipient);
    modal.find('.modal-footer .deleteBtn').attr("id", dataid);


});

//변경 시 id 받기 위한 코드 
$("#categorychangeModal").on('show.bs.modal', function(event){

    const button = $(event.relatedTarget); // Button that triggered the modal
    const recipient = button.data('whatever'); // Extract info from data-* attributes
    const dataid = button.data('pids'); //삭제하기 위한 ID 

    const modal = $(this);
    modal.find('.category-text').val(recipient);
    modal.find('.modal-footer .categoryChagneBtn').attr("id", dataid);


});



//modal에서 삭제 버튼 클릭시 
$(".deleteBtn").on("click", function(event){

    const button = event.currentTarget;
    const dataid = button.id; //id 값이 삭제할 product_number , string 타입
    $.post("http://13.209.181.48:3000/category/delete", { _id : dataid }, function(data){
      
        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 

        }
    });




});

function getAllCategoryData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/category/list' , function(response){
            resolve(response);
        });
    });

}




function init(){


    getAllCategoryData().then(function(dataset){

    
        $.each(dataset, function(index, item){

            $(".all-product-list").append(
                `<tr>
                <th class="item_id" scope="row">${index+1}</th>
                <td><img src="/imgs/categorytagimg.png" class="rounded" style="width : 50px; height : 50px; margin-right : 8px;"/><strong> ${item._category}</strong> </td>
                <td style="color : #8C8C9F" >${item._cnt}개 상품 연결됨</td>
                <td><div class="row">
                    <button class="change_category" data-pids="${item._id}" data-toggle="modal" data-target ="#categorychangeModal" data-whatever = "${item._category}"><img src="/imgs/chage_btn.png"/></button> 
                    <button class="delete_category" data-pids="${item._id}" data-toggle="modal" data-target ="#categorydeleteModal" data-whatever = "${item._category}"><img src="/imgs/delete_btn.png"/></button>
                </div></td>
              </tr>`
            );

            
        });
   });

}

init();