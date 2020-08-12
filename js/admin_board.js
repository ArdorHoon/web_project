function getAdminProduct(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/admin/product' , function(response){
            resolve(response);
        });
    });

}

function getAdminUser(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/admin/user' , function(response){
            resolve(response);
        });
    });
}

function getAdminOrder(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/admin/order' , function(response){
            resolve(response);
        });
    });

}


function init(){

    getAdminProduct().then(function(data){

        let sale;
        let soldout;
        let stop;
    
        $.each(data, function(index, item){

                if(item._states ==="stop")
                    stop = `<div class="d-flex justify-content-between"> <p><img src="/imgs/end.png" style="width : 24px;">  판매 중지</p> <p style="color : #883EFF;">${item.product_cnt} <span style="color :#3B3B3B;">개</span></p></div>`;
                if(item._states === "soldout")
                 soldout =  `<div class="d-flex justify-content-between"> <p><img src="/imgs/end.png" style="width : 24px;">  품절</p>  <p style="color : #883EFF;">${item.product_cnt} <span style="color :#3B3B3B;">개</span></p></div>`;
                if(item._states ==="sale")
                    sale = `<div class="d-flex justify-content-between"> <p><img src="/imgs/gift.png" style="width : 24px;"> 판매 중</p> <p style="color : #883EFF;">${item.product_cnt} <span style="color :#3B3B3B;">개</span></p></div>`;
        });

        $(".product_list").append(sale + stop + soldout);

    });

    getAdminUser().then(function(data){


        $(".user_list").append(
            `<div  class="d-flex justify-content-between"> <p><img src="/imgs/customer.png" style="width : 24px;"> 전체</p> <p style="color : #883EFF;">${data[0].user_cnt} <span style="color :#3B3B3B;">명</span></p></div>`
        );

    });

    getAdminOrder().then(function(data){
        
        console.log(data);

        let failed;
        let pay;
        let paid; 
        let making;
        let delivery;
        let req_can;
        let req_ref;

        $.each(data, function(index, item){

            if(item._states ==="failed")
                failed = ` <div class="d-flex justify-content-between" style="color : #BE1717"> <p><img src="/imgs/fail.png" style="width : 24px;"> 결제 실패</p> <p> ${item.order_cnt} <span style="color :#3B3B3B;">건</span> </p> </div>`;
            if(item._states === "pay")
             pay =  `<div class="d-flex justify-content-between"> <p><img src="/imgs/wait.png" style="width : 24px;"> 결제 대기</p> <p style="color : #883EFF;">${item.order_cnt} <span style="color :#3B3B3B;">건</span></p></div>`;
            if(item._states ==="paid")
                paid = `<div class="d-flex justify-content-between"> <p><img src="/imgs/pay.png" style="width : 24px;"> 결제 완료</p><p style="color : #883EFF;">${item.order_cnt} <span style="color :#3B3B3B;">건</span></p> </div>`;
            if(item._states ==="making")
                making = `<div class="d-flex justify-content-between" > <p><img src="/imgs/gift.png" style="width : 24px;"> 상품 제작 중</p><p style="color : #883EFF;">${item.order_cnt} <span style="color :#3B3B3B;">건</span></p> </div>`;
            if(item._states === "delivery")
                delivery = `<div class="d-flex justify-content-between" > <p><img src="/imgs/tracking.png" style="width : 24px;"> 배송 중</p><p style="color : #883EFF;">${item.order_cnt} <span style="color :#3B3B3B;">건</span></p> </div>`;
            if(item._states ==="req_can")
                req_can =  `<div class="d-flex justify-content-between" > <p><img src="/imgs/end.png" style="width : 24px;"> 취소 요청</p><p style="color : #883EFF;">${item.order_cnt} <span style="color :#3B3B3B;">건</span></p> </div>`;
            if(item._states ==="req_ref")
                req_ref =  `<div class="d-flex justify-content-between" > <p><img src="/imgs/return.png" style="width : 24px;"> 반품 요청</p><p style="color : #883EFF;">${item.order_cnt} <span style="color :#3B3B3B;">건</span></p> </div>`;
            
            
            });


        $(".pay_list").append(

            `<div style="color : #616161 ;" > <p>주문 현황</p></div> 
            ${pay} 
            ${paid}
            ${making}
            ${delivery}
            <hr><div style="color : #616161 ;"> <p>취소/반품요청</p></div>
            ${req_can}
            ${req_ref}
            <hr>${failed}`

        );
    });
}


init();