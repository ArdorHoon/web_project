
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//modal click 시 상품 이름 상단에 노출 
$("#packageModal").on('show.bs.modal', function(event){

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
    
    $.post("http://13.209.181.48:3000/package/delete", { _id : dataid }, function(data){
      
        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 

        }
    });



});

function getAllPackageData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/package/list' , function(response){
            resolve(response);
            
        });
    });

}



function init(){

    let indexs = 1;

   getAllPackageData().then(function(dataset){

   
        
    $.each(dataset, function(index, item){

        $(".all-package-list").append(
            `<tr id=${item._id}>
            <td>${indexs}</td>
            <td><img src=${item._thumbnail} class="rounded" style="width : 56px; height : 56px; margin-right : 8px;"/> ${item._name}</td>
            <td> ${ numberWithCommas(item._sprice)}원</td>
            <td> ${item._sellcount}개</td>
            <td><div class="row">
            <button class="change_product" onclick="clickChangeBtn(${item._id})"><img src="/imgs/chage_btn.png"/></button> 
            <button class="delete_product" data-pids="${item._id}" data-toggle="modal" data-target ="#packageModal" data-whatever = "${item._name}"><img src="/imgs/delete_btn.png"/></button>
        </div></td>
          </tr>`
        );
       
        indexs++;
    });
    



});

    

}

init();