//쿠폰 생성
$(".couponCreateBtn").on("click", function(event){

    var regexp =  /^[0-9]*$/;
    var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; //정규식

    const name = $("#AddCouponname").val();
    const type = document.querySelector('input[name="coupon-type"]:checked').value;
    const price = $("#couponPrice").val();
    const max = $("#limitmax").val();
    const limit = $("#limitdate").val();
    const count = $("#couponcount").val();


    if(regexp.test(price) && regexp.test(max)&& date_pattern.test(limit)&&  regexp.test(count)){

    $.post("http://13.209.181.48:3000/coupon/add", { _name : name, _type : type, _price : price, _max : max, _limit : limit , _count : count }, function(data){
      
         console.log(data);
        if(data.result === "complete"){


            $("tbody").empty("tr");
            init(); //다시 그림 

            $("#AddCouponname").val("");
            $("#couponPrice").val("");
            $("#limitmax").val("");
            $("#limitdate").val("");
            $("#couponcount").val("");
            

        }
    });
    
}else{

    alert ("올바른 형식이 아닙니다.");

}


});

function getCouponlist(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/coupon/list' , function(response){
            resolve(response);
        });
    });
}



function init(){

    getCouponlist().then(function(data){

        $.each(data, function(index, item){


            const dtype = (item.coupon_limit).split('T');
            const rdate = dtype[0];

            $(".all-coupon-list").append(

                `<tr>
                <td>${item.coupon_id}</td>
                <td>${item.coupon_name}</td>
                <td>${item.coupon_price}${item.coupon_type}</td>
                <td>${rdate}까지</td>
                <td>${item.user_id}</td>
                </tr>`

            );


        });
    });




}


init();