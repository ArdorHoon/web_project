const fromData = sessionStorage.getItem('package_id');
const albumBucketName = 'andbox-thumbnail';
const bucketRegion = 'ap-northeast-2'; //true
const IdentityPoolId = 'ap-northeast-2:c1e6a0d3-64ba-4aa9-aff1-6d74d0444fdb';


let item_index = 0;
let index = 0; //이미지 최대 갯수

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

  
    
    // fileName = document.getElementById('host_id').value;
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

//패키지 이미지 업로드
function readInputFile(event){
    
   
    var files = event.target.files;
    var fileArr = Array.prototype.slice.call(files);

    if(index < 5){
    fileArr.forEach(function(f){

    	if(!f.type.match("image/.*")){
        	alert("이미지 확장자만 업로드 가능합니다.");
            return;
        }

     


            var reader = new FileReader();
            reader.onload = function(e){
                index++;
                let html = `<div style="display: flex; flex-direction: column; width:56px;"><img id="packImage"  src=${e.target.result} class="rounded" style ="width : 56px; height: 56px;" data-file=${f.name} /><button id = ${f.name} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`;
                $('#image_container').append(html);
                addFile(albumBucketName, files);
                
            };
            reader.readAsDataURL(f);
        
        
    });
    } else {

        alert("이미지는 5장까지 업로드 가능합니다.");
    }


}
//상품 이미지 업로드 
function inputProductImg(event, a){

    var files = event.target.files;
    var fileArr = Array.prototype.slice.call(files);

    
    fileArr.forEach(function(f){

    	if(!f.type.match("image/.*")){
        	alert("이미지 확장자만 업로드 가능합니다.");
            return;
        }
      
            var reader = new FileReader();
            reader.onload = function(e){
            
                let html = `<div style="display: flex; flex-direction: column; width:56px;"><img id="productImg" src=${e.target.result} class="rounded" style ="width : 56px; height: 56px;" data-file=${f.name} /><button id = ${f.name} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`;
                $(`.item_image${a}`).append(html);
                addFile(albumBucketName, files);
                
            };
            reader.readAsDataURL(f);
        
        
    });
   

}
//제품 표기정보 이미지 업로드

function productInfo(event, item_index){

   
    $( 'img' ).remove( `.pd_img${item_index}`);

    let files = event.target.files;
    let fileArr = Array.prototype.slice.call(files);

    fileArr.forEach(function(f){

       
    	if(!f.type.match("image/.*")){
        	alert("이미지 확장자만 업로드 가능합니다.");
            return;
        }


            var reader = new FileReader();
            reader.onload = function(e){
                let html = `<img id = "Iimage" class="pd_img${item_index} rounded" src=${e.target.result} style="max-width : 800px; height : auto;" data-file=${f.name} />`;
                $(`.pImage${item_index}`).append(html);
                addFile(albumBucketName, files);
                
            };
            reader.readAsDataURL(f);
        
        
    });
    


}



function deleteimg(event){

    const ths = $(event).parents("div"); //이미지 미리보기 삭제
    $(ths[0]).remove();
}


function delete_item(event){

    event.preventDefault();
    const parents = $(event.target).closest("form");
    $(parents).remove();
}

$(".backProduct").click(function(){

    
    history.go(-1);

   
});


function parseImg(data){

    return data.split('/')[3];
}

function inputData(data){

    $(".package-name").val(data.package._name);
    $(".first-price").val(data.package._oprice);
    $(".sales-price").val(data.package._sprice);
    $(".package-summary").val(data.package._summary);
    $(".package-description").val(data.package._description); 

    if(parseImg(data.package._thumbnail) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="packImage"  src=${data.package._thumbnail} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data.package._thumbnail)} /><button id = ${parseImg(data.package._thumbnail)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
     
    
    }


    if(parseImg(data.package._thumbnail_2) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="packImage"  src=${data.package._thumbnail_2} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data.package._thumbnail_2)} /><button id = ${parseImg(data.package._thumbnail_2)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
      
    
    }

    if(parseImg(data.package._thumbnail_3) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="packImage"  src=${data.package._thumbnail_3} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data.package._thumbnail_3)} /><button id = ${parseImg(data.package._thumbnail_3)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
    
    
    }

    if(parseImg(data.package._thumbnail_4) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="packImage"  src=${data.package._thumbnail_4} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data.package._thumbnail_4)} /><button id = ${parseImg(data.package._thumbnail_4)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
       
    
    }

    if(parseImg(data.package._thumbnail_5) !== "undefined"){
        
        $('#image_container').append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="packImage"  src=${data.package._thumbnail_5} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data.package._thumbnail_5)} /><button id = ${parseImg(data.package._thumbnail_5)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
       
    
    }


    inputProduct(data.items);



}

