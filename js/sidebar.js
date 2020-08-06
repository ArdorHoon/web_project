const pageContents = document.querySelector("#page-contents"),
      allproducts = document.querySelector(".allproducts");
      normalproducts = document.querySelector(".normalproducts");

//상품 --> 전체 
allproducts.addEventListener("click", e=>{
    
    e.preventDefault();

    $(pageContents).empty(); //자식 요소 삭제 
    $(pageContents).load("/contents/product.html");  

    setTimeout(function(){
        $.getScript("/js/product.js");
    }, 300);

});





