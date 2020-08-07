const fromData = sessionStorage.getItem('product_id');     

function inputProductData(data){

    
  


}


function init(){

    $.post('http://13.209.181.48:3000/product/info' , { _id : fromData} , function(response){
        console.log(response);

     
    
    });



    //sessionStorage.removeItem("product_id");
    console.log(fromData);
}

init();