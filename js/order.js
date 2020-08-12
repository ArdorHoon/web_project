
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

function checkState(data){

    if(data === "pay")
        return "결제 대기";
}

function checkPay(data){

    if(data==="card")
         return "카드";
    else{
        return "무통장 입금";
    }
}


function init(){


    getOrderList().then(function(data){

        console.log(data);

             
        $.each(data, function(index, item){

            $(".all-order-list").append(
                `
                <tr>
                <td>${item.order_id}</td>
                <td>${checkState(item.order_state)}</td>
                <td><strong>${item.cart_name}</strong><br>${item.cart_subname}</td>
                <td>${item.order_totalprice}원</td>
                <td>${checkPay(item.billing_type)}</td>
                <td>${item.user_name}</td>
                <td>${item.order_to_name}</td>
                <td><a href="#" onclick="orderShowBtn(${item.order_id})">주문상세보기</a></td>
                </tr>`
            );

        });
    });
}



init();