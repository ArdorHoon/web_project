const fromData = sessionStorage.getItem('product_id');

const albumBucketName = 'andbox-thumbnail';
const bucketRegion = 'ap-northeast-2'; //true
const IdentityPoolId = 'ap-northeast-2:c1e6a0d3-64ba-4aa9-aff1-6d74d0444fdb';


let sel_files = []; //이미지 정보 담을 배열

let index = 0; //이미지 최대 갯수

let img_file =""; //제품표기정보


//<!-- AWS 연결 -->
AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });
//<!-- S3 연결 -->
    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: albumBucketName}
    });

//<!-- 파일 추가 -->
function addFile(albumName, files) {

       

        if (!files.length) {

            return alert('업로드할 파일을 선택해주세요.');
        }

        const file = files[0];
        const fileName = file.name;

        

        const photoKey = fileName;
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                return alert('파일 업로드 실패: ', err, data);
                console.log(err, data);
            }
           
        });
        
    }

//제품 표기정보 이미지 업로드

function productInfo(event){

   
    $( 'img' ).remove( '.pd_img' );

    let files = event.target.files;
    let fileArr = Array.prototype.slice.call(files);

    fileArr.forEach(function(f){

       
    	if(!f.type.match("image/.*")){
        	alert("이미지 확장자만 업로드 가능합니다.");
            return;
        }

        img_file = f.name;

            var reader = new FileReader();
            reader.onload = function(e){
                let html = `<img class="pd_img" src=${e.target.result} class="rounded" style="max-width : 800px; height : auto;" data-file=${f.name} />`;
                $('#pImage_container').append(html);
                addFile(albumBucketName, files);
                
            };
            reader.readAsDataURL(f);
        
        
    });
    

    
}    

//이미지 업로드
function previewFile(event){
    
   
    var files = event.target.files;
    var fileArr = Array.prototype.slice.call(files);

    if(index < 5){
      fileArr.forEach(function(f){


    	if(!f.type.match("image/.*")){
        	alert("이미지 확장자만 업로드 가능합니다.");
            return;
        }

        if(!sel_files.includes(f.name)){
            
            sel_files.push(f.name);
        }

  
            var reader = new FileReader();
            reader.onload = function(e){
                index++;
                let html = `<div style="display: flex; flex-direction: column; width:56px;"><img src=${e.target.result} class="rounded" style ="width : 56px; height: 56px;" id=img_id_${index} data-file=${f.name}/><button id=${f.name} class="deleteimgbtn" type="button"  onclick="deleteimg(this);" ><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`;
                $('#image_container').append(html);
                addFile(albumBucketName, files);
                
            };
            reader.readAsDataURL(f);
        
        
    });
    } else {

        alert("이미지는 5장까지 업로드 가능합니다.");
    }

   

}

function deleteimg(event){

    const idx = sel_files.indexOf(event.id); //sel_file에서 삭제 

    if(idx > -1)
        sel_files.splice(idx,1);

    const ths = $(event).parents("div"); //이미지 미리보기 삭제
    $(ths[0]).remove();
}


$(".changeProduct").click(function(){

 
        const productBrand = document.querySelector(".product-brand").value;
        const productName = document.querySelector(".product-name").value;  //product_name.value
        const originPrice = document.querySelector(".origin-price").value;
        const productCount = document.querySelector(".product-count").value;
        const salesPrice = document.querySelector(".sales-price").value;
        const wholesalesPrice = document.querySelector(".wholesales-price").value;
        const plink = document.querySelector(".p_link").value;
        const productState = document.querySelector('input[name="product-state"]:checked').value;
        const productDescription = document.querySelector(".product-description").value;
        const productGrade = document.querySelector('input[name="product-grade"]:checked').value;


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

     
           
        $.post("http://13.209.181.48:3000/product/modify", { _grade : productGrade, _count : productCount ,_id : fromData,  _state : productState, _type : "normal" ,_name : productName, _brand : productBrand , _link : plink , _op : originPrice , _sp : salesPrice, 
        _bp : wholesalesPrice,   _thumb : sel_files[0] , _thumb2 : sel_files[1],  _thumb3 : sel_files[2] , _thumb4 : sel_files[3] , _info : img_file , _thumb5 : sel_files[4] , _summary : productDescription , _category : productCate , _color : productColor }, function(data){
         
    
            if(data.result === "complete"){
                
               location.href ="/product.html";
                
            }
        });
        


});

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

