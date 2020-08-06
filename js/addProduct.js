function previewFile(event) { 

    var reader = new FileReader(); 

    reader.onload = function(event) { 
        var img = document.createElement("img"); 
        img.setAttribute("src", event.target.result); 
        img.setAttribute("class" , "rounded")
        img.setAttribute("style" , "width : 56px; height: 56px;")
        document.querySelector("div#image_container").appendChild(img);
     
    }; 
     reader.readAsDataURL(event.target.files[0]); 
    }
$(".backProduct").click(function(){

    
    history.go(-1);


   

});

$(".regProduct").click(function(){

        const productKind = document.querySelector(".product-kind"); //product_kind.options[target.selectedIndex].value
        const productKindContent = productKind.options[productKind.selectedIndex].value;
        const productBrand = document.querySelector(".product-brand").value;
        const productName = document.querySelector(".product-name").value;  //product_name.value
        const originPrice = document.querySelector(".origin-price").value;
        const salesPrice = document.querySelector(".sales-price").value;
        const wholesalesPrice = document.querySelector(".wholesales-price").value;
        const productState = document.querySelector('input[name="product-state"]:checked').value;
        const productDescription = document.querySelector(".product-description").value;


        const productCateNum = document.getElementsByName("category").length;
        const productColorNum = document.getElementsByName("color").length;
        let productCate = "";
        let productColor = "";
        
        for (var i=0; i<productCateNum; i++) {
            if (document.getElementsByName("category")[i].checked == true) {

                productCate = productCate+document.getElementsByName("category")[i].value+",";
            }
        }

        for (var i=0; i<productColorNum; i++) {
            if (document.getElementsByName("color")[i].checked == true) {

                productColor = productColor+document.getElementsByName("color")[i].value+",";
            }
        }

        
        
        $.post("http://13.209.181.48:3000/product/apply", { _state : productState, _type : productKindContent ,_name : productName, _brand : productBrand , _op : originPrice , _sp : salesPrice, 
        _bp : wholesalesPrice,  _thumb : "exam" , _summary : productDescription , _category : productCate , _color : productColor }, function(data){
            console.log(data);
    
            if(data.result === "complete"){
                
               location.href ="product.html";
                
            }
        });
        
        

    

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

}

init();



