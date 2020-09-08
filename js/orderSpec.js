const orderId = sessionStorage.getItem("order_id"); 
let box_length; 

const card = {

    0 : "XOXO 카드!"

};


const state = {

    "pay" : "결제대기",
    "failed" : "결제실패" ,
    "paid" : "결제완료",
    "making" : "박스 제작중" ,
    "req_can" : "취소 요청",
    "can_comp" : "취소 완료",
    "req_ref" : "환불 요청",
    "ref_comp" : "환불 완료",
    "delivery" : "배송중",
    "dev_comp" : "배송 완료"

};

const checkPay = {

    "card" : "카드",
    "bank" : "실시간 계좌이체",
    "vbank" : "가상계좌",
    undefined : "undefined!"
};

function AddComma(data_value) {
 
    return Number(data_value).toLocaleString('en');
    
}

$(".changeOrderInfo").click(function(){

    const orderState = document.querySelector("#orderState"); //product_kind.options[target.selectedIndex].value
    const state = orderState.options[orderState.selectedIndex].value;

    const company = $("#delivery1").val(); //택배회사
    const com_num = $("#delivery2").val(); //송장번호
    const del_memo = $("#delivery3").val(); //배송 메모
    const memo = $("#memo").val(); //메모
    const name =  $("#username").val(); // 수령인 이름 
    const postcode =  $("#addressNumber").val(); //우편 번호
    const addr1 = $("#userAddress").val(); //도로명 주소
    const addr2 = $("#userAddress2").val(); //상세 주소
    const phone = $("#phonenumber").val(); //연락처 

    
    $.post("http://13.209.181.48:3000/order/modify/host", { _id : orderId, _state : state, _devco : company, _devno : com_num , _devmemo : del_memo,
    _memo : memo , _name : name , _post : postcode , _addr : addr1 , _sub : addr2 , _phone : phone }, function(data){
         
    
            if(data.result === "complete"){
                
               location.href ="/order/allOrder.html";
                
            }
    });
    
        

});


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

function getHistory(){

    return new Promise(function(resolve, reject){

        $.post('http://13.209.181.48:3000/order/history', { _id : orderId } , function(response){
            resolve(response);

        });
    });
}



$(".orderhistory").click(function(e){

    e.preventDefault();

    $(".history-list").empty("tr");

    getHistory().then(function(data){
  
        
        $.each(data, function(index, item){

            const date = (item.order_date).split("T");
           
            
            $(".history-list").append(

                `<tr>
                <td>${date[0]} ${date[1].substring(0,8)}</td>
                <td>${state[item.order_history]}</td>
                </tr>
                `
            );

        });
    });

});
//Primoise object 
function getAllOrderData(){

    return new Promise(function(resolve, reject){

        $.post('http://13.209.181.48:3000/order/info', { _id : orderId } , function(response){
            resolve(response);
        
            
        });
    });

}

function InputOrderData(data){

    box_length = data.length;
    const date = data[0].order_date.split("T");
    const total = data[0].order_totalprice.split(",");
    const dprice = data[0].billing_dprice.split(",");
    let price = "";
    let dp ="";
  
    total.forEach(e => {
        price += e
    });
    dprice.forEach(e=>{
        dp +=e;
    });
    let delivery = String(Number(dp)*box_length);
    let totalprice = String(Number(price) - delivery);

    $(".allCost").text(`  ${AddComma(totalprice)}원`);
    $(".deliveryCost").text(`  ${AddComma(delivery)}원`);
    $(".totalCost").text(`  ${data[0].order_totalprice}원`);


    $(".orderUsename").text(data[0].user_name); //주문자 이름
    $(".orderNumber").text(data[0].order_id); //주문 번호
    $("#ordercode").val(data[0].order_id); //주문 번호
    $("#orderDay").val(date[0]); //주문 일자 
    $("#orderState").val(data[0].order_state).prop("selected", true); //주문 상태
    $("#delivery1").val(data[0].order_dev_co); //택배회사
    $("#delivery2").val(data[0].order_dev_no); //송장번호
    $("#delivery3").val(data[0].order_dev_memo); //배송 메모
    $("#memo").val(data[0].order_memo); //메모
    $("#username").val(data[0].order_to_name); // 수령인 이름 
    $("#addressNumber").val(data[0].order_to_postcode); //우편 번호
    $("#userAddress").val(data[0].order_to_addr); //도로명 주소
    $("#userAddress2").val(data[0].order_to_sub); //상세 주소
    $("#phonenumber").val(data[0].order_to_phone); //연락처 
    $("#name").val(data[0].user_name); //주문자 이름 
    $("#phoneNum").val(data[0].user_phone); // 주문자 휴대폰번호
    $("#staticEmail").val(data[0].order_user); //주문자 이메일
    $("#totalPrice").val(`${AddComma(totalprice)}원`); //상품 합계
    $("#deliveryCount").val(`${AddComma(delivery)}원`); //배송비
    $("#payMoney").val(`${data[0].order_totalprice}원`);
    $("#payMethod").val(`${checkPay[data[0].billing_type]}`); //결제 방법

}


function init(){
    
    let cart_id = [];

    getAllOrderData().then(function(data){

      

        for(let i =0 ; i< data.length ; i++){

            cart_id.push(data[i].cart_id);

        }

        //표생성 
        $.each(data, function(index, item){
        
            $(".order-product-list").append(

                `<tr>
                <td>
                    <div class="row">
                        <div class="col-4"><img src="${item.cart_thumbnail}"></div>
                        <div class="col-8">
                            <p><strong>${item.cart_name}</strong><br> ${item.cart_subname}</p>
                            <p><strong>${card[item.cart_cardtype]}</strong><br> 카드 내용/${item.cart_cardmsg === "" ? '없음' : item.cart_cardmsg }</p>
                            <p><strong >담은 선물</strong>
                                <span class="${item.cart_id}"> </span>
                            </p>
                        </div>
                    </div>
                </td>
                <td>${item.cart_num}</td>
                <td>${item.cart_totalprice}원</td>
                <td>${item.billing_dprice}원</td>
              </tr>`

            );
        
        });
       
        InputOrderData(data);

    }).then(function() {
        
        for(let value of cart_id){

            
            $.post('http://13.209.181.48:3000/order/info/cart', { _id : value } , function(data){
                 
                    $.each(data, function(index, item){

                        $(`.${value}`).append(`<br> [${item.product_brand}] ${item.product_name}`);
                                    
                });
            });

        }
    });

    
}


init();