function parseImg(data){

    return data.split('/')[3];
}

function inputProductData(data){
    
    $(".product-name").val(data[0].product_name); //이름
    $(".product-brand").val(data[0].product_brand); //브랜드
    $(".origin-price").val(data[0].product_origin_price);
    $(".sales-price").val(data[0].product_sales_price);
    $(".p_link").val(data[0].product_link);
    $(".product-count").val(data[0].product_count);
    $(".wholesales-price").val(data[0].product_buying_price);
    $(".product-description").val(data[0].product_summary);
    $(`input:radio[name=product-state]:input[value=${data[0].product_state}]`).prop("checked", true);
    $(`input:radio[name=product-grade]:input[value=${data[0].product_grade}]`).prop("checked", true);
    

    if(parseImg(data[0].product_info)!== "undefined"){
        $('#pImage_container').append(`<img class="pd_img rouunded" src="${data[0].product_info}" style="max-width : 800px; height : auto;" data-file=data-file=${parseImg(data[0].product_info)}/>`);
        img_file = parseImg(data[0].product_info);

    }else{
        
    }
    
    if(parseImg(data[0].product_thumbnail) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img src=${data[0].product_thumbnail} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[0].product_thumbnail)} /><button id=${parseImg(data[0].product_thumbnail)} class="deleteimgbtn" type="button" onclick="deleteimg(this);" ><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        sel_files.push(parseImg(data[0].product_thumbnail));
    
    }
    if(parseImg(data[0].product_thumbnail_2) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px; margin:0;"><img src=${data[0].product_thumbnail_2} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[0].product_thumbnail_2)} /><button id=${parseImg(data[0].product_thumbnail_2)} class="deleteimgbtn" type="button" onclick="deleteimg(this);" ><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        sel_files.push(parseImg(data[0].product_thumbnail_2));
    }
    if(parseImg(data[0].product_thumbnail_3) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img src=${data[0].product_thumbnail_3} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[0].product_thumbnail_3)} /><button id=${parseImg(data[0].product_thumbnail_3)}  class="deleteimgbtn" type="button" onclick="deleteimg(this);" ><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        sel_files.push(parseImg(data[0].product_thumbnail_3));
    }  
    if(parseImg(data[0].product_thumbnail_4) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px; margin:0;"><img src=${data[0].product_thumbnail_4} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[0].product_thumbnail_4)}/> <button id=${parseImg(data[0].product_thumbnail_4)} class="deleteimgbtn" type="button" onclick="deleteimg(this);" ><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        sel_files.push(parseImg(data[0].product_thumbnail_4));
    }  
    if(parseImg(data[0].product_thumbnail_5) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px; margin:0;"><img src=${data[0].product_thumbnail_5} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[0].product_thumbnail_5)} /><button id=${parseImg(data[0].product_thumbnail_5)} class="deleteimgbtn" type="button" onclick="deleteimg(this);" ><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        sel_files.push(parseImg(data[0].product_thumbnail_5));
    }  
    
   

}



function init(){

    getAllCategoryData().then(function(dataset){

       
        $.each(dataset, function(index, item){

            $(".category").append(

                `<label><input type="checkbox" name ="category" value="${item._category}"> ${item._category}</label><br>`
            );
           
            
        });
   }).then(function(){

    $.post('http://13.209.181.48:3000/product/category' , { _id : fromData} , function(data) {

        $.each(data, function(index, item){

            $(`input:checkbox[name=category]:input[value='${item._category}']`).prop("checked", true);
            
        });
    
    });

   });

   getAllColorData().then(function(dataset){


    $.each(dataset, function(index, item){

        $(".colors").append(

            `<label><input type="checkbox" name="color" value="${item._color}"> ${item._color}</label><br>`
        );
       
        
    });
}).then(function(){

 
    $.post('http://13.209.181.48:3000/product/color' , { _id : fromData} , function(data) {

        $.each(data, function(index, item){

            $(`input:checkbox[name=color]:input[value='${item._color}']`).prop("checked", true);
            
        });
    
    });

});



    $.post('http://13.209.181.48:3000/product/info' , { _id : fromData} , function(data) {

        inputProductData(data);
    
    });

}

init();