function inputProduct(data){

    for(let i = 0 ; i< data.length ; i++){

        $(".package-item").append(

            `
            <form class="item"> 
            <div class="form-group">
            <div class="card">
            <div class="card-body">
            <div class="form-group">
            <label for="formGroupExampleInput2">▶ 상품 이미지 (5장)</label>
            <label for="pimage-input${item_index}">
                <img src="/imgs/addImage.png"/>
            </label>
            <input type="file" name ="fileselect" id="pimage-input${item_index}" style="display: none;" accept="image/*" onchange="inputProductImg(event, ${item_index});"/>
            <div id="cimage_container" class="item_image${item_index}" style="margin-top : 10px; display: flex; flex-direction: row;"></div>
        
            </div>
            <div class="form-group">
            <label for="formGroupExampleInput2">▶ 상품이름</label>
            <input type="text" class="form-control product-name" id="formGroupExampleInput2" placeholder="이름을 입력해주세요.">
            </div>
            <div class="form-group">
            <label for="formGroupExampleInput2">▶ 브랜드</label>
            <input type="text" class="form-control product-brand" id="formGroupExampleInput2" placeholder="브랜드 입력해주세요.">
            </div>
            <div class="form-group">
            <label for="formGroupExampleInput2">▶ 설명</label>
            <textarea class="form-control product-description" id="formGroupExampleInput2" rows="3" placeholder="100자 이내"></textarea>
            </div>
            
            <label for="formGroupExampleInput2">▶ 제품 표기정보</label>
            <label for="img-input${item_index}">
                <img src="/imgs/addImage.png"/>
            </label>
            <input type="file" name ="fileselect" id="img-input${item_index}" style="display: none;" accept="image/*" onchange="productInfo(event, ${item_index});"/>
            <div id="pImage_container" class="pImage${item_index}" style="margin-top : 10px; display: flex; flex-direction: row;"></div>
            <button type="button" class="btn btn-danger float-right  delete_p_item" onclick="delete_item(event)">상품 삭제</button>
            
            </div>
          </div>
              </div>
        
          </form> `
        );

        $(".product-name").val(data[i]._name);
        $(".product-brand").val(data[i]._brand);
        $(".product-description").val(data[i]._summary);

        if(parseImg(data[i]._thumbnail) !== "undefined"){
        
            $(`.item_image${item_index}`).append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="productImg" src=${data[i]._thumbnail} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[i]._thumbnail)} /><button id = ${parseImg(data[i]._thumbnail)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        
        }

        if(parseImg(data[i]._thumbnail_2) !== "undefined"){
        
            $(`.item_image${item_index}`).append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="productImg" src=${data[i]._thumbnail_2} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[i]._thumbnail_2)} /><button id = ${parseImg(data[i]._thumbnail_2)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        
        }
        
        if(parseImg(data[i]._thumbnail_3) !== "undefined"){
        
            $(`.item_image${item_index}`).append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="productImg" src=${data[i]._thumbnail_3} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[i]._thumbnail_3)} /><button id = ${parseImg(data[i]._thumbnail_3)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        
        }

        if(parseImg(data[i]._thumbnail_4) !== "undefined"){
        
            $(`.item_image${item_index}`).append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="productImg" src=${data[i]._thumbnail_4} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[i]._thumbnail_4)} /><button id = ${parseImg(data[i]._thumbnail_4)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        
        }

        if(parseImg(data[i]._thumbnail_5) !== "undefined"){
        
            $(`.item_image${item_index}`).append(`<div style="display: flex; flex-direction: column; width:56px;"><img id="productImg" src=${data[i]._thumbnail_5} class="rounded" style ="width : 56px; height: 56px;" data-file=${parseImg(data[i]._thumbnail_5)} /><button id = ${parseImg(data[i]._thumbnail_5)} class="deleteimgbtn" type="button" onclick="deleteimg(this);"><img src="/imgs/delete_img.png" style="width: 20px;"/></button></div>`);
        
        }

        //제품표기정보
        if(parseImg(data[i]._detail)!== "undefined"){

                $(`.pImage${item_index}`).append(`<img id = "Iimage" class="pd_img${item_index} rounded" src=${data[i]._detail} style="max-width : 800px; height : auto;" data-file=${parseImg(data[i]._detail)} />`);
        }

        item_index++;

    }
    
}



