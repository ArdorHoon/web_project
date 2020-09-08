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
    "vbank" : "가상계좌"
};

function orderShowBtn(data){

    sessionStorage.setItem("order_id",data);
    location.href ="/order/orderSpec.html";
}


function getOrderList(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/order/list' , function(response){
            resolve(response);
        });
    });
}

function init(keyword){

    
    getOrderList().then(function(data){

      
        let date ="";

        $.each(data, function(index, item){
            
        
            if (item.order_state === keyword || keyword === 'all') {

                    const dtype = (item.order_date).split('T');
                    const rdate = dtype[0];

                    if(date !== rdate){

                        date= rdate;
                        const sdate = date.split("-");
                        $(".all-order-list").append(
                             `<tr class="table-sm" style =" background-color: #FAFAFC;">
                              <td colspan = "8" style="color : #590098; text-align: center;">${sdate[0]}년 ${sdate[1]}월 ${sdate[2]}일</td>
                             </tr>`
                          );
                    }
                
                    $(".all-order-list").append(
                    `
                    <tr>
                    <td>${item.order_id}</td>
                    <td>${state[item.order_state]}</td>
                    <td><strong>${item.cart_name}</strong><br>${item.cart_subname}</td>
                    <td>${item.order_totalprice}원</td>
                    <td>${checkPay[item.billing_type]}</td>
                    <td>${item.user_name}</td>
                    <td>${item.order_to_name}</td>
                    <td><a href="#" onclick="orderShowBtn('${item.order_id}')">주문상세보기</a></td>
                    </tr>`
                    );
            }
        });
    });

    $(".logout").click(function(){
        
        sessionStorage.clear();
        location.href = "/index.html";
      
    });
}



