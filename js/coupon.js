//쿠폰 생성
$(".couponCreateBtn").on("click", function(event){

    const name = $("#AddCouponname").val();
    const type = document.querySelector('input[name="coupon-type"]:checked').value;
    const cost = $("#couponPrice").val();
    const max = $("#limitmax").val();
    const limit = $("#limitdate").val();

    console.log(name, type, cost, max , limit);
    /*
    $.post("http://13.209.181.48:3000/color/apply", { _color : name }, function(data){
      
        if(data.result === "complete"){

                $("tbody").empty("tr");
                init(); //다시 그림 
                $("#AddCouponCode").val("");

        }
    });
    */


});

function getCouponlist(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/coupons' , function(response){
            resolve(response);
        });
    });
}



function init(){
/*
    getCouponlist().then(function(data){

        console.log(data);
    });

*/


}


init();