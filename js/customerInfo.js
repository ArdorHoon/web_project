const dataOfUser = sessionStorage.getItem("user_id");

function DaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
    
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('addressNumber').value = data.zonecode; //우편번호
            document.getElementById("userAddress").value = roadAddr; //도로명 주소 
          
        }
    }).open();
}

$(".changeUserInfo").on("click", function(evnet){

    const phone =  $("#phonenumber").val();  //휴대폰 번호
    const name = $("#username").val(); //이름
    const postcode = $("#addressNumber").val();//우편번호
    const address1 =  $("#userAddress").val(); //우편번호
    const subaddress =    $("#userAddress2").val();
    const refundBank = $("#refundBank").val();
    const refundOwner =  $("#refundOwner").val();
    const refundAcc = $("#refundAcc").val();
    const memo =  $("#memo").val();

    $.post("http://13.209.181.48:3000/user/modify/host", {_phone : phone,  _id : dataOfUser, _name : name , _postcode : postcode, _addr : address1, _sub : subaddress, refund_bank : refundBank , 
    refund_owner : refundOwner , refund_acc : refundAcc , _memo : memo }, function(data){
     

        if(data.result === "complete"){
            
           location.href ="/customer/customer.html";
            
        }
    });
    


});


$(".deleteBtn").on("click", function(event){
    
    $.post("http://13.209.181.48:3000/user/delete", { _id : dataOfUser }, function(data){
      
        if(data.result === "complete"){

              location.href="/customer/customer.html";

        }
    });

});


function inputInfo(data){
    const dateOfApply = data[0].user_applydate.split('T');

    $(".user-name-head").text(data[0].user_name);
    $("#signup-day").val(`${dateOfApply[0]} / ${dateOfApply[1]}`);
    $("#staticEmail").val(data[0].user_id); //이메일
    $("#username").val(data[0].user_name); //이름
    $("#phonenumber").val(data[0].user_phone); //휴대폰 번호
    $("#addressNumber").val(data[0].user_postcode);//우편번호
    $("#userAddress").val(data[0].user_address); //도로명 주소
    $("#leastlogin").val(data[0].user_recentdate); //최근 로그인
    $("#userAddress2").val(data[0].user_subaddress);
    $("#totalprice").val(`${data[0].user_totalprice}원`); //구매금액
    $("#totalnum").val(`${data[0].user_total}회`); //구매금액
    $("#refundBank").val(data[0].user_refund_bank);
    $("#refundOwner").val(data[0].user_refund_owner);
    $("#refundAcc").val(data[0].user_refund_acc);
    $("#memo").val(data[0].user_memo);


    if(data[0].user_mmail ===1){

        $(`input:checkbox[name=mmail]`).prop("checked", true);
        $(`input:checkbox[name=mmail]`).attr("disabled", true);
        $(".mmail_text").text(data[0].user_mmail_date);

    } else {

        $(`input:checkbox[name=mmail]`).attr("disabled", true);

    }

    if(data[0].user_msms ===1){

        $(`input:checkbox[name=msms]`).prop("checked", true);
        $(`input:checkbox[name=msms]`).attr("disabled", true);
        $(".msms_text").text(data[0].user_msms_date);
  

    } else{

        $(`input:checkbox[name=msms]`).attr("disabled", true);
    }
}

function init(){

    console.log(dataOfUser);
   
    $.post('http://13.209.181.48:3000/user/info' , { _id : dataOfUser} , function(data) {
        console.log(data);
        inputInfo(data);
    });

    sessionStorage.removeItem("user_id");
}

init();