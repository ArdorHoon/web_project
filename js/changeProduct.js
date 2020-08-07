const fromData = sessionStorage.getItem('product_id');
   

$(".backProduct").click(function(){

    
    history.go(-1);
    
   
});

function getAllColorData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/color/list' , function(response){
            resolve(response);
        });
    });


}


function getAllCategoryData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/category/list' , function(response){
            resolve(response);
        });
    });

}



function inputProductData(data){
    
    $(".product-kind").val(data[0].product_type).prop("selected", true);
    $(".product-name").val(data[0].product_name); //이름
    $(".product-brand").val(data[0].product_brand); //브랜드
    $(".origin-price").val(data[0].product_op);
    $(".sales-price").val(data[0].product_sp);
    $(".wholesales-price").val(data[0].product_bp);
    $(".product-description").val(data[0].product_summary);
    $(`input:radio[name=product-state]:input[value=${data[0].product_state}]`).prop("checked", true);

}



function init(){

    getAllCategoryData().then(function(dataset){

        console.log(dataset);
        $.each(dataset, function(index, item){

            $(".category").append(

                `<label><input type="checkbox" name ="category" value="${item._category}"> ${item._category}</label><br>`
            );
           
            
        });
   });

   getAllColorData().then(function(dataset){

    console.log(dataset);
    $.each(dataset, function(index, item){

        $(".colors").append(

            `<label><input type="checkbox" name="color" value="${item._color}"> ${item._color}</label><br>`
        );
       
        
    });
});

    $.post('http://13.209.181.48:3000/product/info' , { _id : fromData} , function(data) {
        console.log(data);
        inputProductData(data);
    
    });



    sessionStorage.removeItem("product_id");
    console.log(fromData);
 
}

init();