$(".regProduct").click(function(){

    let list=[];
    let pi_list = [];

    const packageImage = document.querySelectorAll("#packImage");
    const packageName= document.querySelector(".package-name").value;
    const firstPrice= document.querySelector(".first-price").value;
    const salesPrice =document.querySelector(".sales-price").value;
    const packageSummary = document.querySelector(".package-summary").value;
    const packageDescription = document.querySelector(".package-description").value;

    for(let i  = 0 ; i <packageImage.length ; i++){

        pi_list.push(packageImage[i].dataset.file);
    }
    
    const items = document.querySelectorAll(".item");
    for(let i = 0 ; i<items.length ; i++){

        let obj = {};
        let p_list  = [];

        const detail = items[i].querySelector("#Iimage");
        const pImg = items[i].querySelectorAll("#productImg");

        for(let i  = 0 ; i < pImg.length ; i++){

            p_list.push( pImg[i].dataset.file);
        }

        obj["_name"] = items[i].querySelector(".product-name").value;
        obj["_brand"] = items[i].querySelector(".product-brand").value;
        obj["_summary"] = items[i].querySelector(".product-description").value;
        obj["_thumb"] = p_list[0];
        obj["_thumb2"] = p_list[1];
        obj["_thumb3"] = p_list[2];
        obj["_thumb4"] = p_list[3];
        obj["_thumb5"] = p_list[4];
        obj["_detail"] = detail.dataset.file;


        list.push(obj);
      
    }

   
    if(items.length !== 0){



    $.post("http://13.209.181.48:3000/package/apply", { _id : fromData , _name : packageName , _oprice : firstPrice , _sprice : salesPrice, _summary : packageSummary 
    , _desc : packageDescription , _thumb : pi_list[0] , _thumb2 : pi_list[1] , _thumb3 : pi_list[2] , _thumb4 : pi_list[3] , _thumb5 : pi_list[4] , _items : list }, function(data){
       

        if(data.result === "complete"){
            
           location.href ="/package/package.html";
            
        }
    });

}
else{
    alert("구성하는 상품을 등록하세요!");
}

});



$(".addPackageItem").click(function(){

    $(".package-item").append(
    
        `
        <form class="item"> 
        <div class="form-group">
        <div class="card">
        <div class="card-body">
        <div class="form-group">
        <label for="formGroupExampleInput2">▶ 상품 이미지 (5장)</label>
        <label for="pimage-input${item_index}">
            <img src="/imgs/addImage.png"/>
        </label>
        <input type="file" name ="fileselect" id="pimage-input${item_index}" style="display: none;" accept="image/*" onchange="inputProductImg(event, ${item_index});"/>
        <div id="cimage_container" class="item_image${item_index}" style="margin-top : 10px; display: flex; flex-direction: row;"></div>
    
        </div>
        <div class="form-group">
        <label for="formGroupExampleInput2">▶ 상품이름</label>
        <input type="text" class="form-control product-name" id="formGroupExampleInput2" placeholder="이름을 입력해주세요.">
        </div>
        <div class="form-group">
        <label for="formGroupExampleInput2">▶ 브랜드</label>
        <input type="text" class="form-control product-brand" id="formGroupExampleInput2" placeholder="브랜드 입력해주세요.">
        </div>
        <div class="form-group">
        <label for="formGroupExampleInput2">▶ 설명</label>
        <textarea class="form-control product-description" id="formGroupExampleInput2" rows="3" placeholder="100자 이내"></textarea>
        </div>
        
        <label for="formGroupExampleInput2">▶ 제품 표기정보</label>
        <label for="img-input${item_index}">
            <img src="/imgs/addImage.png"/>
        </label>
        <input type="file" name ="fileselect" id="img-input${item_index}" style="display: none;" accept="image/*" onchange="productInfo(event, ${item_index});"/>
        <div id="pImage_container" class="pImage${item_index}" style="margin-top : 10px; display: flex; flex-direction: row;"></div>
        <button type="button" class="btn btn-danger float-right  delete_p_item" onclick="delete_item(event)">상품 삭제</button>
        
        </div>
      </div>
          </div>
    
      </form> `
    );
    
    $('html, body').animate({scrollTop : $(document).height()}, 400);
    
    item_index++;
    
    });
    

function init(){



    $.post('http://13.209.181.48:3000/package/info' , { _id : fromData} , function(data) {

        console.log(data.items, data.package);
        inputData(data);
    
    });

}

init();